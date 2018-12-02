import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';

import { MdArrowBack } from 'react-icons/md';

import Butler from '../../assets/Butler';
import ButlerHand from '../../assets/ButlerHand';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing,
  dimensions,
  durations
} from '../../utils/styles';

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

  @media (min-width: ${breakpoints.desktop}px) {
    height: calc(100vh - 60px);
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
  }
`;

const Content = styled(`div`)`
  align-items: flex-start;
  background: ${colors.brand};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  justify-content: space-between;
  width: 100%;
`;

const Section = styled(`div`)`
  width: 100%;
`;

const ButlerBox = styled(`span`)`
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(-50%, -20%) scale(-1.2, 1.2);

  @media (min-width: ${breakpoints.desktop}px) {
    align-items: center;
    display: flex;
    height: 80px;
    justify-content: center;
    position: relative;
    transform: none;
  }
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
    height: 80px;
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
  font-size: 1.2rem;
  margin-top: 0.75rem;

  strong {
    color: ${colors.lemon};
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

class OpenBar extends Component {
  state = {
    classNames: 'closed'
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.isDesktopViewport !== prevProps.isDesktopViewport &&
      prevProps.isDesktopViewport === null
    ) {
      this.setState({
        classNames: this.props.isDesktopViewport ? 'closed' : 'open'
      });
    }

    if (prevProps.areaStatus !== this.props.areaStatus) {
      if (this.revertStatus(this.props.areaStatus) === 'open') {
        this.setState({ classNames: 'opening' });
        setTimeout(() => this.setState({ classNames: 'open' }), 500);
      }

      if (this.revertStatus(this.props.areaStatus) === 'closed') {
        this.setState({ classNames: 'closing' });
        setTimeout(() => this.setState({ classNames: 'closed' }), 500);
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
    const { classNames } = this.state;

    return (
      <OpenBarRoot
        onClick={onClick}
        className2={this.revertStatus(areaStatus)}
        className={classNames}
      >
        <Content>
          <Section>
            <ButlerBox>
              <Butler />
            </ButlerBox>
            <Title>
              <span>
                Get Gatsby Swag for <strong>FREE</strong>
              </span>
            </Title>
            <ButlerHandBox>
              <ButlerHand />
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
  }
}

OpenBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  areaStatus: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool
};

export default OpenBar;
