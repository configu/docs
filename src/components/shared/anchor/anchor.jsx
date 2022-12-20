/* eslint-disable react/prop-types */
import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';

const Anchor = ({ children, href, ...otherProps }) => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        assetPrefix
      }
    }
  `);
  let newHref = href;
  const assetPrefix = site.assetPrefix.replace('https://', 'https:/');

  if (href.startsWith(assetPrefix)) {
    newHref = href.slice(assetPrefix.length);
  }

  const allProps = { ...otherProps, href: newHref };

  return <a {...allProps}>{children}</a>;
};

export default Anchor;
