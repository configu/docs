// Gatsby has dotenv by default
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

module.exports = {
  flags: {
    DEV_SSR: process.env.GATSBY_DEV_SSR || false,
  },
  pathPrefix: '/docs',
  siteMetadata: {
    siteTitle: 'Configu - Rethinking Configuration Management',
    siteDescription:
      'Configu is an end-to-end configuration management SaaS platform enabling R&D teams to prevent critical production failures caused by traditional, complex, and manual configuration management methodologies',
    siteImage: '/images/social-preview.jpg',
    siteLanguage: 'en',
    siteUrl: process.env.GATSBY_DEFAULT_SITE_URL || 'http://localhost:8000',
    authorName: 'Configu',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-BZJXN32RK1'],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/content/`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          quality: 85,
          placeholder: 'none',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-svgr-svgo',
      options: {
        inlineSvgOptions: [
          {
            test: /\.inline.svg$/,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                      removeTitle: false,
                      removeDesc: false,
                    },
                  },
                },
                'prefixIds',
              ],
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
      options: {
        headers: {
          '/*': ['Access-Control-Allow-Origin: *'],
          '/fonts/*': ['Cache-Control: public, max-age=31536000, immutable'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': ['Access-Control-Allow-Origin: *'],
          '/fonts/*': ['Cache-Control: public, max-age=31536000, immutable'],
        },
      },
    },
    'gatsby-alias-imports',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: process.env.GATSBY_DEFAULT_SITE_URL,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 860,
              quality: 85,
              withWebp: true,
              backgroundColor: 'white',
              disableBgImageOnAlpha: true,
            },
          },
          {
            resolve: 'gatsby-remark-video',
            options: {
              width: 860,
              height: 'auto',
              preload: 'auto',
              controls: true,
            },
          },
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    ...(process.env.SEGMENT_WRITE_PROD_KEY && process.env.SEGMENT_WRITE_DEV_KEY
      ? [
          {
            resolve: 'gatsby-plugin-segment-js',
            options: {
              prodKey: process.env.SEGMENT_WRITE_PROD_KEY,
              devKey: process.env.SEGMENT_WRITE_DEV_KEY,
              trackPage: true,
              trackPageImmediately: true,
              trackPageOnlyIfReady: false,
            },
          },
        ]
      : []),
  ],
};
