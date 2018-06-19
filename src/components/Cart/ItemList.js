import React from 'react';
import styled from 'react-emotion';
import LineItem from './LineItem';
import { colors } from '../../utils/styles';

const ItemList = styled('ul')`
  border-bottom: 1px solid ${colors.brand}20;
  border-top: 1px solid ${colors.brand}20;
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
