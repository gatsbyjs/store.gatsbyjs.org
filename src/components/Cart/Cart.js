import React, { Component } from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import PropTypes from "prop-types"

import { MdArrowBack, MdArrowForward } from "react-icons/md"
import { RiCloseLine } from "react-icons/ri"

import { RiShoppingCartLine } from "react-icons/ri"

import StoreContext from "../../context/StoreContext"
import CartList from "./CartList"
import CartIndicator from "./CartIndicator"
import EmptyCart from "./EmptyCart"
import FreeBonus from "./FreeBonus"
import ShippingInfo from "./ShippingInfo"
import { Button, PrimaryButton } from "../shared/Buttons"
import { transitions, visuallyHidden } from "../../utils/styles"

import {
  borders,
  breakpoints,
  colors,
  dimensions,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
  shadows,
  zIndices,
} from "../../utils/styles"

const CartRoot = styled(`div`)`
  background: ${colors.lightest};
  bottom: 0;
  max-width: ${dimensions.cartWidthDesktop};
  position: fixed;
  right: 0;
  top: -1px;
  transform: translateX(100%);
  transition: transform ${transitions.sidebar};
  width: 100%;
  will-change: transform;
  z-index: ${zIndices.cart};
  display: flex;
  flex-direction: column;

  &.open {
    border-left: ${borders.grid};
    box-shadow: ${shadows.card};
    transform: translateX(0%);
  }

  &.closed {
    transform: translateX(100%);
  }

  ::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${colors.lightest};
    opacity: 0;
    transition: all ${transitions.speed.default};
    content: "";
    pointer-events: none;
  }

  &.loading {
    ::after {
      opacity: 0.9;
      pointer-events: all;
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    &.covered {
      display: none;
    }
  }
`

const Heading = styled(`header`)`
  align-items: center;
  display: flex;
  height: ${dimensions.headerHeight};
  justify-content: flex-start;
`

const Title = styled(`h2`)`
  flex-grow: 1;
  font-family: ${fonts.heading};
  font-size: ${fontSizes.lg};
  left: -${dimensions.headerHeight};
  margin: 0;
  margin-left: ${dimensions.gutter.desktop};
  position: relative;

  .open & {
    margin-left: calc(${dimensions.gutter.desktop} + ${spacing.lg});

    @media (min-width: ${breakpoints.tablet}px) {
      margin-left: ${dimensions.gutter.desktop};
    }
  }
`

const Content = styled(`div`)`
  bottom: 0;
  overflow-y: auto;
  padding: ${dimensions.gutter.desktop};
  position: absolute;
  top: ${dimensions.headerHeight};
  width: 100%;

  @media (min-width: ${breakpoints.desktop}px) {
    padding: ${spacing.xl};
  }
`

const ItemsNumber = styled(`span`)`
  align-items: center;
  background: ${colors.brand};
  border-radius: 50%;
  color: ${colors.lightest};
  display: flex;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  height: 28px;
  justify-content: center;
  width: 28px;
`

const ItemsInCart = styled(`div`)`
  align-items: center;
  display: flex;
  font-size: ${fontSizes.xs};
  line-height: ${lineHeights.dense};
  text-align: right;

  ${ItemsNumber} {
    margin-right: ${dimensions.gutter.desktop};
    margin-left: ${spacing.xs};
  }
`

const Costs = styled(`div`)`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing.sm};
  padding-bottom: ${spacing.lg};
  padding-top: ${spacing.lg};
`

const Cost = styled(`div`)`
  display: flex;
  font-size: ${fontSizes.md};
  padding: 0 0 ${spacing[`2xs`]};

  :last-child {
    padding-bottom: 0;
  }

  span {
    flex-basis: 60%;
    color: ${colors.text};
    text-align: right;
  }

  strong {
    flex-basis: 40%;
    text-align: right;
  }
`

const Total = styled(Cost)`
  color: ${colors.text};
  font-size: ${fontSizes.md};
  margin-top: ${spacing.sm};
  padding-top: ${spacing.md};

  span {
    font-weight: ${fontWeights.bold};
  }

  strong,
  span {
    color: inherit;
  }
`

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
`

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
`

