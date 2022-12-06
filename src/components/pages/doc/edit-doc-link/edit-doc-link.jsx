import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import EditIcon from 'icons/edit.inline.svg';

const EditDocLink = ({ className: additionalClassName, to, ...otherProps }) => {
  const className = clsx(
    'inline-flex shrink-0 items-center self-start font-mono font-semibold leading-none text-sm sm:text-xs text-blue-light transition-all hover:text-blue-light-hover dark:text-blue-dark dark:hover:text-blue-light',
    additionalClassName
  );

  return (
    <a className={className} href={to} target="_blank" rel="noopener noreferrer" {...otherProps}>
      <EditIcon className="mr-2 sm:h-auto sm:w-[14px]" />
      Edit this page
    </a>
  );
};

EditDocLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
};

EditDocLink.defaultProps = {
  className: null,
};

export default EditDocLink;
