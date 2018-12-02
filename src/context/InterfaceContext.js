import React from 'react';

export const defaultInterfaceContext = {
  isDesktopViewport: null,
  cartStatus: 'initial',
  toggleCart: () => {},
  productImageFeatured: null,
  featureProductImage: () => {},
  productImagesBrowserStatus: 'initial',
  toggleProductImagesBrowser: () => {},
  contributorAreaStatus: 'initial',
  toggleContributorArea: () => {}
};

export default React.createContext(defaultInterfaceContext);
