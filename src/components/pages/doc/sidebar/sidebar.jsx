import PropTypes from 'prop-types';
import React from 'react';

import CollapsibleItem from 'components/shared/collapsible/collapsible-item';
import Search from 'components/shared/search';

import Item from './item';

const getTitle = (sidebar, currentSlug) => {
  let result;

  sidebar.forEach(({ items }) => {
    items.forEach(({ title, slug, items }) => {
      if (slug === currentSlug) result = title;

      items?.forEach(({ title, slug }) => {
        if (slug === currentSlug) result = title;
      });
    });
  });

  return result;
};

const Sidebar = ({ className, sidebar, currentSlug }) => {
  const activeItemIndex = sidebar.findIndex(
    ({ items }) =>
      items.find(
        ({ slug, items }) => slug === currentSlug || items?.find(({ slug }) => slug === currentSlug)
      ) !== undefined
  );

  const title = getTitle(sidebar, currentSlug) ?? 'Navigation';

  return (
    <aside className={className}>
      <Search additionalResultsStyles="max-h-[70vh]" />
      <nav className="mt-5 md:hidden">
        <ul>
          {sidebar.map((item, index) => (
            <Item
              {...item}
              isOpenByDefault={index === activeItemIndex}
              currentSlug={currentSlug}
              key={index}
            />
          ))}
        </ul>
      </nav>

      <nav className="mt-5 hidden md:block">
        <CollapsibleItem
          className="border-t border-dashed border-grey-80 !pb-0 dark:border-grey-40"
          title={title}
          type="navigation"
        >
          <ul className="border-b border-dashed border-grey-80 py-3 dark:border-grey-40">
            {sidebar.map((item, index) => (
              <Item
                {...item}
                isOpenByDefault={index === activeItemIndex}
                currentSlug={currentSlug}
                key={index}
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
  sidebar: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
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
      ).isRequired,
    })
  ).isRequired,
  currentSlug: PropTypes.string.isRequired,
};

Sidebar.defaultProps = {
  className: null,
};

export default Sidebar;
