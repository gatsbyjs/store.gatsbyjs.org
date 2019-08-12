import React, { Component } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import PropTypes from 'prop-types';

import {
  MdClose,
  MdShoppingCart,
  MdArrowBack,
  MdArrowForward
} from 'react-icons/md';

import StoreContext from '../../context/StoreContext';
import CartList from './CartList';
import CartIndicator from './CartIndicator';
import EmptyCart from './EmptyCart';
import FreeBonus from './FreeBonus';
import ShippingInfo from './ShippingInfo';
import { Button, PrimaryButton } from '../shared/Buttons';

import {
  breakpoints,
  colors,
  fonts,
  spacing,
  dimensions
} from '../../utils/styles';

const CartRoot = styled(`div`)`
  background: ${colors.lightest};
  bottom: 0;
  position: fixed;
  right: 0;
  top: -1px;
  transform: translateX(100%);
  transition: transform 0.75s;
  width: 100%;
  will-change: transform;
  z-index: 1000;

  &.open {
    transform: translateX(0%);
  }

  &.closed {
    transform: translateX(100%);
  }

  ::after {
    background-color: ${colors.lightest};
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: all 250ms;
  }

  &.loading {
    ::after {
      opacity: 0.9;
      pointer-events: all;
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    width: ${dimensions.cartWidthDesktop};

    &.covered {
      display: none;
    }
  }
`;

const Heading = styled(`header`)`
  align-items: center;
  display: flex;
  height: ${dimensions.headerHeight};
  justify-content: flex-start;
`;

const Title = styled(`h2`)`
  flex-grow: 1;
  font-family: ${fonts.heading};
  font-size: 1.8rem;
  left: -${dimensions.headerHeight};
  margin: 0;
  margin-left: ${spacing.md}px;
  position: relative;

  .open & {
    margin-left: calc(${dimensions.headerHeight} + ${spacing.md}px);

    @media (min-width: ${breakpoints.desktop}px) {
      margin-left: ${spacing.md}px;
    }
  }
`;

const Content = styled(`div`)`
  bottom: 0;
  overflow-y: auto;
  padding: ${spacing.lg}px;
  position: absolute;
  top: ${dimensions.headerHeight};
  width: 100%;

  @media (min-width: ${breakpoints.desktop}px) {
    ::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${colors.brandBright};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.lilac};
    }
    ::-webkit-scrollbar-track {
      background: ${colors.brandLight};
    }
  }
`;

const ItemsNumber = styled(`span`)`
  align-items: center;
  background: ${colors.lemon};
  border-radius: 50%;
  color: ${colors.brandDark};
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
  height: 36px;
  justify-content: center;
  width: 36px;
`;

const ItemsInCart = styled(`div`)`
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  line-height: 1.2;
  text-align: right;

  ${ItemsNumber} {
    margin-left: ${spacing.xs}px;
    margin-right: ${spacing.md}px;
  }
`;

const Costs = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: ${spacing.sm}px;
`;

const Cost = styled(`div`)`
  display: flex;
  padding: 0 ${spacing.xs}px ${spacing['2xs']}px;

  :last-child {
    padding-bottom: 0;
  }

  span {
    color: ${colors.textMild};
    flex-basis: 60%;
    font-size: 0.9rem;
    text-align: right;
  }

  strong {
    color: ${colors.lilac};
    flex-basis: 40%;
    text-align: right;
  }
`;

const Total = styled(Cost)`
  border-top: 1px solid ${colors.brandBright};
  color: ${colors.brandDark};
  margin-top: ${spacing.xs}px;
  padding-top: ${spacing.sm}px;

  span {
    font-weight: bold;
    text-transform: uppercase;
  }

  strong,
  span {
    color: inherit;
  }
`;

const iconEntry = keyframes`
  0%, 50% {
    transform: scale(0)
  }
  90% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const numberEntry = keyframes`
  0%{
    transform: scale(0)
  }
  90% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(0.6);
  }
`;

const CartToggle = styled(Button)`
  background: ${colors.lightest};
  border: none;
  border-radius: 0;
  display: flex;
  height: ${dimensions.headerHeight};
  justify-content: center;
  left: 0;
  padding: 0;
  position: relative;
  top: 0;
  transform: translateX(-100%);
  transition: all 0.5s ease;
  width: ${dimensions.headerHeight};

  :focus {
    box-shadow: 0 0 0 1px ${colors.accent} inset;
  }

  .open & {
    background: ${colors.lilac};
    color: ${colors.lightest};
    transform: translateX(0);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    .open & {
      transform: translateX(-100%);
    }
  }

  svg {
    animation: ${iconEntry} 0.75s ease forwards;
    height: 28px;
    margin: 0;
    width: 28px;
  }

  ${ItemsNumber} {
    animation: ${numberEntry} 0.5s ease forwards;
    position: absolute;
    right: ${spacing['3xs']}px;
    top: ${spacing['3xs']}px;
    transform: scale(0.6);
  }
`;

