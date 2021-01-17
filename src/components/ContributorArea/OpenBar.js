import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import UserContext from '../../context/UserContext';
import { breakpoints, colors, fonts, dimensions } from '../../utils/styles';
import { RiArrowUpFill } from 'react-icons/ri';

const OpenBarRoot = styled(`button`)`
  align-items: center;
  border: 0;
  bottom: 0;
  color: ${colors.lightest};
  cursor: pointer;
  font-family: ${fonts.heading};
  font-size: 1.1rem;
  height: ${dimensions.contributorAreaBarHeight};
  left: 0;
  padding: 0;
  position: fixed;
  transition: 0.4s;
  width: 100%;
  z-index: 1;

  &.opening {
    transform: translateY(0);
  }
  &.open {
    transform: translateY(0);
  }
  &.closing {
    transform: translateY(150%);
  }
  &.closed {
    transform: translateY(150%);
  }

  &.hidden {
    display: none;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    height: calc(100vh - ${dimensions.headerHeight});
    top: ${dimensions.headerHeight};
    width: ${dimensions.contributorAreaWidth.closedDesktop};

    &.opening {
      display: block;
      transform: translateY(0);
    }
    &.open {
      transform: translateY(0);
    }
    &.closing {
      transform: translateY(0);
    }
    &.closed {
      display: none;
      transform: translateY(0);
    }

    &.covered {
      display: none;
    }
    &.hidden {
      display: block;
    }
  }
`;

const Content = styled(`div`)`
  align-items: flex-start;
  background: ${colors.brand};
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${dimensions.headerHeight});
  justify-content: space-between;
  width: 100%;
`;

const Section = styled(`div`)`
  width: 100%;
`;

const handHop = keyframes`
  0% {
    transform: translateY(0) scale(1.2);
  }
  50% {
    transform: translateY(-40%) scale(1.2);
  }
  100% {
    transform: translateY(0) scale(1.2);
  }
`;

const ButlerHandBox = styled(`span`)`
  left: 20px;
  position: absolute;
  top: 5px;
  transform: rotate(90deg);

  svg {
    animation: ${handHop} 3s ease infinite;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    align-items: center;
    display: flex;
    height: ${dimensions.headerHeight};
    justify-content: center;
    left: auto;
    position: relative;
    top: auto;
    transform: rotate(0);

    svg {
      animation: ${handHop} 3s ease infinite;
    }

    ${OpenBarRoot}:hover & {
      svg {
        animation: ${handHop} 0.5s ease infinite;
      }
    }
  }
`;

const Title = styled(`span`)`
  display: block;
  margin-top: 0.75rem;
  font-size: ${fontSizes.md};
  font-weight: 500;

  strong {
    color: ${colors.accent};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    height: 280px;
    position: relative;

    span {
      display: block;
      font-size: 1.4rem;
      left: 50%;
      transform: rotate(-90deg) translate(calc(-95%), 55%);
      transform-origin: top left;
      width: 280px;
    }
  }
`;

const Label = styled(`span`)`
  @media (min-width: ${breakpoints.desktop}px) {
    display: block;
    height: 160px;
    position: relative;

    span {
      color: ${colors.lightest};
      display: block;
      left: 50%;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      transform: rotate(-90deg) translate(-100%, 85%);
      transform-origin: top left;
      transition: 0.5s;
      width: 130px;
    }
  }
`;

const ContentFor = ({ contributor }) => {
  let codes = [];
  let numberOfValidCodes = 0;
  let numberOfUsedCodes = 0;

  const { shopify } = contributor;

  if (shopify) {
    codes = shopify.codes;
    numberOfValidCodes = codes.filter(code => code.used === false).length;
    numberOfUsedCodes = codes.length - numberOfValidCodes;
  }

  if (numberOfValidCodes) {
    return <span>Remember your swag code!</span>;
  } else if (numberOfUsedCodes === 2) {
    return <span>Thank you!</span>;
  } else {
    return (
      <span>
        Get Gatsby Swag for <strong>FREE</strong>
      </span>
    );
  }
};

class OpenBar extends Component {
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
      if (this.props.isDesktopViewport) {
        this.setState({ className: 'closed' });
      } else {
        this.setState({
          className: /\/product\//.test(this.props.location.pathname)
            ? 'closed'
            : 'open'
        });
      }
    }

    if (areaStatusChanged) {
      if (this.revertStatus(this.props.areaStatus) === 'open') {
        this.setState({ className: 'opening' });
        setTimeout(() => this.setState({ className: 'open' }), 500);
      }

      if (this.revertStatus(this.props.areaStatus) === 'closed') {
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

    // hide bar on product pages on mobile
    if (!this.props.isDesktopViewport) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        if (/\/product\//.test(this.props.location.pathname)) {
          this.setState(state => ({
            className: state.className + ' hidden'
          }));
        } else {
          this.setState(state => ({
            className: 'open'
          }));
        }
      }
    }
  }

  revertStatus = status => {
    if (status === 'open') {
      return 'closed';
    } else if (status === 'closed') {
      return 'open';
    } else {
      return status;
    }
  };

  render() {
    const { onClick, areaStatus } = this.props;
    const { className } = this.state;

    return (
      <UserContext.Consumer>
        {({ contributor }) => {
          return (
            <OpenBarRoot onClick={onClick} className={className}>
              <Content>
                <Section>
                  <Title>
                    <ContentFor contributor={contributor} />
                  </Title>
                  <ButlerHandBox>
                    <RiArrowUpFill />
                  </ButlerHandBox>
                </Section>
                <Section>
                  <Label>
                    <span>Open Sidebar</span>
                  </Label>
                </Section>
              </Content>
            </OpenBarRoot>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

OpenBar.propTypes = {
  areaStatus: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isDesktopViewport: PropTypes.bool,
  productImagesBrowserStatus: PropTypes.string
};

export default OpenBar;
