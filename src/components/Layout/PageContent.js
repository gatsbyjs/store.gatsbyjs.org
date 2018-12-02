import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import InterfaceContext from '../../context/InterfaceContext';
import ContributorArea from '../ContributorArea';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing,
  dimensions
} from '../../utils/styles';

const {
  contributorAreaWidth: {
    openDesktop: desktopMaxWidth,
    openHd: hdMaxWidth,
    closedDesktop: desktopMinWidth
  }
} = dimensions;

const PageContentRoot = styled(`main`)`
  padding-left: 0;
 
  transition: 0.75s;
  width: 100%;

  &.covered {
    position: fixed;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    padding-bottom: ${spacing.md}px;
    transform: ${props =>
      props.cartStatus === 'open' ? 'translateX(-400px)' : 'translateX(0)'};
    width: 100%;

    &.covered {
      position: static;
    }

  
    /* stylelint-disable */
     /* position: ${props =>
       props.cartStatus === 'open' ? 'fixed' : 'static'}; */
    
      /* stylelint-enable */
  
    filter: ${props => (props.cartStatus === 'open' ? 'blur(1px)' : '')};

    padding-left: ${props =>
      props.contributorAreaStatus === 'closed'
        ? desktopMinWidth
        : desktopMaxWidth};

    .covered {
      position: static;
    }
  }

  @media (min-width: ${breakpoints.hd}px) {
    padding-left: ${props =>
      props.contributorAreaStatus === 'closed' ? desktopMinWidth : hdMaxWidth};
  }
`;

const Footer = styled(`footer`)`
  align-items: center;
  color: ${colors.textMild};
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  padding: ${spacing.md}px;
  padding-bottom: calc(${spacing.xl}px + 50px);

  a {
    color: ${colors.brand};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    align-items: flex-end;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 ${spacing.xl}px;
    min-height: 30px;
  }
`;

const Row = styled(`span`)`
  flex-shrink: 0;
  padding-bottom: ${spacing['2xs']}px;
  text-align: center;
  display: inline-block;
  line-height: 1.3;

  @media (min-width: ${breakpoints.desktop}px) {
    padding-bottom: 0;
  }
`;

const Spacer = styled(`span`)`
  display: none;

  @media (min-width: ${breakpoints.desktop}px) {
    display: inline-block;
    padding: 0 ${spacing.sm}px;
  }
`;

const Overlay = styled(`div`)`
  display: none;

  @media (min-width: ${breakpoints.desktop}px) {
    background: rgba(0, 0, 0, 0.1);
    bottom: 0;
    display: block;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }
`;

const PageContent = ({ children, cartStatus, contributorAreaStatus }) => {
  return (
    <PageContentRoot
      cartStatus={cartStatus}
      contributorAreaStatus={contributorAreaStatus}
      className={
        cartStatus === 'open' || contributorAreaStatus === 'open'
          ? 'covered'
          : ''
      }
    >
      {children}
      {cartStatus === 'open' && <Overlay />}
      <Footer>
        <Row>
          <b>Got questions?&nbsp;</b>
        </Row>
        <Row>
          Talk to us on Twitter{' '}
          <a href="https://twitter.com/gatsby">@gatsbyjs</a>
        </Row>
        <Row>
          &nbsp;or send an email to{' '}
          <a href="mailto:team@gatsbyjs.com">team@gatsbyjs.com</a>
        </Row>
        <Spacer>•</Spacer>
        <Row>
          Built with 💜 by the{' '}
          <a href="https://www.gatsbyjs.com/">Gatsby Inkteam</a>
        </Row>
        <Spacer>•</Spacer>
        <Row>
          See the source code on{' '}
          <a href="https://github.com/gatsbyjs/store.gatsbyjs.org">GitHub</a>
        </Row>
      </Footer>
    </PageContentRoot>
  );
};

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  cartStatus: PropTypes.string.isRequired,
  contributorAreaStatus: PropTypes.string.isRequired
};

export default PageContent;
