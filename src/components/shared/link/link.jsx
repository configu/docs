import clsx from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import useSegmentEvent from 'hooks/use-segment-event';
import Arrow from 'icons/arrow.inline.svg';

const styles = {
  base: 'font-semibold inline-flex items-baseline leading-none transition-colors duration-200 group relative',
  size: {
    xs: 'text-sm',
    sm: 'text-base xl:text-sm',
    md: 'text-md xl:text-base',
    xl: 'text-xl xl:text-md sm:text-base',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl xl:text-xl md:text-lg sm:text-base',
    '7xl': 'heading-2',
  },
  theme: {
    black: 'text-black hover:text-blue-light dark:text-white dark:hover:text-blue-dark',
    'black-underlined':
      'text-black relative hover:text-blue-light dark:text-white dark:hover:text-blue-dark before:h-0.5 before:w-full before:bg-blue-light before:absolute before:bottom-0 before:left-0 before:origin-right before:transition-transform before:ease-in-out before:duration-200 before:translate-y-1.5 hover:before:translate-y-2 before:pointer-events-none',
    blue: 'text-blue-light font-semibold text-base hover:text-blue-light-hover dark:text-blue-dark dark:hover:text-blue-light transition-colors duration-200',
    'blue-underlined': 'text-blue-light pb-4 relative dark:text-blue-dark',
    white: 'text-white relative hover:text-black dark:text-white',
    'white-underlined':
      'text-white relative hover:text-white before:h-0.5 before:w-full before:bg-white before:absolute before:bottom-0 before:left-0 before:origin-right before:transition-transform before:ease-in-out before:duration-200 before:translate-y-1.5 hover:before:translate-y-2 before:pointer-events-none',
    'white-underlined-motion': 'text-white relative dark:text-white',
    'black-outline': 'bg-white !text-black border-2 border-black hover:!bg-black hover:!text-white',
  },
};

const underlineVariants = {
  start: {
    right: 0,
    left: 'auto',
    width: 0,
    scaleX: -1,
    transition: {
      duration: 0.25,
      ease: [0.5, 0.5, 0.5, 1],
    },
    transitionEnd: {
      right: 'auto',
      left: 0,
      scaleX: 1,
    },
  },
  finish: {
    width: '100%',
    transition: {
      duration: 0.25,
      ease: [0.5, 0.5, 0.5, 1],
    },
    transitionEnd: {
      right: 0,
      left: 'auto',
      scaleX: -1,
    },
  },
};

const Link = ({
  className: additionalClassName,
  size = 'sm',
  theme = 'black',
  to,
  nav,
  children,
  isClickTracked,
  ...props
}) => {
  const { handleSegmentEvent } = useSegmentEvent();
  const [, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const controls = useAnimation();

  const className = clsx(
    size && theme && styles.base,
    styles.size[size],
    styles.theme[theme],
    additionalClassName
  );

  const handleAnimation = async (first, second) => {
    setIsLocked(true);
    await controls.start(first);
    await controls.start(second);
    setIsLocked(false);
  };

  const handleHoverStart = async () => {
    setIsHovered(true);

    if (!isLocked) {
      await handleAnimation('start', 'finish');

      setIsHovered((isCurrentlyHovered) => {
        if (!isCurrentlyHovered) {
          handleAnimation('finish', 'start');
        }

        return isCurrentlyHovered;
      });
    }
  };

  const handleHoverFinish = async () => {
    setIsHovered(false);

    if (!isLocked) {
      await handleAnimation('finish', 'start');
    }
  };

  const isUnderline = theme === 'blue-underlined' || theme === 'white-underlined-motion';

  const underline = (
    <motion.span
      className={clsx(
        'absolute left-0',
        theme === 'blue-underlined' &&
          'bottom-0 h-1.5 w-0 bg-blue-light md:bottom-1 md:h-1 sm:bottom-1.5 sm:h-[3px]',
        theme === 'white-underlined-motion' && '-bottom-2 h-0.5 w-0 bg-white'
      )}
      initial="start"
      variants={underlineVariants}
      animate={controls}
      aria-hidden
    />
  );

  const onMouseEnter = isUnderline ? handleHoverStart : undefined;
  const onMouseOut = isUnderline ? handleHoverFinish : undefined;

  if (to.startsWith('/')) {
    return (
      <GatsbyLink
        className={clsx(className, 'group', nav && 'flex items-center')}
        to={to}
        onMouseEnter={onMouseEnter}
        onMouseOut={onMouseOut}
        onClick={(e) => (isClickTracked ? handleSegmentEvent(e, to, children) : undefined)}
        {...props}
      >
        {nav === 'prev' && (
          <Arrow className="mr-2 h-[10px] w-[16px] shrink-0 rotate-180 fill-blue-light transition-[fill] duration-200 group-hover:fill-blue-light-hover dark:fill-blue-dark dark:group-hover:fill-blue-light" />
        )}
        {children}
        {nav === 'next' && (
          <Arrow className="ml-2 h-[10px] w-[16px] shrink-0 fill-blue-light transition-[fill] duration-200 group-hover:fill-blue-light-hover dark:fill-blue-dark dark:group-hover:fill-blue-light" />
        )}
        {isUnderline && underline}
      </GatsbyLink>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <a
      className={clsx(className, 'group', nav && 'flex items-center')}
      href={to}
      onMouseEnter={onMouseEnter}
      onMouseOut={onMouseOut}
      onClick={(e) => (isClickTracked ? handleSegmentEvent(e, to, children) : undefined)}
      {...props}
    >
      {nav === 'prev' && (
        <Arrow className="mr-2 h-[10px] w-[16px] rotate-180 fill-blue-light transition-[fill] duration-200 group-hover:fill-blue-light-hover dark:fill-blue-dark dark:group-hover:fill-blue-light" />
      )}
      {children}
      {nav === 'next' && (
        <Arrow className="ml-2 h-[10px] w-[16px] fill-blue-light transition-[fill] duration-200 group-hover:fill-blue-light-hover dark:fill-blue-dark dark:group-hover:fill-blue-light" />
      )}
      {isUnderline && underline}
    </a>
  );
};

Link.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(styles.size)),
  theme: PropTypes.oneOf(Object.keys(styles.theme)),
  children: PropTypes.node.isRequired,
  nav: PropTypes.oneOf(['prev', 'next']),
  isClickTracked: PropTypes.bool,
};

Link.defaultProps = {
  className: null,
  to: null,
  size: null,
  theme: 'black',
  nav: null,
  isClickTracked: false,
};

export default Link;
