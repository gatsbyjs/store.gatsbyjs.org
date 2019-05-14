import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { colors, dimensions, radius, spacing } from '../../utils/styles';

const CartIndicatorRoot = styled(`div`)`
  background: ${colors.lemon};
  border-radius: ${radius.default}px;
  color: ${colors.brand};
  display: ${props => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  left: 0;
  padding: ${spacing.xs}px ${spacing.sm}px;
  position: absolute;
  top: calc(${dimensions.headerHeight} + ${spacing.md}px);
  transform: translateX(calc((100% + ${spacing.md}px) * -1));
`;

class CartIndicator extends Component {
  state = {
    visible: false,
    message: ''
  };

  componentDidUpdate(prevProps) {
    if (prevProps.adding !== this.props.adding) {
      if (this.props.adding) {
        this.setState({
          visible: true,
          message: 'updating cart ...'
        });
      } else {
        if (this.props.itemsInCart > prevProps.itemsInCart) {
          const num = this.props.itemsInCart - prevProps.itemsInCart;
          const message =
            num > 1
              ? `${num} new items have been added to the cart`
              : `${num} new item has been added to the cart`;

          this.setState({ message });

          setTimeout(
            () => this.setState({ visible: false, message: '' }),
            3000
          );
        }
      }
    }
  }

  render() {
    const { visible, message } = this.state;

    return <CartIndicatorRoot visible={visible}>{message}</CartIndicatorRoot>;
  }
}

CartIndicator.propTypes = {
  itemsInCart: PropTypes.number.isRequired,
  adding: PropTypes.bool.isRequired
};

export default CartIndicator;
