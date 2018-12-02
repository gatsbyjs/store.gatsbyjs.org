import React from 'react';
import styled, { css } from 'react-emotion';

import { MdClose } from 'react-icons/md';

import CartThumbail from './CartThumbail';
import { Input } from '../shared/FormElements';
import { Button } from '../shared/Buttons';

import {
  breakpoints,
  colors,
  spacing,
  radius,
  input,
  visuallyHidden
} from '../../utils/styles';

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

// Add our own debounce utility so we don’t need to load a lib.
const debounce = (delay, fn) => {
  let timeout;

  return function(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
      timeout = null;
    }, delay);
  };
};

class CartListItem extends React.Component {
  state = {
    quantity: this.props.item.quantity || 1
  };

  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;

    this.setState({ quantity: value });
    this.props.setCartLoading(true);
    this.debouncedUpdateQuantity(value);
  };

  debouncedUpdateQuantity = debounce(500, quantity =>
    this.props.updateQuantity(quantity)
  );

  removeHandler = event => {
    this.props.setCartLoading(true);
    this.props.handleRemove(event);
  };

  componentWillUnmount() {
    this.props.setCartLoading(false);
  }

  render() {
    const { item } = this.props;
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
          id={`quantiQuantityty_${item.id.substring(58, 64)}`}
          type="number"
          name="quantity"
          min="1"
          step="1"
          onChange={event => this.inputChangeHandler(event)}
          value={this.state.quantity}
        />
        <Remove onClick={this.removeHandler}>
          <MdClose />
        </Remove>
      </CartListItemRoot>
    );
  }
}

export default CartListItem;
