import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';

import CollapsibleItem from 'components/shared/collapsible/collapsible-item';
import Search from 'components/shared/search';
import useLocalStorage from 'hooks/use-local-storage';

import Item from './item';

const getTitle = (sidebar, currentSlug) => {
  let result;

  sidebar.forEach(({ slug, title, items }) => {
    if (slug && title) {
      return title;
    }

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
  const [storageOpenItems, setStorageOpenItems] = useLocalStorage(
    'sidebar-open-items',
    JSON.stringify({})
  );
  const [stateOpenItems, setStateOpenItems] = useState({}); // useState(JSON.parse(storageOpenItems));
  const activePageItemIndex = useMemo(
    () =>
      sidebar.findIndex(({ slug, items }) => {
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

  const title = getTitle(sidebar, currentSlug) ?? 'Docs navigation';

  useEffect(() => {
    if (storageOpenItems === '{}') {
      setStorageOpenItems(JSON.stringify({ [activePageItemIndex]: true }));
      setStateOpenItems({ [activePageItemIndex]: true });
    } else {
      setStateOpenItems(JSON.parse(storageOpenItems));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (storageOpenItems !== JSON.stringify(stateOpenItems)) {
      setStorageOpenItems(JSON.stringify(stateOpenItems));
    }
  }, [stateOpenItems, setStorageOpenItems, storageOpenItems]);

  const handleItemClose = (id) => {
    setStateOpenItems((prv) => {
      const newObj = { ...prv };
      delete newObj[id];

      return newObj;
    });
  };

  const handleItemClick = (e) => {
    const id = e.target.getAttribute('id');

    if (!id) return;

    const isOpen = stateOpenItems[id];

    if (isOpen) {
      return handleItemClose(id);
    }

    setStateOpenItems((prv) => ({ ...prv, [id]: true }));
  };

  return (
    <aside className={className}>
      <Search additionalResultsStyles="max-h-[70vh]" />
      <nav className="mt-5 md:hidden">
        <ul role="list" onClick={handleItemClick}>
          {sidebar.map((item, index) => (
            <Item
              {...item}
              id={index}
              isOpen={stateOpenItems[index]}
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
                id={index}
                isOpen={stateOpenItems[index]}
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
  ).isRequired,
  currentSlug: PropTypes.string.isRequired,
};

Sidebar.defaultProps = {
  className: null,
};

export default Sidebar;
