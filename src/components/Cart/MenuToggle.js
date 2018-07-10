import React from 'react';
import styled from 'react-emotion';
import StoreContext from '../../context/StoreContext';
import Icon from './Icon';
import { button, colors, spacing } from '../../utils/styles';

const Button = styled('a')`
  ${button.default};
  ${button.ghost};
  ${button.small};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: ${spacing.sm}px;
  position: relative;
`;

const ButtonCount = styled('span')`
  background: ${colors.brandBright};
  border-radius: 50%;
  box-sizing: border-box;
  color: ${colors.brand};
  display: inline-block;
  font-size: 0.5rem;
  font-weight: 900;
  height: 2em;
  line-height: 2em;
  margin-left: ${spacing.xs}px;
  position: relative;
  text-align: center;
  user-select: none;
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
