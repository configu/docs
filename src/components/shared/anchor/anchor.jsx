/* eslint-disable react/prop-types */
import { Link } from 'gatsby';
import React from 'react';

import LinkIcon from 'icons/external-link.inline.svg';

const Anchor = ({ children, href, ...otherProps }) =>
  href.startsWith('http') ? (
    <a href={href} target="_blank" rel="noreferrer" {...otherProps}>
      {children}
      <LinkIcon className="ml-1 inline-flex h-auto w-5 align-sub" />
    </a>
  ) : (
    <Link to={href} {...otherProps}>
      {children}
    </Link>
  );

export default Anchor;
