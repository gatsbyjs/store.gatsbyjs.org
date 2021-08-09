import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { MdCheck } from 'react-icons/md';

import {
  colors,
  dimensions,
  radius,
  spacing,
  lineHeights,
  fontSizes
} from '../../utils/styles';
import Spinner from '../shared/Spinner';

const CartIndicatorRoot = styled(`div`)`
  align-items: center;
  background: ${colors.accent};
  border-radius: ${radius.round}px;
  color: ${colors.lightest};
  display: ${props => (props.visible ? 'flex' : 'none')};
  font-size: ${fontSizes.sm};
  justify-content: center;
  left: 0;
  line-height: ${lineHeights.solid};
  padding: ${spacing.xs} ${spacing.md} ${spacing.xs} ${spacing.sm};
  position: absolute;
  top: calc(${dimensions.headerHeight} + ${spacing.md});
  transform: translateX(calc((100% + ${spacing.md}) * -1));
`;

class CartIndicator extends Component {
  state = {
    visible: false,
    message: '',
    icon: ''
  };

  componentDidUpdate(prevProps) {
    if (prevProps.adding !== this.props.adding) {
      if (this.props.adding) {
        this.setState({
          visible: true,
          message: 'Updating cart',
          icon: <Spinner light />
        });
      } else {
        if (this.props.itemsInCart > prevProps.itemsInCart) {
          const num = this.props.itemsInCart - prevProps.itemsInCart;
          const message =
            num > 1
              ? `${num} items added to the cart`
              : `${num} item added to the cart`;

          this.setState({ message, icon: <MdCheck /> });

          setTimeout(
            () => this.setState({ visible: false, message: '' }),
            3000
          );
        }
      }
    }
  }

  render() {
    const { visible, message, icon } = this.state;

    return (
      <CartIndicatorRoot visible={visible}>
        <span css={{ marginRight: spacing.xs, fontSize: 20, display: 'block' }}>
          {icon}
        </span>{' '}
        {message}
      </CartIndicatorRoot>
    );
  }
}

CartIndicator.propTypes = {
  itemsInCart: PropTypes.number.isRequired,
  adding: PropTypes.bool.isRequired
};

export default CartIndicator;
