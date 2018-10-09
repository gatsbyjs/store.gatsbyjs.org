import React from 'react';
import styled from 'react-emotion';
import LineItem from './LineItem';

const ItemList = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export default ({ items, handleRemove, updateQuantity }) => (
  <ItemList>
    {items.map(item => (
      <LineItem
        key={item.id}
        item={item}
        handleRemove={handleRemove(item.id)}
        updateQuantity={updateQuantity(item.id)}
      />
    ))}
  </ItemList>
);
