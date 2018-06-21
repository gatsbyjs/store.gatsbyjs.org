import React from 'react';
import styled from 'react-emotion';
import StoreContext from '../../context/StoreContext';
import ItemList from './ItemList';
import { colors, button, fonts } from '../../utils/styles';
import { Text } from '../shared/Typography';

const OpenCart = styled('div')`
  background: ${colors.lightest};
  border-radius: 0.25rem;
  border-top-right-radius: 0;
  box-shadow: 0 3px 8px ${colors.textLight}40;
  box-sizing: border-box;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 100%;
  width: 300px;
`;

const Heading = styled('h4')`
  font-family: ${fonts.heading};
  font-weight: normal;
  margin: 0 0 0.25rem;
`;

const Checkout = styled('a')`
  ${button.default};
  ${button.big};
  ${button.purple};
`;

const CostBlock = styled('div')`
  color: ${colors.textLight};
  font-family: ${fonts.heading};
  font-size: 0.875rem;
  margin: 0.5rem 0 0;
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
  color: ${colors.darkest};
  font-weight: bold;
  margin: 0;
`;

const CurrencyText = styled(Text)`
  color: ${colors.textLight};
  font-size: 0.75rem;
  text-align: center;
`;

export default () => (
  <StoreContext.Consumer>
    {({ client, checkout, isCartOpen, removeLineItem }) => {
      const handleRemove = itemID => event => {
        event.preventDefault();
        removeLineItem(client, checkout.id, itemID);
      };

      return (
        isCartOpen && (
          <OpenCart>
            <Heading>Your Cart</Heading>
            <ItemList items={checkout.lineItems} handleRemove={handleRemove} />
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
            <Checkout href={checkout.webUrl}>Check Out</Checkout>
            <CurrencyText>
              <strong>NOTE:</strong> All prices are in USD
            </CurrencyText>
          </OpenCart>
        )
      );
    }}
  </StoreContext.Consumer>
);
