import React from 'react';
import styled from 'react-emotion';
import StoreContext from '../../context/StoreContext';
import EmptyCart from './EmptyCart';
import ItemList from './ItemList';
import { colors, button, dropdown, spacing } from '../../utils/styles';
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

const AddedToCartMessage = styled('div')`
  background: ${colors.brandLighter};
  border-bottom: 1px solid ${colors.brandLight};
  color: ${colors.brand};
  font-size: 0.875rem;
  margin: 0;
  margin-left: -${spacing.sm}px;
  margin-right: -${spacing.sm}px;
  padding: ${spacing.sm}px;
`;

const AddedToCartProductInfo = styled('p')`
  color: ${colors.lilac};
  font-size: 0.75rem;
  margin: 0;
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
            <Divider />
            {checkout.lineItems.length > 0 ? (
              <>
                {/* <AddedToCartMessage>
                  <strong>Excellent Choice!</strong>{' '}
                  <span role="img" aria-label="sparkles">
                    ✨
                  </span>
                  <AddedToCartProductInfo>
                    Added 1x “Purple Logo Tee”:
                  </AddedToCartProductInfo>
                </AddedToCartMessage> */}
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
