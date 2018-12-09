import React from 'react';

export const defaultInterfaceContext = {
  productImagesBrowserPosition: 'initial',
  productImageFeatured: null,
  toggleProductImagesBrowser: () => {},
  featureProductImage: () => {}
};

export default React.createContext(defaultInterfaceContext);
