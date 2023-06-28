/* eslint-disable react/prop-types */
import { useStaticQuery, graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

const SEO = ({
  title,
  description,
  pathname,
  ogImage,
  opengraphTitle,
  opengraphDescription,
  opengraphImage,
  metaRobotsNoindex,
  metaKeywords,
  children,
}) => {
  const {
    site: {
      siteMetadata: { siteTitle, siteDescription, siteUrl, siteImage },
    },
  } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          siteTitle
          siteDescription
          siteUrl
          siteImage
          siteLanguage
        }
      }
    }
  `);
  const isRobotsNoindexPage = metaRobotsNoindex === 'noindex';
  const currentTitle = title || opengraphTitle || siteTitle;
  const currentDescription = description || opengraphDescription || siteDescription;
  const currentUrl =
    pathname !== '/docs/' ? `${siteUrl}${pathname.replace('/docs/', '/')}` : siteUrl;

  const opengraphImagePreview =
    opengraphImage && siteUrl + getSrc(opengraphImage.localFile.childImageSharp);
  const ogImagePreview = ogImage && siteUrl + getSrc(ogImage.localFile.childImageSharp);
  const currentImage = opengraphImagePreview || ogImagePreview || siteUrl + siteImage;

  return (
    <>
      <title>{currentTitle}</title>
      {/* General */}
      <meta name="description" content={currentDescription} />
      {metaKeywords ? <meta name="keywords" content={metaKeywords} /> : null}
      {isRobotsNoindexPage ? <meta name="robots" content="noindex" /> : null}
      {/* Open Graph */}
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={currentImage} />
      <meta property="og:type" content="website" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {children}
    </>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  children: PropTypes.node,
};

SEO.defaultProps = {
  title: null,
  description: null,
  children: null,
};

export default SEO;
