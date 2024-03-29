import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';

import CollapsibleItem from 'components/shared/collapsible-item';
import Search from 'components/shared/search';
import { useSidebarContext } from 'context/sidebar-context';

import Item from './item';

const Sidebar = ({ className, sidebar, currentSlug }) => {
  const { sidebarOpenItems, handleSidebarSectionState } = useSidebarContext();
  const activePageItemIndex = useMemo(
    () =>
      sidebar.items.findIndex(({ slug, items }) => {
        if (slug) {
          return slug === currentSlug;
        }

        return (
          items?.find(
            ({ slug, items }) =>
              slug === currentSlug || items?.find(({ slug }) => slug === currentSlug)
          ) !== undefined
        );
      }),
    [currentSlug, sidebar]
  );

  useEffect(() => {
    if (!sidebarOpenItems[activePageItemIndex]) {
      handleSidebarSectionState(activePageItemIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemClick = (e) => {
    const id = e.target.getAttribute('id');
    if (!id) return;
    handleSidebarSectionState(id);
  };

  return (
    <aside
      className={clsx(
        'sticky top-9 my-9 h-full max-h-[calc(100vh-80px)] overflow-y-auto pr-5 md:relative md:top-auto md:my-0 md:max-h-full md:w-full md:overflow-y-visible md:pr-0',
        className
      )}
    >
      <Search className="md:hidden" />
      <nav className="mt-5 md:hidden">
        <ul>
          {sidebar.items.map((item, index) => (
            <Item
              {...item}
              id={index}
              isOpen={sidebarOpenItems[index]}
              currentSlug={currentSlug}
              key={index}
              onClick={handleItemClick}
              onKeyDown={handleItemClick}
            />
          ))}
          {sidebar.external.map((item, index) => (
            <Item
              {...item}
              id={index}
              currentSlug={currentSlug}
              key={index}
              onClick={handleItemClick}
              onKeyDown={handleItemClick}
            />
          ))}
        </ul>
      </nav>
      <nav className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] hidden w-screen bg-grey-96 dark:bg-grey-25 md:block md:px-7 sm:px-4">
        <CollapsibleItem title="Docs navigation" type="navigation">
          <ul className="pt-3">
            {sidebar.items.map((item, index) => (
              <Item
                {...item}
                id={index}
                isOpen={sidebarOpenItems[index]}
                currentSlug={currentSlug}
                key={index}
                onClick={handleItemClick}
                onKeyDown={handleItemClick}
              />
            ))}
            {sidebar.external.map((item, index) => (
              <Item
                {...item}
                id={index}
                currentSlug={currentSlug}
                key={index}
                onClick={handleItemClick}
                onKeyDown={handleItemClick}
              />
            ))}
          </ul>
        </CollapsibleItem>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  sidebar: PropTypes.exact({
    items: PropTypes.arrayOf(
      PropTypes.exact({
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
      })
    ),
    external: PropTypes.arrayOf(
      PropTypes.exact({
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
      })
    ),
  }).isRequired,
  currentSlug: PropTypes.string.isRequired,
};

Sidebar.defaultProps = {
  className: null,
};

export default Sidebar;
