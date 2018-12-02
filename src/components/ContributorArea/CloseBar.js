import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';

import { MdArrowForward, MdClose } from 'react-icons/md';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing,
  dimensions,
  durations
} from '../../utils/styles';

const {
  contributorAreaWidth: {
    openDesktop: desktopMaxWidth,
    openHd: hdMaxWidth,
    closed: desktopMinWidth
  },
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
    classNames: 'closed'
  };

  componentDidUpdate(prevProps) {
    // to-do: refactor it's the same code as in ContributorArea
    if (
      this.props.isDesktopViewport !== prevProps.isDesktopViewport &&
      prevProps.isDesktopViewport === null
    ) {
      this.setState({
        classNames: this.props.isDesktopViewport ? 'open' : 'closed'
      });
    }

    if (prevProps.status !== this.props.status) {
      if (this.props.status === 'open') {
        // before we start opening the component we first have to unhide it
        this.setState({
          classNames: `${this.state.classNames} unhide`
        });
        setTimeout(() => this.setState({ classNames: 'opening' }), 0);
        setTimeout(() => this.setState({ classNames: 'open' }), 500);
      }

      if (this.props.status === 'closed') {
        this.setState({
          classNames: 'closing'
        });
        setTimeout(() => this.setState({ classNames: 'closed' }), 500);
      }
    }
  }

  render() {
    const { status, onClick, isDesktopViewport } = this.props;
    const { classNames } = this.state;

    return (
      <CloseBarRoot className={classNames} onClick={onClick}>
        {isDesktopViewport ? `Close sidebar` : `Continue shopping`}
        {isDesktopViewport ? <MdClose /> : <MdArrowForward />}
      </CloseBarRoot>
    );
  }
}

CloseBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool
};

export default CloseBar;
