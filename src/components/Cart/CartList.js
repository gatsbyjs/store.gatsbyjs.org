import React from "react"
import styled from "@emotion/styled"
import CartListItem from "./CartListItem"

import { colors, spacing } from "../../utils/styles"

const CartListRoot = styled(`ul`)`
  border-bottom: 1px solid ${colors.border};
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: ${spacing.lg};
  flex-direction: column;
  padding: ${spacing.lg} 0;
`

const Headers = styled(`div`)`
  border-bottom: 1px solid ${colors.border};
  display: flex;
  justify-content: space-between;

  span {
    flex-basis: 60px;
    flex-grow: 0;
    padding-bottom: ${spacing.xs};
    color: ${colors.textLight};
    font-size: 0.8rem;
    text-align: center;

    &:first-of-type {
      flex-grow: 1;
      text-align: left;
    }
  }
`

const CartList = ({
  items,
  handleRemove,
  updateQuantity,
  setCartLoading,
  isCartLoading,
}) => (
  <>
    <Headers>
      <span>Product</span>
      <span>Qty.</span>
      <span>Remove</span>
    </Headers>
    <CartListRoot>
      {items.map((item) => (
        <CartListItem
          key={item.id}
          item={item}
          handleRemove={handleRemove(item.id)}
          updateQuantity={updateQuantity(item.id)}
          setCartLoading={setCartLoading}
          isCartLoading={isCartLoading}
        />
      ))}
    </CartListRoot>
  </>
)

export default CartList
