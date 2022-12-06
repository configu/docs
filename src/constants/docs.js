const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const DRAFT_FILTER = IS_PRODUCTION ? [false] : [true, false];
const DOC_REQUIRED_FIELDS = ['title', 'slug'];

// We aren't using ES modules here in order to be able to import variables from this file in gatsby-node.js
module.exports = {
  IS_PRODUCTION,
  DRAFT_FILTER,
  DOC_REQUIRED_FIELDS,
};
