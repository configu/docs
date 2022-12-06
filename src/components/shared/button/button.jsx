import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'components/shared/link';

const styles = {
  base: 'inline-flex items-center justify-center text-center font-sans font-semibold px-8 transition-colors duration-200 leading-none outline-none',
  disabled: '!bg-[#ADCFFF] cursor-default pointer-events-none hover:!bg-[#ADCFFF]',

  size: {
    xs: 'h-8 w-8',
    sm: 'py-4 text-md xl:text-base h-14 lg:h-auto',
    md: 'text-lg py-[22px] h-16 lg:text-md lg:py-4',
  },

  theme: {
    blue: 'bg-blue-light !text-white hover:bg-blue-light-hover dark:bg-blue-dark dark:hover:bg-blue-light',
    'black-outline': 'bg-white !text-black border-2 border-black hover:!bg-black hover:!text-white',
    'primary-blue-outline':
      'block text-blue-light text-center border-2 bg-transparent hover:border-blue-light-hover hover:bg-transparent hover:text-blue-light-hover',
    'code-copy':
      'flex items-center justify-center rounded border border-grey-40 bg-grey-25 !p-0 text-grey-70 opacity-0 transition-[color,opacity,visibility] duration-200 hover:text-white group-hover:visible group-hover:opacity-100 dark:border-grey-50 dark:bg-grey-40',
  },
};

const Button = ({
  className: additionalClassName,
  to,
  size,
  theme,
  isDisabled,
  children,
  ...otherProps
}) => {
  const className = clsx(
    styles.base,
    styles.size[size],
    styles.theme[theme],
    isDisabled && styles.disabled,
    additionalClassName
  );

  const Tag = to ? Link : 'button';

  return (
    <Tag className={className} to={to} {...otherProps}>
      {children}
    </Tag>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  isDisabled: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(styles.size)).isRequired,
  theme: PropTypes.oneOf(Object.keys(styles.theme)).isRequired,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  className: null,
  to: null,
  isDisabled: false,
};

export default Button;
