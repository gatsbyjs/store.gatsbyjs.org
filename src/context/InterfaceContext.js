import React from 'react';

export const defaultInterfaceContext = {
  productImagesBrowserIsOpen: false,
  productImageFeatured: null,
  toggleProductImagesBrowser: () => {},
  featureProductImage: () => {}
};

export default React.createContext(defaultInterfaceContext);
