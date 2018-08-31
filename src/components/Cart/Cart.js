import React from 'react';
import styled from 'react-emotion';
import onClickOutside from 'react-onclickoutside';
import { withStoreContext } from '../../context/StoreContext';
import MenuToggle from './MenuToggle';
import OpenCart from './OpenCart';

const CartWrapper = styled('section')`
  position: relative;
`;

class Cart extends React.PureComponent {
  handleClickOutside = (event) => {
    const { toggleCart, isCartOpen } = this.props.storeContext
    isCartOpen && toggleCart()
  }

  render(){
    return(
      <CartWrapper>
        <MenuToggle />
        <OpenCart />
      </CartWrapper>
    )
  }
};

export default withStoreContext(onClickOutside(Cart));
