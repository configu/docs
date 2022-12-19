// eslint-disable-next-line import/prefer-default-export
export const MAIN_SITE_DOMAIN = process.env.GATSBY_DEFAULT_SITE_URL.replace(/^https?:\/\//, '') // trim http(s)
  .replace(/\/+$/, '') // trim last slash
  .replace(/:?[0-9]+$/, '') // trim port number
  .replace(/.*\.([^.]*[^0-9][^.]*\.[^.]*[^.0-9][^.]*$)/, '$1'); // extract root domain
