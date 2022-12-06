const queries = [
  {
    query: `{
      pages: allMdx(
        filter: {internal: {contentFilePath: {regex: "/content/docs/"}}, fields: {isDraft: {in: false}}, frontmatter: {slug: {ne: "README"}}}
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
        slug,
        excerpt,
      })),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    settings: { attributesToSnippet: [`excerpt:20`] },
    matchFields: ['title', 'excerpt'],
  },
];

module.exports = queries;
