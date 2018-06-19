import React from 'react';
import styled from 'react-emotion';
import MenuToggle from './MenuToggle';
import OpenCart from './OpenCart';

const Cart = styled('section')`
  position: relative;
`;

export default () => (
  <Cart>
    <MenuToggle />
    <OpenCart />
  </Cart>
);
