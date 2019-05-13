import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { MdArrowForward, MdClose } from 'react-icons/md';

import {
  breakpoints,
  colors,
  fonts,
  spacing,
  dimensions
} from '../../utils/styles';

const {
  contributorAreaWidth: { openDesktop: desktopMaxWidth, openHd: hdMaxWidth },
  contributorAreaBarHeight: height
} = dimensions;

const CloseBarRoot = styled(`button`)`
  align-items: center;
  background: ${colors.brand};
  border: 0;
  bottom: 0;
  color: ${colors.lightest};
  cursor: pointer;
  display: flex;
  font-family: ${fonts.heading};
  font-size: 1.1rem;
  height: ${height};
  justify-content: flex-end;
  padding-right: ${spacing.lg}px;
  position: fixed;
  text-align: right;
  text-transform: uppercase;
  transform: translateX(-100%);
  transition: 0.75s ease;
  width: 100%;
  z-index: 101;

  &.opening {
    transform: translateX(0%);
  }
  &.open {
    transform: translateX(0%);
  }
  &.closing {
    transform: translateX(-100%);
  }
  &.closed {
    transform: translateX(-100%);
  }

  svg {
    height: calc(${height} / 2);
    margin-left: ${spacing.xs}px;
    width: calc(${height} / 2);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    transform: translateX(0);
    width: ${desktopMaxWidth};

    &.opening {
      transform: translateX(0%);
    }
    &.open {
      transform: translateX(0%);
    }
    &.closing {
      transform: translateX(-${desktopMaxWidth});
    }
    &.closed {
      display: none;
      transform: translateX(-${desktopMaxWidth});

      &.unhide {
        display: block;
      }
    }

    &.covered {
      display: none;
    }
  }

  @media (min-width: ${breakpoints.hd}px) {
    width: ${hdMaxWidth};

    &.closing {
      transform: translateX(-${hdMaxWidth});
    }
    &.closed {
      transform: translateX(-${hdMaxWidth});
    }
  }
`;

class CloseBar extends Component {
  state = {
    className: 'closed'
  };

  componentDidUpdate(prevProps) {
    // most of code below is similar to ContributorArea, take a look for comments

    const isDesktopViewportChanged =
      this.props.isDesktopViewport !== prevProps.isDesktopViewport;
    const areaStatusChanged = prevProps.areaStatus !== this.props.areaStatus;
    const imageBrowserStatusChanged =
      this.props.productImagesBrowserStatus !==
      prevProps.productImagesBrowserStatus;

    if (isDesktopViewportChanged && prevProps.isDesktopViewport === null) {
      this.setState({
        className: this.props.isDesktopViewport ? 'open' : 'closed'
      });
    }

    if (areaStatusChanged) {
      if (this.props.areaStatus === 'open') {
        this.setState({ className: `${this.state.className} unhide` });
        setTimeout(() => this.setState({ className: 'opening' }), 0);
        setTimeout(() => this.setState({ className: 'open' }), 500);
      }

      if (this.props.areaStatus === 'closed') {
        this.setState({ className: 'closing' });
        setTimeout(() => this.setState({ className: 'closed' }), 500);
      }
    }

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
            className: state.className.replace('covered', '')
          }));
        }
      }
    }
  }

  render() {
    const { onClick, isDesktopViewport } = this.props;
    const { className } = this.state;

    return (
      <CloseBarRoot className={className} onClick={onClick}>
        {isDesktopViewport ? `Close sidebar` : `Continue shopping`}
        {isDesktopViewport ? <MdClose /> : <MdArrowForward />}
      </CloseBarRoot>
    );
  }
}

CloseBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  areaStatus: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool,
  productImagesBrowserStatus: PropTypes.string
};

export default CloseBar;
