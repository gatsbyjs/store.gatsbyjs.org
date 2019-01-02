import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import InterfaceContext from '../../context/InterfaceContext';
import ContributorArea from '../ContributorArea';
import Footer from './Foooter';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing,
  dimensions,
  animations
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
  transition: 0.75s;
  width: 100%;
  will-change: all;

  &.covered {
    opacity: 0;
    position: fixed;
  }

  &.entry {
    animation: ${animations.deadSimpleEntry};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    padding-bottom: ${spacing.md}px;
    padding-left: ${desktopMaxWidth};
    transform: translateX(0);

    &.wide {
      padding-left: ${desktopMinWidth};
    }

    &.moved {
      position: fixed;
      transform: translateX(-400px);
    }
  }

  @media (min-width: ${breakpoints.hd}px) {
    padding-left: ${props =>
      props.contributorAreaStatus === 'closed' ? desktopMinWidth : hdMaxWidth};
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
        if (this.props.contributorAreaStatus === 'closed') {
          this.setState(state => ({
            className:
              this.props.cartStatus !== 'open'
                ? state.className + ' wide'
                : state.className
          }));
        } else {
          this.setState(state => ({
            className:
              state.className !== 'open'
                ? state.className.replace(' wide', '')
                : state.className
          }));
        }
      }

      if (cartStatusChanged) {
        if (this.props.cartStatus === 'open') {
          this.setState(state => ({
            className: state.className + ' moved'
          }));
        } else {
          this.setState(state => ({
            className: state.className.replace(' moved', '')
          }));
        }
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

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState(state => ({ className: state.className + ' entry' }));

      setTimeout(() => {
        this.setState(state => ({
          className: state.className.replace('entry', '')
        }));
      }, 500);
    }
  }

  render() {
    const { children, cartStatus, contributorAreaStatus } = this.props;
    const { className } = this.state;

    return (
      <PageContentRoot className={className}>
        {children}
        {cartStatus === 'open' && <Overlay />}
        <Footer />
      </PageContentRoot>
    );
  }
}

PageContent.propTypes = {
  cartStatus: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  contributorAreaStatus: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  isDesktopViewport: PropTypes.bool
};

export default PageContent;
