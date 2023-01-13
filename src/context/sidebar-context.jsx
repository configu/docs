import React, { createContext, useContext, useState, useEffect } from 'react';

import useLocalStorage from 'hooks/use-local-storage';

export const SidebarContext = createContext([]);

// eslint-disable-next-line react/prop-types
export const SidebarContextAPI = ({ children }) => {
  const [sidebarOpenItems, setSidebarOpenItems] = useState({});
  const [storageOpenItems, setStorageOpenItems] = useLocalStorage(
    'sidebar-open-items',
    JSON.stringify({})
  );

  useEffect(() => {
    if (JSON.stringify(sidebarOpenItems) !== storageOpenItems) {
      if (JSON.stringify(sidebarOpenItems) === '{}' && storageOpenItems !== '{}') {
        return setSidebarOpenItems(JSON.parse(storageOpenItems));
      }

      return setStorageOpenItems(JSON.stringify(sidebarOpenItems));
    }
  }, [sidebarOpenItems, setStorageOpenItems, storageOpenItems]);

  const handleCloseItem = (id) => {
    setSidebarOpenItems((prv) => {
      const newObj = { ...prv };
      delete newObj[id];

      return newObj;
    });
  };

  const handleOpenItem = (id) => {
    setSidebarOpenItems((prv) => ({ ...prv, [id]: true }));
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarOpenItems,
        setSidebarOpenItems,
        handleCloseItem,
        handleOpenItem,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
