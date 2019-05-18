import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { colors, dimensions, radius, spacing } from '../../utils/styles';
import { usePrevious } from '../../utils/usePrevious';

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

export const CartIndicator = ({ adding, itemsInCart }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const prevItemsInCart = usePrevious(itemsInCart);

  useEffect(() => {
    if (adding) {
      setVisible(true);
      setMessage('updating cart ...');
    } else {
      if (itemsInCart > prevItemsInCart) {
        const num = itemsInCart - prevItemsInCart;
        const message =
          num > 1
            ? `${num} new items have been added to the cart`
            : `${num} new item has been added to the cart`;

        setMessage(message);

        setTimeout(() => {
          setVisible(false);
          setMessage('');
        }, 3000);
      }
    }
  }, [adding, itemsInCart]);
  return <CartIndicatorRoot visible={visible}>{message}</CartIndicatorRoot>;
};

CartIndicator.propTypes = {
  itemsInCart: PropTypes.number.isRequired,
  adding: PropTypes.bool.isRequired
};

export default CartIndicator;
