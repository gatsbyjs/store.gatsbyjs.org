import React from 'react';
import styled from 'react-emotion';
import CartListItem from './CartListItem';

import { colors, spacing } from '../../utils/styles';

const CartListRoot = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Headers = styled(`div`)`
  border-bottom: 1px solid ${colors.brandBright};
  display: flex;
  justify-content: space-between;

  span {
    color: ${colors.textLight};
    flex-basis: 60px;
    flex-grow: 0;
    font-size: 0.8rem;
    padding-bottom: ${spacing.xs}px;
    text-align: center;

    &:first-child {
      flex-grow: 1;
      text-align: left;
    }
  }
`;

const CartList = ({ items, handleRemove, updateQuantity, setCartLoading }) => (
  <>
    <Headers>
      <span>Product</span>
      <span>Qty.</span>
      <span>Remove</span>
    </Headers>
    <CartListRoot>
      {items.map(item => (
        <CartListItem
          key={item.id}
          item={item}
          handleRemove={handleRemove(item.id)}
          updateQuantity={updateQuantity(item.id)}
          setCartLoading={setCartLoading}
        />
      ))}
    </CartListRoot>
  </>
);

export default CartList;
