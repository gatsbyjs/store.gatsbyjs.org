import React, { useState } from 'react';
import styled from 'react-emotion';

import { MdClose } from 'react-icons/md';

import CartThumbail from './CartThumbail';
import { Input } from '../shared/FormElements';
import { Button } from '../shared/Buttons';

import { breakpoints, colors, spacing } from '../../utils/styles';

const CartListItemRoot = styled('li')`
  align-items: center;
  border-bottom: 1px solid ${colors.brandLight};
  display: flex;
  justify-content: space-between;
  padding: ${spacing.md}px 0;
`;

const Thumbail = styled(CartThumbail)`
  flex-grow: 0;
  margin-left: ${spacing['2xs']}px;
  margin-right: ${spacing.sm}px;
`;

const Info = styled('div')`
  flex-grow: 1;
`;

const Name = styled('span')`
  display: block;
  font-size: 1rem;
  line-height: 1.2;
`;

const Meta = styled('span')`
  color: ${colors.textLight};
  display: block;
  font-size: 0.95rem;
  font-style: normal;
`;

const Quantity = styled(Input)`
  flex-grow: 0;
  height: 44px;
  margin-right: ${spacing.xs}px;
  padding: 0 ${spacing.xs}px 0;
  text-align: center;
  width: 50px;

  @media (min-width: ${breakpoints.desktop}px) {
    width: 70px;
  }
`;

const Remove = styled(Button)`
  border: 1px dotted ${colors.textLighter};
  display: flex;
  height: 44px;
  justify-content: center;
  margin-right: ${spacing['2xs']}px;
  padding: 0;
  width: 44px;

  svg {
    height: 24px;
    margin: 0;
    width: 24px;
  }
`;

export default ({
  item,
  setCartLoading,
  updateQuantity,
  handleRemove,
  isCartLoading
}) => {
  const [quantity, setQuantity] = useState(1);

  if (item.quantity !== quantity && !isCartLoading) {
    setQuantity(item.quantity);
  }

  const handleInputChange = event => {
    if (isCartLoading) {
      return;
    }

    const target = event.target;
    const value = Number(target.value);

    setCartLoading(true);
    setQuantity(value);
    updateQuantity(value);
  };

  const handleRemoveItem = event => {
    setCartLoading(true);
    handleRemove(event);
  };

  return (
    <CartListItemRoot>
      <Thumbail
        id={item.variant.image.id}
        fallback={item.variant.image.src}
        alt={item.variant.image.altText}
      />
      <Info>
        <Name>{item.title}</Name>
        <Meta>
          {item.variant.title}, ${item.variant.price}
        </Meta>
      </Info>
      <Quantity
        aria-label="Quantity"
        id={`quantity_${item.id.substring(58, 64)}`}
        type="number"
        name="quantity"
        min="1"
        step="1"
        onChange={event => handleInputChange(event)}
        value={quantity}
      />
      <Remove onClick={handleRemoveItem}>
        <MdClose />
      </Remove>
    </CartListItemRoot>
  );
};
