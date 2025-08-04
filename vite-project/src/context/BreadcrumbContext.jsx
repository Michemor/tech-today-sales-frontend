import React, { createContext, useState } from 'react';

const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState(null);
  const [customPaths, setCustomPaths] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState('');

  const updateBreadcrumb = (tab = null, paths = {}, info = '') => {
    setCurrentTab(tab);
    setCustomPaths(paths);
    setAdditionalInfo(info);
  };

  const clearBreadcrumbInfo = () => {
    setCurrentTab(null);
    setCustomPaths({});
    setAdditionalInfo('');
  };

  const value = {
    currentTab,
    customPaths,
    additionalInfo,
    updateBreadcrumb,
    clearBreadcrumbInfo
  };

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export default BreadcrumbContext;
