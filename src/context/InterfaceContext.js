import React from 'react';

export const defaultInterfaceContext = {
  productImagesBrowserStatus: 'initial',
  productImageFeatured: null,
  toggleProductImagesBrowser: () => {},
  featureProductImage: () => {}
};

export default React.createContext(defaultInterfaceContext);
