import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import CloseBar from './CloseBar';
import OpenBar from './OpenBar';
import ContentContainer from './ContentContainer';
import { breakpoints, colors, dimensions } from '../../utils/styles';

const {
  contributorAreaWidth: { openDesktop: desktopMaxWidth, openHd: hdMaxWidth }
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
  will-change: all;
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

class ContributorArea extends Component {
  state = {
    className: 'closed',
    issuesVisible: false
  };

  componentDidUpdate(prevProps) {
    const isDesktopViewportChanged =
      this.props.isDesktopViewport !== prevProps.isDesktopViewport;
    const componentStatusChanged = prevProps.status !== this.props.status;
    const imageBrowserStatusChanged =
      this.props.productImagesBrowserStatus !==
      prevProps.productImagesBrowserStatus;

    // set inital status of the component after isDesktopViewport is set for the first time (value changes from null to true/false)
    if (isDesktopViewportChanged && prevProps.isDesktopViewport === null) {
      this.setState({
        className: this.props.isDesktopViewport ? 'open' : 'closed'
      });
    }

    // apply transitions after changes of the component's status, trigerred by user (toggleContributorArea)
    if (componentStatusChanged) {
      if (this.props.status === 'open') {
        // before we start opening the component we first have to unhide it
        this.setState({
          className: `${this.state.className} unhide`
        });
        setTimeout(
          () =>
            this.setState({
              className: 'opening'
            }),
          0
        );
        setTimeout(
          () =>
            this.setState({
              className: 'open'
            }),
          750
        );
      }

      if (this.props.status === 'closed') {
        this.setState({
          className: 'closing'
        });
        setTimeout(
          () =>
            this.setState({
              className: 'closed'
            }),
          750
        );
      }
    }

    // for desktop viewport, hide all content when ProductImagesBrowser is open
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

  showIssues = e => {
    this.setState({ issuesVisible: true });
  };

  render() {
    const {
      location,
      status,
      toggle,
      isDesktopViewport,
      productImagesBrowserStatus
    } = this.props;
    const { className } = this.state;

    return (
      <>
        <ContributorAreaRoot className={className}>
          <ContentContainer />
        </ContributorAreaRoot>

        <CloseBar
          areaStatus={status}
          onClick={toggle}
          isDesktopViewport={isDesktopViewport}
          productImagesBrowserStatus={productImagesBrowserStatus}
        />

        <OpenBar
          areaStatus={status}
          isDesktopViewport={isDesktopViewport}
          onClick={toggle}
          location={location}
          productImagesBrowserStatus={productImagesBrowserStatus}
        />
      </>
    );
  }
}

ContributorArea.propTypes = {
  status: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isDesktopViewport: PropTypes.bool,
  productImagesBrowserStatus: PropTypes.string
};

export default ContributorArea;
