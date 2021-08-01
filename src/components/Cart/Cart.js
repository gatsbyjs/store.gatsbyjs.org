import React, { Component } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import PropTypes from 'prop-types';

import { MdClose, MdArrowBack, MdArrowForward } from 'react-icons/md';

import { RiShoppingCartLine } from 'react-icons/ri';

import StoreContext from '../../context/StoreContext';
import CartList from './CartList';
import CartIndicator from './CartIndicator';
import EmptyCart from './EmptyCart';
import FreeBonus from './FreeBonus';
import ShippingInfo from './ShippingInfo';
import { Button, PrimaryButton } from '../shared/Buttons';
import { transitions, visuallyHidden } from '../../utils/styles';

import {
  breakpoints,
  colors,
  fonts,
  spacing,
  dimensions,
  fontSizes,
  lineHeights
} from '../../utils/styles';

const CartRoot = styled(`div`)`
  background: ${colors.lightest};
  bottom: 0;
  position: fixed;
  right: 0;
  top: -1px;
  transform: translateX(100%);
  transition: transform ${transitions.sidebar};
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
    border-left: 1px solid ${colors.border};

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
  font-size: ${fontSizes.lg};
  left: -${dimensions.headerHeight};
  margin: 0;
  margin-left: ${spacing.lg}px;
  position: relative;

  .open & {
    margin-left: calc(${dimensions.headerHeight} + ${spacing.md}px);

    @media (min-width: ${breakpoints.desktop}px) {
      margin-left: ${spacing.xl}px;
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
    padding: ${spacing.xl}px;
  }
`;

const ItemsNumber = styled(`span`)`
  align-items: center;
  background: ${colors.accent};
  border-radius: 50%;
  color: ${colors.lightest};
  display: flex;
  font-size: ${fontSizes.md};
  font-weight: bold;
  height: 28px;
  justify-content: center;
  width: 28px;
`;

const ItemsInCart = styled(`div`)`
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  line-height: ${lineHeights.dense};
  text-align: right;

  ${ItemsNumber} {
    margin-left: ${spacing.xs}px;
    margin-right: ${spacing.md}px;
  }
`;

const Costs = styled('div')`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing.sm}px;
  padding-top: ${spacing.lg}px;
  padding-bottom: ${spacing.lg}px;
`;

const Cost = styled(`div`)`
  display: flex;
  font-size: ${fontSizes.sm};
  padding: 0 ${spacing.xs}px ${spacing['2xs']}px;

  :last-child {
    padding-bottom: 0;
  }

  span {
    color: ${colors.textLight};
    flex-basis: 60%;
    text-align: right;
  }

  strong {
    flex-basis: 40%;
    text-align: right;
  }
`;

const Total = styled(Cost)`
  border-top: 1px solid ${colors.border};
  color: ${colors.text};
  font-size: ${fontSizes.md};
  margin-top: ${spacing.sm}px;
  padding-top: ${spacing.md}px;

  span {
    font-weight: bold;
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
    transform: scale(0.8);
  }
  100% {
    transform: scale(0.7142);
  }
`;

const CartToggle = styled(Button)`
  background: ${colors.lightest};
  border: none;
  border-radius: 0;
  color: ${colors.text};
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
    transform: translateX(0);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    .open & {
      transform: translateX(-100%);
    }
  }

  svg {
    animation: ${iconEntry} 0.75s ease forwards;
    height: 24px;
    margin: 0;
    width: 24px;
  }

  ${ItemsNumber} {
    animation: ${numberEntry} 0.5s ease forwards;
    position: absolute;
    right: ${spacing['2xs']}px;
    top: ${spacing['2xs']}px;
    transform: scale(0.555555);
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

const Small = styled('small')`
  font-weight: normal;
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
                  css={{
                    color: itemsInCart > 0 ? colors.accent : null
                  }}
                >
                  {status === 'open' ? (
                    <MdClose />
                  ) : (
                    <>
                      <RiShoppingCartLine />
                      {itemsInCart > 0 && (
                        <ItemsNumber>{itemsInCart}</ItemsNumber>
                      )}
                    </>
                  )}
                </CartToggle>
                <CartIndicator itemsInCart={itemsInCart} adding={adding} />
                <Title>Your Cart</Title>
                <ItemsInCart>
                  Items
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
                      <span>
                        Subtotal<span css={visuallyHidden}>:</span>
                      </span>{' '}
                      <strong css={{ fontWeight: 'normal' }}>
                        <Small>USD</Small> ${checkout.subtotalPrice}
                      </strong>
                    </Cost>
                    <Cost>
                      <span>
                        Taxes<span css={visuallyHidden}>:</span>
                      </span>{' '}
                      <strong css={{ fontWeight: 'normal' }}>
                        {checkout.totalTax}
                      </strong>
                    </Cost>
                    <Cost>
                      <span>
                        Shipping (worldwide)<span css={visuallyHidden}>:</span>
                      </span>{' '}
                      <strong>FREE</strong>
                    </Cost>
                    <Total>
                      <span>
                        Total Price<span css={visuallyHidden}>:</span>
                      </span>
                      <strong>
                        <Small>USD</Small> ${checkout.totalPrice}
                      </strong>
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
