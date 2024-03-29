const path = require('path');

const get = require('lodash.get');

const docTemplate = path.resolve('./src/templates/doc.jsx');

const { prepareCliRef } = require('./content/CLI/prepareCliRef');
const { prepareReadme } = require('./content/prepareReadme');
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
        sidebar,
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

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        os: false,
        path: false,
        buffer: false,
        fs: false,
      },
    },
  });
};

exports.onPreInit = async () => {
  await prepareReadme({
    source: 'ts/packages/cli/README.md',
    target: 'CLI/cli-overview.mdx',
    slug: 'cli-overview',
    title: 'Configu CLI',
  });
  await prepareCliRef();
  await prepareReadme({
    source: 'ts/packages/node/README.md',
    target: 'SDK/nodejs-sdk.mdx',
    slug: 'nodejs-sdk',
    title: 'Node.js SDK',
  });
  await prepareReadme({
    source: 'py/README.md',
    target: 'SDK/python-sdk.mdx',
    slug: 'python-sdk',
    title: 'Python SDK',
  });
  await prepareReadme({
    source: 'ts/packages/browser/README.md',
    target: 'SDK/browser-sdk.mdx',
    slug: 'browser-sdk',
    title: 'Browser SDK',
  });
};
