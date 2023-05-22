import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const Version = ({ children, type }) => (
  <span
    className={clsx(
      'order-last ml-auto rounded-full border bg-white px-4 py-2 text-xs font-semibold uppercase leading-tight tracking-wide duration-200 sm:px-3 [@media(max-width:500px)]:w-min',
      {
        'border-blue-light text-blue-light duration-200 hover:bg-blue-light hover:text-white':
          type === 'blue',
      },
      { 'border-green text-green duration-200 hover:bg-green hover:text-white': type === 'green' },
      {
        'border-code-pink text-code-pink duration-200 hover:bg-code-pink hover:text-white':
          type === 'pink',
      }
    )}
  >
    {children}
  </span>
);

Version.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['blue', 'green', 'pink']),
};

Version.defaultProps = {
  children: null,
  type: 'note',
};

export default Version;
