import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';

import { Button } from '../shared/Buttons';

import CloseBar from './CloseBar';
import OpenBar from './OpenBar';
import { Heading, SectionHeading, SubHeading, Text } from './AreaTypography';
import ContentContainer from './ContentContainer';

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
    closed: desktopMinWidth
  }
} = dimensions;

const ContributorAreaRoot = styled(`aside`)`
  background: ${colors.brandDark};
  color: ${colors.lightest};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  left: 0;
  min-height: calc(100vh - ${dimensions.headerHeight});
  position: fixed;
  top: ${dimensions.headerHeight};
  transform: translateX(-100%);
  transition: 0.75s ease;
  width: 100%;
  z-index: 100;

  &.opening {
    transform: translateX(0%);
  }
  &.open {
    position: static;
    transform: translateX(0%);
  }
  &.closing {
    position: fixed;
    transform: translateX(-100%);
  }
  &.closed {
    position: fixed;
    transform: translateX(-100%);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    height: calc(100vh - ${dimensions.headerHeight});
    width: ${desktopMaxWidth};

    &.opening {
      transform: translateX(0%);
    }
    &.open {
      position: fixed;
      transform: translateX(0%);
    }
    &.closing {
      transform: translateX(-${desktopMaxWidth});
    }
    &.closed {
      display: none;
      transform: translateX(-${desktopMaxWidth});

      &.unhide {
        display: flex;
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

class ContributorArea extends Component {
  state = {
    classNames: 'closed',
    issuesVisible: false
  };

  componentDidUpdate(prevProps) {
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
        setTimeout(() => this.setState({ classNames: 'open' }), 750);
      }

      if (this.props.status === 'closed') {
        this.setState({
          classNames: 'closing'
        });
        setTimeout(() => this.setState({ classNames: 'closed' }), 750);
      }
    }
  }

  showIssues = e => {
    this.setState({ issuesVisible: true });
  };

  render() {
    const { location, status, toggle, isDesktopViewport } = this.props;
    const { classNames, issuesVisible } = this.state;

    return (
      <>
        <ContributorAreaRoot className={classNames}>
          <ContentContainer />
        </ContributorAreaRoot>

        <CloseBar
          status={status}
          onClick={toggle}
          isDesktopViewport={isDesktopViewport}
        />

        <OpenBar
          areaStatus={status}
          isDesktopViewport={isDesktopViewport}
          onClick={toggle}
        />
      </>
    );
  }
}

ContributorArea.propTypes = {
  status: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isDesktopViewport: PropTypes.bool
};

export default ContributorArea;
