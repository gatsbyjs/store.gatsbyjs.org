import React from 'react';
import styled from 'react-emotion';
import LineItem from './LineItem';

const ItemList = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export default ({ items, handleRemove }) => (
  <ItemList>
    {items.map(item => (
      <LineItem
        key={item.id}
        item={item}
        handleRemove={handleRemove(item.id)}
      />
    ))}
  </ItemList>
);
