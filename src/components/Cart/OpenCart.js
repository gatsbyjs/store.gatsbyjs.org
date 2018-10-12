import React from 'react';
import styled from 'react-emotion';
import StoreContext from '../../context/StoreContext';
import EmptyCart from './EmptyCart';
// import AddedToCart from './AddedToCart';
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

const Checkout = styled('a')`
  ${button.default};
  ${button.big};
  ${button.purple};
`;

const CostBlock = styled('div')`
  font-size: 0.875rem;
  margin: ${spacing.sm}px 0;
  text-align: right;
  position: relative;

  ::before {
    background-color: ${colors.lightest}dd;
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    opacity: ${props => (props.isLoading ? 1 : 0)};
    position: absolute;
    top: 0;
    transition: opacity 0.5s ease;
    right: 0;
    z-index: 2;
  }
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
  ${button.link};
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
  ${button.link};
`;

class OpenCartComp extends React.Component {
  state = {
    isLoading: false
  };

  render() {
    return (
      <StoreContext.Consumer>
        {({
          client,
          checkout,
          isCartOpen,
          removeLineItem,
          updateLineItem,
          toggleCart
        }) => {
          const setCartLoading = bool => this.setState({ isLoading: bool });
          const handleRemove = itemID => event => {
            event.preventDefault();
            removeLineItem(client, checkout.id, itemID);
          };
          const handleQuantityChange = lineItemID => async quantity => {
            if (!quantity) {
              return;
            }
            await updateLineItem(client, checkout.id, lineItemID, quantity);
            setCartLoading(false);
          };

          return (
            isCartOpen && (
              <OpenCart>
                <Heading>
                  Your Cart{' '}
                  <CloseCartButton onClick={toggleCart}>
                    &times;
                  </CloseCartButton>
                </Heading>
                <Divider />
                {checkout.lineItems.length > 0 ? (
                  <>
                    {/* <AddedToCart /> */}
                    <ItemList
                      items={checkout.lineItems}
                      handleRemove={handleRemove}
                      updateQuantity={handleQuantityChange}
                      setCartLoading={setCartLoading}
                    />
                    <CostBlock isLoading={this.state.isLoading}>
                      <CostDetails>
                        Subtotal: <PriceBox>${checkout.subtotalPrice}</PriceBox>
                      </CostDetails>
                      <CostDetails>
                        Taxes: <PriceBox>{checkout.totalTax}</PriceBox>
                      </CostDetails>
                      <CostDetails>
                        Shipping: <PriceBox>FREE</PriceBox>
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
                      </ContinueShoppingLink>
                      !
                    </ContinueShopping>
                    <CurrencyText>
                      All prices in USD. Free shipping worldwide.
                    </CurrencyText>
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
  }
}

export default OpenCartComp;