const CartToggle = styled(Button)`
  background: transparent;
  border: none;
  border-left: ${borders.grid};
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
  transition: all ${transitions.speed.slow} ease;
  width: ${dimensions.headerHeight};

  .open & {
    transform: translateX(0);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    .open & {
      border-left-color: transparent;
      transform: translateX(calc((100% + 1px) * -1));
    }
  }

  svg {
    width: 24px;
    height: 24px;
    margin: 0;
    animation: ${iconEntry} 0.75s ease forwards;
  }

  ${ItemsNumber} {
    position: absolute;
    top: ${spacing[`2xs`]};
    right: ${spacing[`2xs`]};
    transform: scale(0.555555);
    animation: ${numberEntry} ${transitions.speed.slow} ease forwards;
  }
`

const CheckOut = styled(PrimaryButton)`
  margin: ${spacing.lg} 0 ${spacing.md};
  width: 100%;
`

const BackLink = styled(Button)`
  margin-bottom: ${spacing.sm};
  width: 100%;
`

const Small = styled(`small`)`
  font-weight: ${fontWeights.medium};
`

class Cart extends Component {
  state = {
    className: `closed`,
    isLoading: false,
  }

  componentDidUpdate(prevProps) {
    const componentStatusChanged = prevProps.status !== this.props.status
    const imageBrowserStatusChanged =
      this.props.productImagesBrowserStatus !==
      prevProps.productImagesBrowserStatus

    if (componentStatusChanged) {
      this.setState({
        className: this.props.status,
      })
    }

    if (this.props.isDesktopViewport) {
      if (imageBrowserStatusChanged) {
        if (this.props.productImagesBrowserStatus === `open`) {
          setTimeout(() => {
            this.setState((state) => {
              return {
                className: state.className + ` covered`,
              }
            })
          }, 500)
        } else {
          this.setState((state) => {
            return {
              className: state.className.replace(`covered`, ``),
            }
          })
        }
      }
    }
  }

  render() {
    const { status, toggle } = this.props
    const { className } = this.state
    const gatsbyStickerPackID = `Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzEyMjM5NzcyODc2ODg4MD9jaGVja291dD02N2I5MjkzZTMzZjQ2YWFhMWExMzZmNjc3NzQxYTMzNg==`

    return (
      <StoreContext.Consumer>
        {({ client, checkout, removeLineItem, updateLineItem, adding }) => {
          const setCartLoading = (bool) => this.setState({ isLoading: bool })

          const handleRemove = (itemID) => async (event) => {
            event.preventDefault()
            await removeLineItem(client, checkout.id, itemID)
            setCartLoading(false)
          }

          const handleQuantityChange = (lineItemID) => async (quantity) => {
            if (!quantity) {
              return
            }
            await updateLineItem(client, checkout.id, lineItemID, quantity)
            setCartLoading(false)
          }

          const itemsInCart = checkout.lineItems.reduce(
            (total, item) => total + item.quantity,
            0,
          )

          const showFreeBonus = !checkout.lineItems.some(
            ({ id }) => id === gatsbyStickerPackID,
          )

          return (
            <CartRoot
              className={`${className} ${
                this.state.isLoading ? `loading` : ``
              }`}
            >
              <Heading>
                <CartToggle
                  aria-label={`Shopping cart with ${itemsInCart} items`}
                  onClick={toggle}
                >
                  {status === `open` ? (
                    <RiCloseLine
                      css={{
                        color: colors.brand,

                        [`@media (min-width: ${breakpoints.tablet}px)`]: {
                          color: colors.lightest,
                        },
                      }}
                    />
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
                      </span>
                      {` `}
                      <strong>
                        <Small>USD</Small> ${checkout.subtotalPrice}
                      </strong>
                    </Cost>
                    <Cost>
                      <span>
                        Taxes<span css={visuallyHidden}>:</span>
                      </span>
                      {` `}
                      <strong>{checkout.totalTax}</strong>
                    </Cost>
                    <Cost>
                      <span>
                        Shipping (worldwide)<span css={visuallyHidden}>:</span>
                      </span>
                      {` `}
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
          )
        }}
      </StoreContext.Consumer>
    )
  }
}

Cart.propTypes = {
  status: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  contributorAreaStatus: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool,
  productImagesBrowserStatus: PropTypes.string,
}

export default Cart
