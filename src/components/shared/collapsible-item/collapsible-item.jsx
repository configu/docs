import clsx from 'clsx';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ChevronIcon from 'icons/chevron.inline.svg';
import ExpandIcon from 'icons/expand-icon.inline.svg';

const itemHeadingChevronVariants = {
  from: {
    rotate: 0,
  },
  to: {
    rotate: 180,
    transition: { duration: 0.3 },
  },
  exit: {
    rotate: 0,
    transition: { duration: 0.3 },
  },
};

const itemContentVariants = {
  from: {
    height: 0,
  },
  to: {
    height: 'auto',
    transition: { duration: 0.4 },
  },
  exit: {
    height: 0,
    transition: { duration: 0.4 },
  },
};

const CollapsibleItem = ({ children, title, isOpen, type, className }) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const handleHeaderClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={clsx(
          'collapsible-item overflow-hidden hover:cursor-pointer',
          {
            'border-t border-b border-dashed border-grey-80 py-5 dark:border-grey-25':
              type === 'default',
            'md:pb-3 md:pt-3 sm:pb-3': type === 'navigation',
          },
          className
        )}
        initial="from"
        animate={isExpanded ? 'to' : 'exit'}
      >
        <div
          className={clsx('flex items-center justify-between')}
          role="button"
          onClick={handleHeaderClick}
        >
          <h3
            className={clsx('m-0 font-semibold text-black dark:text-white', {
              'font-mono !text-lg sm:!text-md': type === 'default',
              'font-sans !text-sm': type === 'navigation',
            })}
          >
            {title}
          </h3>

          {type === 'navigation' ? (
            <ExpandIcon className="dark:text-white" />
          ) : (
            <m.span
              className="ml-3 block h-1.5 w-3 min-w-[12px]"
              variants={itemHeadingChevronVariants}
            >
              <ChevronIcon className="dark:text-white" />
            </m.span>
          )}
        </div>

        <m.div className="overflow-hidden" variants={itemContentVariants}>
          <div className="mt-4 font-sans text-base sm:mt-3 sm:text-sm">{children}</div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
};

CollapsibleItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  type: PropTypes.oneOf(['default', 'navigation']),
};

CollapsibleItem.defaultProps = {
  className: null,
  children: null,
  isOpen: false,
  type: 'default',
};

export default CollapsibleItem;
