import React from 'react';
import styled from 'react-emotion';
import StoreContext from '../../context/StoreContext';
import Icon from './Icon';
import { button, colors } from '../../utils/styles';

const Button = styled('a')`
  ${button.default};
  ${button.big};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  position: relative;
`;

const ButtonCount = styled('span')`
  background: ${colors.brand};
  border-radius: 50%;
  box-sizing: border-box;
  color: ${colors.lightest};
  display: inline-block;
  font-size: 0.5rem;
  font-weight: 900;
  height: 2em;
  line-height: 1;
  margin-left: 5px;
  padding: 0.25rem 0;
  position: relative;
  text-align: center;
  width: 2em;
`;

export default () => (
  <StoreContext.Consumer>
    {({ checkout, toggleCart }) => (
      <Button onClick={toggleCart}>
        <Icon />
        <ButtonCount>
          {checkout.lineItems.reduce((total, item) => total + item.quantity, 0)}
        </ButtonCount>
      </Button>
    )}
  </StoreContext.Consumer>
);
