import React from 'react';
import styled from 'react-emotion';
import StoreContext from '../../context/StoreContext';
import EmptyCart from './EmptyCart';
import AddedToCart from './AddedToCart';
import ItemList from './ItemList';
import {
  colors,
  button,
  dropdown,
  spacing,
  buttonAsLink
} from '../../utils/styles';
import { Text } from '../shared/Typography';

const OpenCart = styled('div')`
  ${dropdown.container};
  width: 280px;
`;

const Heading = styled('h4')`
  ${dropdown.heading};
`;

const Divider = styled('div')`
  ${dropdown.divider};
`;

const Checkout = styled('a')`
  ${button.default};
  ${button.big};
  ${button.purple};
`;

const CostBlock = styled('div')`
  font-size: 0.875rem;
  margin: ${spacing.sm}px 0;
  text-align: right;
`;

const PriceBox = styled('span')`
  display: inline-block;
  width: 75px;
`;

const CostDetails = styled('p')`
  margin: 0;
`;

const CostTotal = styled('p')`
  color: ${colors.brand};
  font-weight: bold;
  margin: 0;
`;

const CurrencyText = styled(Text)`
  color: ${colors.textLight};
  font-size: 0.75rem;
  text-align: center;
`;

const CloseCartButton = styled('button')`
  ${buttonAsLink};
  border-bottom: 0;
  color: ${colors.lilac};
  float: right;
  height: 20px;
  text-align: center;
  width: 20px;
  font-size: 1rem;
`;

const ContinueShopping = styled('p')`
  color: ${colors.lilac};
  font-size: 0.875rem;
  text-align: center;
`;

const ContinueShoppingLink = styled('button')`
  ${buttonAsLink};
`;

export default () => (
  <StoreContext.Consumer>
    {({ client, checkout, isCartOpen, removeLineItem, toggleCart }) => {
      const handleRemove = itemID => event => {
        event.preventDefault();
        removeLineItem(client, checkout.id, itemID);
      };

      return (
        isCartOpen && (
          <OpenCart>
            <Heading>
              Your Cart{' '}
              <CloseCartButton onClick={toggleCart}>&times;</CloseCartButton>
            </Heading>
            <Divider />
            {checkout.lineItems.length > 0 ? (
              <>
                <AddedToCart />
                <ItemList
                  items={checkout.lineItems}
                  handleRemove={handleRemove}
                />
                <CostBlock>
                  <CostDetails>
                    Subtotal: <PriceBox>${checkout.subtotalPrice}</PriceBox>
                  </CostDetails>
                  <CostDetails>
                    Taxes: <PriceBox>{checkout.totalTax}</PriceBox>
                  </CostDetails>
                  <CostTotal>
                    Total Price: <PriceBox>${checkout.totalPrice}</PriceBox>
                  </CostTotal>
                </CostBlock>
                <Divider />
                <Checkout href={checkout.webUrl}>Check Out</Checkout>
                <ContinueShopping>
                  or{' '}
                  <ContinueShoppingLink onClick={toggleCart}>
                    continue shopping
                  </ContinueShoppingLink>!
                </ContinueShopping>
                <CurrencyText>All prices in USD</CurrencyText>
              </>
            ) : (
              <EmptyCart />
            )}
          </OpenCart>
        )
      );
    }}
  </StoreContext.Consumer>
);
