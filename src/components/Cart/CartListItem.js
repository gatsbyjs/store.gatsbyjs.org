import React, { useState } from 'react';
import styled from '@emotion/styled';

import { MdClose } from 'react-icons/md';

import CartThumbnail from './CartThumbnail';
import { Input } from '../shared/FormElements';
import { Button } from '../shared/Buttons';

import {
  breakpoints,
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing
} from '../../utils/styles';

const CartListItemRoot = styled('li')`
  align-items: center;
  display: flex;
  gap: ${spacing.md};
  justify-content: space-between;
`;

const Thumbnail = styled(CartThumbnail)`
  flex-grow: 0;
  margin-left: ${spacing['2xs']};
  margin-right: ${spacing.sm};
`;

const Info = styled('div')`
  flex-grow: 1;
`;

const Name = styled('span')`
  display: block;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.semibold};
  line-height: ${lineHeights.dense};

  @media (min-width: ${breakpoints.mobile}px) {
    font-size: ${fontSizes.lg};
  }
`;

const Meta = styled('span')`
  color: ${colors.textLight};
  display: block;
  font-size: ${fontSizes.sm};
  font-style: normal;
  line-height: ${lineHeights.dense};
`;

const Quantity = styled(Input)`
  flex-grow: 0;
  height: 44px;
  margin-right: ${spacing.xs};
  padding: 0 ${spacing.xs} 0;
  text-align: center;
  width: 48px;

  @media (min-width: ${breakpoints.desktop}px) {
    width: 64px;
  }
`;

const Remove = styled(Button)`
  border: 1px solid transparent;
  color: ${colors.text};
  display: flex;
  height: 44px;
  justify-content: center;
  margin-right: ${spacing['2xs']};
  padding: 0;
  width: 44px;

  svg {
    width: 24px;
    height: 24px;
    margin: 0;
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

  if (item.quantity !== quantity && quantity !== '' && !isCartLoading) {
    setQuantity(item.quantity);
  }

  const handleInputChange = event => {
    if (isCartLoading) {
      return;
    }

    const value = event.target.value;

    // Make sure the quantity is always at least 1.
    const safeValue = Math.max(Number(value), 0);

    // No need to update if the value hasn’t updated.
    if (value === quantity) {
      return;
    }

    // If the field is empty, update the state but don’t do anything else.
    if (value === '') {
      setQuantity(value);
      return;
    }

    // Otherwise, trigger the loading state and set the quantity in state.
    setCartLoading(true);
    setQuantity(safeValue);

    // If the quantity is set to 0, remove the item.
    if (safeValue === 0) {
      handleRemove(event);
      return;
    }

    // If we get here, update the quantity.
    updateQuantity(safeValue);
  };

  const handleRemoveItem = event => {
    setCartLoading(true);
    handleRemove(event);
  };

  return (
    <CartListItemRoot>
      <Thumbnail
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
        inputmode="numeric"
        min="1"
        step="1"
        onChange={event => handleInputChange(event)}
        onBlur={() => setQuantity(item.quantity)}
        value={quantity}
      />
      <Remove onClick={handleRemoveItem}>
        <MdClose />
      </Remove>
    </CartListItemRoot>
  );
};
