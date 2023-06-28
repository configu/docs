import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/shared/button';
import Link from 'components/shared/link';
import useScrollOverflow from 'hooks/use-scroll-overflow';
import GithubIcon from 'icons/github.inline.svg';

const ANIMATION_DURATION = 0.2;

const variants = {
  from: {
    opacity: 0,
    translateY: 30,
    transition: {
      duration: ANIMATION_DURATION,
    },
    transitionEnd: {
      zIndex: -1,
    },
  },
  to: {
    zIndex: 40,
    opacity: 1,
    translateY: 0,
    transition: {
      duration: ANIMATION_DURATION,
    },
  },
};

const MobileMenu = ({ isOpen, items }) => {
  const controls = useAnimation();

  useScrollOverflow(controls, isOpen);

  return (
    <motion.nav
      className="safe-paddings fixed inset-0 z-[-1] hidden overflow-x-hidden bg-white px-8 pb-5 dark:bg-grey-15 lg:flex-col lg:justify-between md:flex"
      initial="from"
      animate={controls}
      variants={variants}
    >
      <div className="my-auto mt-16 flex h-full w-full overflow-x-hidden overflow-y-scroll">
        <ul className="my-auto flex w-full flex-col space-y-3 text-center xs:space-y-1">
          {items.map(({ text, to }, index) => (
            <li key={index}>
              <Link className="block py-4" to={to} size="md">
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-auto flex w-full max-w-[500px] shrink-0 flex-col space-y-3">
        <Button className="w-full" to={process.env.GATSBY_CONFIGU_APP_URL} size="sm" theme="blue">
          Get it free
        </Button>
        <Button
          className="w-full !items-center gap-x-2.5"
          to={process.env.GATSBY_CONFIGU_REPO_URL}
          size="sm"
          theme="primary-blue-outline"
        >
          <GithubIcon aria-hidden />
          Star Us
        </Button>
        <Button
          className="w-full"
          to={process.env.GATSBY_CONFIGU_APP_URL}
          size="sm"
          theme="primary-blue-outline"
        >
          Login
        </Button>
      </div>
    </motion.nav>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
};

MobileMenu.defaultProps = {
  isOpen: false,
};

export default MobileMenu;
