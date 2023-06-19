/* eslint-disable react/prop-types */
import { Link } from 'gatsby';
import React from 'react';

const mayBeStripPrefix = (href) => {
  const prefix = '/docs';
  if (href.startsWith(prefix)) {
    return href.slice(prefix.length);
  }
  return href;
};

const Anchor = ({ children, href, ...otherProps }) =>
  href.startsWith('http') ? (
    <a className="external-link" href={href} target="_blank" rel="noreferrer" {...otherProps}>
      {children}
    </a>
  ) : (
    <Link to={mayBeStripPrefix(href)} {...otherProps}>
      {children}
    </Link>
  );

export default Anchor;
