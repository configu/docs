import React, { useMemo, createContext, useContext, useState, useCallback } from 'react';

import sidebar from '../../content/sidebar.json';

export const SidebarContext = createContext([]);

// eslint-disable-next-line react/prop-types
export const SidebarContextAPI = ({ children }) => {
  const [sidebarOpenItems, setSidebarOpenItems] = useState(
    sidebar.items.reduce((acc, _, i) => {
      acc[i] = true;
      return acc;
    }, {})
  );

  const handleSidebarSectionState = useCallback(
    (id) => {
      setSidebarOpenItems((prevState) => {
        const sectionHasState = prevState[id] !== 'undefined';
        return {
          ...prevState,
          [id]: sectionHasState ? !prevState[id] : true,
        };
      });
    },
    [setSidebarOpenItems]
  );

  const contextValue = useMemo(
    () => ({
      sidebarOpenItems,
      setSidebarOpenItems,
      handleSidebarSectionState,
    }),
    [sidebarOpenItems, setSidebarOpenItems, handleSidebarSectionState]
  );

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
};

export const useSidebarContext = () => useContext(SidebarContext);
