import React from 'react';

export const defaultInterfaceContext = {
  productImagesBrowserOpen: false,
  productImageFeatured: null,
  toggleProductImagesBrowser: () => {},
  featureProductImage: () => {}
};

export default React.createContext(defaultInterfaceContext);
