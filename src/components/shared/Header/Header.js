import React from 'react';
import styled from 'react-emotion';
import { Link } from 'gatsby';
import Gatsby from './Gatsby';
import Profile from './Profile';
import Cart from '../../Cart/Cart';
import { colors } from '../../../utils/styles';

const Header = styled('header')`
  align-items: center;
  background-color: ${colors.brandLight};
  border-bottom: 2px solid ${colors.lightest};
  box-shadow: 0 1px 2px ${colors.textLight}40;
  box-sizing: border-box;
  display: flex;
  height: 90px;
  justify-content: space-between;
  left: 0;
  padding: 10px calc(50vw - 35ch);
  position: sticky;
  right: 0;
  top: 0;
  z-index: 1000;
`;

const HomeLink = styled(Link)`
  display: block;
  height: 50px;
  width: 50px;
`;

const Banner = styled('div')`
  font-family: 'Futura PT', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0 auto 0 10px;
`;

const BannerLink = styled(Link)`
  color: ${colors.darkest};
  display: block;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
  text-decoration: none;
`;

export default () => (
  <Header>
    <HomeLink to="/">
      <Gatsby />
    </HomeLink>
    <Banner>
      <BannerLink to="/">Gatsby Swag</BannerLink>
    </Banner>
    <Profile />
    <Cart />
  </Header>
);
