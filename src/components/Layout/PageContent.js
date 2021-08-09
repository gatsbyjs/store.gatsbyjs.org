import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Footer, { minHeight } from './Footer';
import {
  breakpoints,
  dimensions,
  animations,
  transitions
} from '../../utils/styles';

const {
  contributorAreaWidth: {
    openDesktop: desktopMaxWidth,
    openHd: hdMaxWidth,
    closedDesktop: desktopMinWidth
  }
} = dimensions;

const PageContentRoot = styled(`main`)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: calc(100vh - ${minHeight});
  opacity: 1;
  padding-left: 0;
  transition: ${transitions.speed.default};
  width: 100%;
  will-change: transform;

  &.covered {
    position: fixed;
    // opacity: 0;
  }

  &.entry {
    animation: ${animations.deadSimpleEntry};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    padding-left: ${desktopMaxWidth};
    transform: translateX(0);

    &.wide {
      padding-left: ${desktopMinWidth};
    }

    &.moved {
      position: fixed;
      transform: translateX(-${dimensions.cartWidthDesktop});
      opacity: 1;
    }

    &.covered {
      display: none;
    }
  }

  @media (min-width: ${breakpoints.hd}px) {
    padding-left: ${props =>
      props.contributorAreaStatus === 'closed' ? desktopMinWidth : hdMaxWidth};
  }
`;

class PageContent extends Component {
  state = {
    className: ''
  };

  componentDidUpdate(prevProps) {
    const imageBrowserStatusChanged =
      this.props.productImagesBrowserStatus !==
      prevProps.productImagesBrowserStatus;
    const contributorAreaStatusChanged =
      prevProps.contributorAreaStatus !== this.props.contributorAreaStatus;
    const cartStatusChanged = prevProps.cartStatus !== this.props.cartStatus;

    if (this.props.isDesktopViewport) {
      if (imageBrowserStatusChanged) {
        if (this.props.productImagesBrowserStatus === 'open') {
          setTimeout(() => {
            this.setState(state => ({
              className: state.className + ' covered'
            }));
          }, 500);
        } else {
          this.setState(state => ({
            className: state.className.replace(' covered', '')
          }));
        }
      }

      if (contributorAreaStatusChanged) {
        if (this.props.contributorAreaStatus === 'closed') {
          this.setState(state => ({
            className:
              this.props.contributorAreaStatus !== 'open'
                ? state.className + ' wide'
                : state.className
          }));
        } else {
          this.setState(state => ({
            className:
              state.className !== 'open'
                ? state.className.replace('wide', '')
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
            className: state.className.replace('moved', '')
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
    const { children, cartStatus, toggle } = this.props;
    const { className } = this.state;

    return (
      <PageContentRoot className={className}>
        {children}
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
  productImagesBrowserStatus: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool
};

export default PageContent;
