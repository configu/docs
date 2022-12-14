const queries = [
  {
    query: `{
      pages: allMdx(
        filter: {internal: {contentFilePath: {regex: "/content/"}}, fields: {isDraft: {in: false}}, frontmatter: {title: {regex: "//"}, slug: {regex: "//"}}}
      ) {
        nodes {
          id
          frontmatter {
            slug
            title
          }
          excerpt
        }
      }
    }`,
    transformer: ({ data }) =>
      data.pages.nodes.map(({ id, frontmatter: { title, slug }, excerpt }) => ({
        objectID: id,
        title,
        slug: slug === '/' ? slug : `/${slug}/`,
        excerpt,
      })),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    settings: { attributesToSnippet: [`excerpt:20`] },
    matchFields: ['title', 'excerpt'],
  },
];

module.exports = queries;
