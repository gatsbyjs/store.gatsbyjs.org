import React from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'gatsby-swag.myshopify.com',
  storefrontAccessToken: '9aa73c089d34741f36edbe4d7314373a'
});

export const defaultStoreContext = {
  client,
  isCartOpen: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateQuantity: () => {},
  toggleCart: () => {}
};

const StoreContext = React.createContext(defaultStoreContext);

export const withStoreContext = (Component) => {
  return (props) => (
    <StoreContext.Consumer>
      {context => <Component {...props} storeContext={context} />}
    </StoreContext.Consumer>
  )
};

export default StoreContext;
