import React from 'react';
import styled from 'react-emotion';
import { Link } from 'gatsby';
import Logo from './Logo';
import InterfaceContext from '../../context/InterfaceContext';

import { colors, dimensions, spacing } from '../../utils/styles';

const HeaderRoot = styled('header')`
  align-items: center;
  background-color: ${colors.lightest};
  border-bottom: 1px solid ${colors.brandLight};
  box-sizing: border-box;
  display: ${props => (props.isCovered ? 'none' : 'flex')};
  height: ${dimensions.headerHeight};
  justify-content: space-between;
  left: 0;
  padding-left: ${spacing.md}px;
  padding-right: ${spacing['3xl']}px;
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

const Header = ({ newDesign = false }) => (
  <InterfaceContext.Consumer>
    {({ productImagesBrowserStatus }) => (
      <HeaderRoot isCovered={productImagesBrowserStatus === 'open'}>
        <HomeLink to="/" aria-label="Home page">
          <Logo newDesign={newDesign} />
        </HomeLink>
      </HeaderRoot>
    )}
  </InterfaceContext.Consumer>
);

export default Header;
