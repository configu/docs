import clsx from 'clsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ChevronIcon from 'icons/chevron.inline.svg';

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

const CollapsibleItem = ({ children, title, isOpen, nonMdx, type, className }) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const handleHeaderClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className={clsx(
        'overflow-hidden hover:cursor-pointer md:pb-6 md:pt-[18px] sm:pb-5',
        {
          'border-t border-solid border-grey-88 py-3 dark:border-grey-40': type === 'default',
          'border-b border-dashed border-grey-80 py-8 first:border-t ': type === 'faq',
        },
        className
      )}
      initial="from"
      animate={isExpanded ? 'to' : 'exit'}
    >
      <div
        className={clsx('flex items-center justify-between', {
          'border-b border-grey-80 pb-1.5 dark:border-grey-40': type === 'navigation',
        })}
        role="button"
        onClick={handleHeaderClick}
      >
        <h3
          className={clsx('font-mono font-semibold text-black dark:text-white sm:text-md', {
            'm-0 text-md xl:text-base': type === 'default',
            'text-lg': type === 'faq',
            '!text-sm': type === 'navigation',
          })}
        >
          {title}
        </h3>

        <motion.span
          className={clsx({
            'ml-3 block h-1.5 w-3 min-w-[12px]': type === 'default',
            'mt-2 mb-auto min-w-[14px]': type === 'faq',
            'min-w-[12px]': type === 'navigation',
          })}
          variants={itemHeadingChevronVariants}
        >
          <ChevronIcon className="dark:text-white" />
        </motion.span>
      </div>

      <motion.div className="overflow-hidden" variants={itemContentVariants}>
        {nonMdx ? (
          <p className={clsx({ 'text-base sm:text-sm': type === 'faq' })}>{children}</p>
        ) : (
          children
        )}
      </motion.div>
    </motion.div>
  );
};

CollapsibleItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  nonMdx: PropTypes.bool,
  type: PropTypes.oneOf(['default', 'faq', 'navigation']),
};

CollapsibleItem.defaultProps = {
  className: null,
  children: null,
  isOpen: false,
  nonMdx: false,
  type: 'default',
};

export default CollapsibleItem;
