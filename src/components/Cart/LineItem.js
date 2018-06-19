import React from 'react';
import styled from 'react-emotion';
import { colors, fonts } from '../../utils/styles';

const Item = styled('li')`
  align-items: center;
  display: flex;
  margin: 0;
  padding: 0.5rem;

  :nth-child(2n + 2) {
    background-color: ${colors.brand}0a;
  }
`;

const Thumb = styled('img')`
  border: 1px solid ${colors.textLight}bf;
  box-sizing: border-box;
  display: inline-block;
  height: 35px;
  margin: 0 1rem 0 0;
  width: 35px;
`;

const ItemInfo = styled('p')`
  flex: 2 40%;
  margin: 0;
`;

const Name = styled('strong')`
  display: block;
  font-family: ${fonts.heading};
  font-size: 0.875rem;
`;

const MetaData = styled('em')`
  color: ${colors.textLight};
  display: block;
  font-size: 0.75rem;
  font-style: normal;
`;

const Quantity = styled('p')`
  font-size: 0.875rem;
  margin: 0 1rem;
`;

const Remove = styled('a')`
  color: ${colors.textLight};
  font-family: ${fonts.heading};
  text-decoration: none;
`;

export default ({ item, handleRemove }) => (
  <Item>
    <Thumb src={item.variant.image.src} alt={item.variant.image.altText} />
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
