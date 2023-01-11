import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Link from 'components/shared/link';
import ChevronRight from 'icons/chevron-right.inline.svg';
import slugToHref from 'utils/slug-to-href';

const Item = ({ title, slug, items, isOpenByDefault, currentSlug }) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const handleClick = () => setIsOpen((isOpen) => !isOpen);

  return (
    <li>
      {slug ? (
        <Link
          className={clsx(
            'flex w-full items-center py-1.5 text-left font-mono text-sm font-semibold leading-snug text-grey-25 transition-colors duration-200 hover:text-blue-light dark:text-white dark:hover:text-blue-dark',
            {
              '!text-blue-light dark:!text-blue-dark': currentSlug === slug,
            }
          )}
          to={slugToHref(slug)}
          theme="black"
        >
          {title}
        </Link>
      ) : (
        <button
          className={clsx(
            'flex w-full items-center py-1.5 text-left text-grey-25 transition-colors duration-200 hover:text-blue-light dark:text-white dark:hover:text-blue-dark',
            isOpen && '!text-blue-light dark:!text-blue-dark'
          )}
          type="button"
          onClick={handleClick}
        >
          <div className="mr-2 -mt-px h-full w-[12px] shrink-0">
            <ChevronRight
              className={clsx('h-[11px] w-[7px] transition-transform duration-200', {
                'ml-0.5 rotate-90 transform': isOpen,
              })}
            />
          </div>
          <span className="font-mono text-sm font-semibold leading-snug">{title}</span>
        </button>
      )}
      {!!items?.length && (
        <ul
          className={clsx(
            'ml-1 border-l border-grey-88  pl-[15px] dark:border-grey-40',
            !isOpen && 'sr-only'
          )}
        >
          {items.map(({ title, slug }, index) => (
            <li key={index}>
              <Link
                className={clsx(
                  '!flex items-center py-2 font-mono text-sm !leading-snug text-grey-25 transition-colors duration-200 first:pt-1.5 last:pb-1.5 dark:text-grey-88',
                  {
                    'font-semibold !text-blue-light dark:!text-blue-dark': currentSlug === slug,
                  }
                )}
                to={slugToHref(slug)}
                theme="black"
                tabIndex={!isOpen ? '-1' : undefined}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.exact({
          title: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
        })
      ),
    })
  ),
  isOpenByDefault: PropTypes.bool,
  currentSlug: PropTypes.string.isRequired,
};

Item.defaultProps = {
  slug: null,
  items: null,
  isOpenByDefault: false,
};

export default Item;
