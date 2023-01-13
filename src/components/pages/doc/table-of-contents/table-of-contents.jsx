import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import EditDocLink from 'components/pages/doc/edit-doc-link';
import Link from 'components/shared/link';
import BackToTop from 'icons/back-top.inline.svg';
import ContentsIcon from 'icons/contents.inline.svg';
import getIdFromChildren from 'utils/get-id-from-children';

const TableOfContents = ({ items, fileUrl }) => {
  const stickyTOCRef = useRef(null);
  const [isButtonShown, setIsButtonShown] = useState(false);

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    const anchor = `#${id}`;
    // changing hash without default jumps to anchor
    // eslint-disable-next-line no-restricted-globals
    if (history.pushState) {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(false, false, anchor);
    } else {
      // old browser support
      window.location.hash = anchor;
    }
  };

  const handleBackToTopClick = (event) => {
    event.preventDefault();

    document.getElementById('gatsby-focus-wrapper').scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const el = stickyTOCRef.current;
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsButtonShown(e.intersectionRatio < 1);
      },
      { rootMargin: '-33px 0px 0px 0px', threshold: [1] }
    );

    observer.observe(el);
  }, []);

  return (
    <aside className="lg:hidden">
      <nav className="sticky top-8 my-8 ml-10" ref={stickyTOCRef}>
        <div className="border-b border-solid border-grey-88 pb-2 dark:border-grey-40">
          <EditDocLink to={fileUrl} />
        </div>
        {items.length > 0 && (
          <>
            <div className="mt-5 flex items-center text-grey-25 dark:text-grey-88">
              <ContentsIcon className="mb-0.5 text-grey-25 dark:text-grey-88" />
              <h3 className="pl-2 font-mono text-sm font-bold">On this page</h3>
            </div>
            <ul className="flex flex-col border-b border-solid border-grey-88 pb-5 dark:border-grey-40">
              {items.map(({ title }, index) => {
                const href = getIdFromChildren(title);

                return (
                  <li className="pt-2 font-semibold first:pt-1.5" key={index}>
                    <Link
                      className="font-mono text-sm text-grey-25 transition-colors duration-200"
                      to={`#${href}`}
                      onClick={(e) => handleAnchorClick(e, href)}
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <motion.button
              className="my-3 inline-flex items-center gap-2 font-mono text-sm font-semibold text-black transition-colors duration-200 hover:text-blue-light dark:text-white dark:hover:text-blue-dark"
              initial="from"
              variants={{
                from: {
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                  },
                },
                to: {
                  opacity: 1,
                  transition: {
                    duration: 0.2,
                  },
                },
              }}
              animate={isButtonShown ? 'to' : 'from'}
              type="button"
              onClick={handleBackToTopClick}
            >
              <BackToTop />
              Back to top
            </motion.button>
          </>
        )}
      </nav>
    </aside>
  );
};

TableOfContents.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  fileUrl: PropTypes.string.isRequired,
};

export default TableOfContents;
