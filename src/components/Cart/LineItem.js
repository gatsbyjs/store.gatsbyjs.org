import React from 'react';
import styled from 'react-emotion';
import ProductImage from './ProductImage';
import { colors, spacing, radius } from '../../utils/styles';

const Item = styled('li')`
  align-items: center;
  border-bottom: 1px solid ${colors.brandLight};
  display: flex;
  margin: 0;
  margin-left: -${spacing.sm}px;
  margin-right: -${spacing.sm}px;
  padding: ${spacing.sm}px;

  :nth-child(2n + 2) {
    background-color: ${colors.brandLighter};
  }
`;

const Thumb = styled(ProductImage)`
  border-radius: ${radius.default}px;
  box-sizing: border-box;
  display: inline-block;
  height: 40px;
  margin: 0 ${spacing.sm}px 0 0;
  width: 40px;
`;

const ItemInfo = styled('p')`
  flex: 2 40%;
  margin: 0;
`;

const Name = styled('strong')`
  display: block;
  font-size: 0.875rem;
`;

const MetaData = styled('em')`
  color: ${colors.lilac};
  display: block;
  font-size: 0.75rem;
  font-style: normal;
`;

const Quantity = styled('p')`
  font-size: 0.875rem;
  margin: 0 1rem;
`;

const Remove = styled('a')`
  border-radius: 50%;
  color: ${colors.lilac};
  height: 20px;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  transition: all 0.15s ease-in-out;
  width: 20px;

  :hover {
    background: ${colors.brand};
    color: ${colors.brandLighter};
  }
`;

export default ({ item, handleRemove }) => (
  <Item>
    <Thumb
      id={item.variant.image.id}
      fallback={item.variant.image.src}
      alt={item.variant.image.altText}
    />
    <ItemInfo>
      <Name>{item.title}</Name>
      <MetaData>
        {item.variant.title}, ${item.variant.price}
      </MetaData>
    </ItemInfo>
    <Quantity>{item.quantity}</Quantity>
    <Remove
      href="#remove"
      title="Remove this item from your cart."
      onClick={handleRemove}
    >
      &times;
    </Remove>
  </Item>
);
