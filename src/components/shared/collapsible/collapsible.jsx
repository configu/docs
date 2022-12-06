import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const Collapsible = ({ children, className }) =>
  Array.isArray(children) ? (
    <ul className={clsx(className, 'collapsible mt-8 mb-10 h-auto w-full p-0')}>{children}</ul>
  ) : (
    <div className={clsx(className, 'collapsible mt-8 mb-10 h-auto w-full')}>{children}</div>
  );

Collapsible.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Collapsible.defaultProps = {
  children: null,
  className: null,
};

export default Collapsible;
