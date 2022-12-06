import PropTypes from 'prop-types';
import React from 'react';

// import EditDocLink from 'components/pages/doc/edit-doc-link';
import Link from 'components/shared/link';
import ContentsIcon from 'icons/contents.inline.svg';
import getIdFromChildren from 'utils/get-id-from-children';

const TableOfContents = ({ items /* fileUrl */ }) => {
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

  return (
    <aside className="lg:hidden">
      <nav className="sticky top-8 mt-8 ml-10">
        {/* <div className="border-b border-solid border-grey-88 pb-2 dark:border-grey-40">
          <EditDocLink to={fileUrl} />
        </div> */}
        <div className="mt-5 flex items-center text-grey-25 dark:text-grey-88">
          <ContentsIcon className="mb-0.5 text-grey-25 dark:text-grey-88" />
          <h3 className="pl-2 font-mono text-sm font-bold">Contents</h3>
        </div>
        <ul className="flex flex-col">
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
