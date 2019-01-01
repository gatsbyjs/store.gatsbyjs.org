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
  opacity: 1;
  padding-left: 0;
  transform: translateX(0);
  transition: 0.75s;
  width: 100%;
  will-change: all;

  &.covered {
    opacity: 0;
    position: fixed;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    padding-bottom: ${spacing.md}px;
    padding-left: ${desktopMaxWidth};
    transform: translateX(0);

    &.wide {
      padding-left: ${desktopMinWidth};
    }

    &.moved {
      transform: translateX(-400px);
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
    min-height: 30px;
    padding: 0 ${spacing.xl}px;
  }
`;

const Row = styled(`span`)`
  display: inline-block;
  flex-shrink: 0;
  line-height: 1.3;
  padding-bottom: ${spacing['2xs']}px;
  text-align: center;

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

class PageContent extends Component {
  state = {
    className: ''
  };

  componentDidUpdate(prevProps) {
    const contributorAreaStatusChanged =
      prevProps.contributorAreaStatus !== this.props.contributorAreaStatus;
    const cartStatusChanged = prevProps.cartStatus !== this.props.cartStatus;

    if (this.props.isDesktopViewport) {
      if (contributorAreaStatusChanged) {
        this.setState({
          className: this.props.contributorAreaStatus === 'closed' ? 'wide' : ''
        });
      }

      if (cartStatusChanged) {
        this.setState({
          className: this.props.cartStatus === 'open' ? 'moved' : ''
        });
      }
    } else {
      if (contributorAreaStatusChanged || cartStatusChanged) {
        this.setState({
          className:
            this.props.contributorAreaStatus === 'open' ||
            this.props.cartStatus === 'open'
              ? 'covered'
              : ''
        });
      }
    }
  }

  render() {
    const { children, cartStatus, contributorAreaStatus } = this.props;
    const { className } = this.state;

    return (
      <PageContentRoot className={className}>
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
  }
}

PageContent.propTypes = {
  cartStatus: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  contributorAreaStatus: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool
};

export default PageContent;
