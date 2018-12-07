import React from 'react';
import styled from 'react-emotion';
import { Link } from 'gatsby';
import { IconContext } from 'react-icons';
import Gatsby from './Gatsby';
import Profile from './Profile';
import Cart from '../../Cart/Cart';
import InterfaceContext from '../../../context/InterfaceContext';

import { colors, spacing } from '../../../utils/styles';

const Header = styled('header')`
  align-items: center;
  background-color: ${colors.lightest};
  border-bottom: 1px solid ${colors.brandLight};
  box-sizing: border-box;
  display: flex;
  height: 60px;
  justify-content: space-between;
  left: 0;
  padding-left: ${spacing.md}px;
  padding-right: ${spacing.md}px;
  position: sticky;
  right: 0;
  top: 0;
  z-index: 1000;
`;

const HomeLink = styled(Link)`
  display: block;
  flex-shrink: 0;
  line-height: 1;
  margin-right: auto;
`;

export default ({ newDesign = false }) => (
  <Header>
    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <InterfaceContext.Consumer>
        {({ productImagesBrowserIsOpen }) => (
          <HomeLink to="/" tabIndex={productImagesBrowserIsOpen ? '-1' : '0'}>
            <Gatsby newDesign={newDesign} />
          </HomeLink>
        )}
      </InterfaceContext.Consumer>
      {!newDesign && <Profile />}
      <Cart />
    </IconContext.Provider>
  </Header>
);