const CheckOut = styled(PrimaryButton)`
  font-size: 1.25rem;
  margin: ${spacing.lg}px 0 ${spacing.md}px;
  width: 100%;
`;

const BackLink = styled(Button)`
  font-size: 1.25rem;
  margin-bottom: ${spacing.sm}px;
  width: 100%;
`;

class Cart extends Component {
  state = {
    className: 'closed',
    isLoading: false
  };

  componentDidUpdate(prevProps) {
    const componentStatusChanged = prevProps.status !== this.props.status;
    const imageBrowserStatusChanged =
      this.props.productImagesBrowserStatus !==
      prevProps.productImagesBrowserStatus;

    if (componentStatusChanged) {
      this.setState({
        className: this.props.status
      });
    }

    if (this.props.isDesktopViewport) {
      if (imageBrowserStatusChanged) {
        if (this.props.productImagesBrowserStatus === 'open') {
          setTimeout(() => {
            this.setState(state => ({
              className: state.className + ' covered'
            }));
          }, 500);
        } else {
          this.setState(state => ({
            className: state.className.replace('covered', '')
          }));
        }
      }
    }
  }

  render() {
    const { status, toggle } = this.props;
    const { className } = this.state;
    const gatsbyStickerPackID =
      'Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzEyMjM5NzcyODc2ODg4MD9jaGVja291dD02N2I5MjkzZTMzZjQ2YWFhMWExMzZmNjc3NzQxYTMzNg==';

    return (
      <StoreContext.Consumer>
        {({ client, checkout, removeLineItem, updateLineItem, adding }) => {
          const setCartLoading = bool => this.setState({ isLoading: bool });

          const handleRemove = itemID => async event => {
            event.preventDefault();
            await removeLineItem(client, checkout.id, itemID);
            setCartLoading(false);
          };

          const handleQuantityChange = lineItemID => async quantity => {
            if (!quantity) {
              return;
            }
            await updateLineItem(client, checkout.id, lineItemID, quantity);
            setCartLoading(false);
          };

          const itemsInCart = checkout.lineItems.reduce(
            (total, item) => total + item.quantity,
            0
          );

          const showFreeBonus = !checkout.lineItems.some(
            ({ id }) => id === gatsbyStickerPackID
          );

          return (
            <CartRoot
              className={`${className} ${
                this.state.isLoading ? 'loading' : ''
              }`}
            >
              <Heading>
                <CartToggle
                  aria-label={`Shopping cart with ${itemsInCart} items`}
                  onClick={toggle}
                >
                  {status === 'open' ? (
                    <MdClose />
                  ) : (
                    <>
                      <MdShoppingCart />
                      {itemsInCart > 0 && (
                        <ItemsNumber>{itemsInCart}</ItemsNumber>
                      )}
                    </>
                  )}
                </CartToggle>
                <CartIndicator itemsInCart={itemsInCart} adding={adding} />
                <Title>Your Cart</Title>
                <ItemsInCart>
                  items
                  <br />
                  in cart
                  <ItemsNumber>{itemsInCart}</ItemsNumber>
                </ItemsInCart>
              </Heading>
              {checkout.lineItems.length > 0 ? (
                <Content>
                  <CartList
                    items={checkout.lineItems}
                    handleRemove={handleRemove}
                    updateQuantity={handleQuantityChange}
                    setCartLoading={setCartLoading}
                    isCartLoading={this.state.isLoading}
                  />

                  <Costs>
                    <Cost>
                      <span>Subtotal:</span>{' '}
                      <strong>USD ${checkout.subtotalPrice}</strong>
                    </Cost>
                    <Cost>
                      <span>Taxes:</span> <strong>{checkout.totalTax}</strong>
                    </Cost>
                    <Cost>
                      <span>Shipping (worldwide):</span> <strong>FREE</strong>
                    </Cost>
                    <Total>
                      <span>Total Price:</span>
                      <strong>USD ${checkout.totalPrice}</strong>
                    </Total>
                  </Costs>

                  <CheckOut href={checkout.webUrl}>
                    Check out <MdArrowForward />
                  </CheckOut>
                  <BackLink onClick={toggle}>
                    <MdArrowBack />
                    Back to shopping
                  </BackLink>

                  {showFreeBonus && <FreeBonus />}

                  <ShippingInfo />
                </Content>
              ) : (
                <EmptyCart />
              )}
            </CartRoot>
          );
        }}
      </StoreContext.Consumer>
    );
  }
}

Cart.propTypes = {
  status: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  contributorAreaStatus: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool,
  productImagesBrowserStatus: PropTypes.string
};

export default Cart;
