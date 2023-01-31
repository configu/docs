/* eslint-disable react/prop-types */
import { Link } from 'gatsby';
import React from 'react';

const Anchor = ({ children, href, ...otherProps }) =>
  href.startsWith('http') ? (
    <a className="external-link" href={href} target="_blank" rel="noreferrer" {...otherProps}>
      {children}
    </a>
  ) : (
    <Link to={href} {...otherProps}>
      {children}
    </Link>
  );

export default Anchor;
