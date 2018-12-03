import React from 'react';

export const defaultInterfaceContext = {
  productImagesBrowserIsActive: false,
  productImageInBrowser: null,
  toggleProductImagesBrowser: () => {}
};

export default React.createContext(defaultInterfaceContext);
