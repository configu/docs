const path = require('path');

const get = require('lodash.get');

const docTemplate = path.resolve('./src/templates/doc.jsx');

const sidebar = require('./content/sidebar.json');
const { DRAFT_FILTER, DOC_REQUIRED_FIELDS } = require('./src/constants/docs');
const getDocPreviousAndNextLinks = require('./src/utils/get-doc-previous-and-next-link');

const flatSidebar = (items) =>
  items.reduce((acc, item) => {
    if (item.items) {
      return [...acc, ...flatSidebar(item.items)];
    }
    return [...acc, item];
  }, []);

const createDocPages = async ({ graphql, actions }) => {
  const result = await graphql(
    `
      query ($draftFilter: [Boolean]!) {
        allMdx(
          filter: {
            internal: { contentFilePath: { regex: "//content/(?!components/)/" } }
            fields: { isDraft: { in: $draftFilter } }
          }
        ) {
          nodes {
            id
            frontmatter {
              title
              slug
            }
            internal {
              contentFilePath
            }
            tableOfContents(maxDepth: 3)
          }
        }
      }
    `,
    { draftFilter: DRAFT_FILTER }
  );

  if (result.errors) throw new Error(result.errors);

  const pages = result.data.allMdx.nodes;

  pages.forEach(({ id, internal: { contentFilePath }, tableOfContents, frontmatter }) => {
    // Required fields validation
    DOC_REQUIRED_FIELDS.forEach((fieldName) => {
      if (!get(frontmatter, fieldName)) {
        throw new Error(`Doc "${contentFilePath}" does not have field "${fieldName}"!`);
      }
    });
    const filePath = contentFilePath.split('/content/').pop();
    const { previousLink, nextLink } = getDocPreviousAndNextLinks(
      frontmatter.slug,
      flatSidebar(sidebar.items)
    );

    actions.createPage({
      path: frontmatter.slug,
      component: `${docTemplate}?__contentFilePath=${contentFilePath}`,
      context: {
        id,
        sidebar: sidebar.items,
        previousLink,
        nextLink,
        tableOfContents: tableOfContents?.items,
        fileOriginPath: encodeURI(`${process.env.GATSBY_DOCS_GITHUB_PATH}${filePath}`),
      },
    });
  });
};

exports.createPages = async (options) => {
  await createDocPages(options);
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.frontmatter) {
    createNodeField({
      node,
      name: 'isDraft',
      value: node.frontmatter.isDraft || false,
    });
  }
};
