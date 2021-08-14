import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import { RiArrowUpLine } from "react-icons/ri"

import UserContext from "../../context/UserContext"
import {
  borders,
  breakpoints,
  colors,
  dimensions,
  fonts,
  fontSizes,
  fontWeights,
  spacing,
  transitions,
} from "../../utils/styles"

const OpenBarRoot = styled(`button`)`
  align-items: center;
  background: ${colors.lightest};
  border: 0;
  bottom: 0;
  color: ${colors.text};
  cursor: pointer;
  font-family: ${fonts.heading};
  font-size: ${fontSizes.md};
  height: ${dimensions.contributorAreaBarHeight};
  left: 0;
  padding: 0;
  position: fixed;
  transition: ${transitions.speed.slow};
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
    top: ${dimensions.headerHeight};
    width: ${dimensions.contributorAreaWidth.closedDesktop};
    height: calc(100vh - ${dimensions.headerHeight});

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
`

const Content = styled(`div`)`
  align-items: center;
  border-top: ${borders.grid};
  display: flex;
  flex-flow: column nowrap;
  height: calc(100vh - ${dimensions.headerHeight});
  justify-content: space-between;
  width: 100%;

  @media (min-width: ${breakpoints.desktop}px) {
    padding: ${spacing.lg};
    border-top: 0;
    border-right: ${borders.grid};
  }
`

const Line = styled(`div`)`
  display: none;

  @media (min-width: ${breakpoints.desktop}px) {
    display: block;
    flex-grow: 1;
    margin: ${spacing.lg} 0;
    border-left: 0.5px solid ${colors.border};
  }
`

const Section = styled(`div`)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${dimensions.headerHeight};

  @media (min-width: ${breakpoints.desktop}px) {
    width: auto;
    height: auto;
    white-space: nowrap;
    transform: scale(-1, -1);
    writing-mode: vertical-lr;
  }
`

const bounce = keyframes`
  0% {
    transform: translateY(0) scale(1.2);
  }
  50% {
    transform: translateY(-40%) scale(1.2);
  }
  100% {
    transform: translateY(0) scale(1.2);
  }
`

const PointerBox = styled(`span`)`
  transform: rotate(90deg);
  order: -1;
  width: ${dimensions.headerHeight};

  svg {
    animation: ${bounce} 3.5s ease infinite;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    position: relative;
    top: auto;
    left: auto;
    display: none;
    display: flex;
    display: none;
    align-items: center;
    justify-content: center;
    width: auto;
    transform: rotate(180deg);

    svg {
      animation: ${bounce} 3.5s ease infinite;
    }

    ${OpenBarRoot}:hover & {
      svg {
        animation-duration: 1s;
      }
    }
  }
`

const Title = styled(`span`)`
  display: block;
  font-size: ${fontSizes.sm};

  strong {
    text-style: normal;
    text-decoration: underline;
    font-weight: ${fontWeights.semibold};
    text-decoration-style: wavy;
  }
`

const Label = styled(`span`)`
  @media (min-width: ${breakpoints.desktop}px) {
    display: block;
    font-size: ${fontSizes.sm};

    span {
      display: block;
      text-align: left;
      transition: ${transitions.speed.slow};
    }
  }
`

const ContentFor = ({ contributor }) => {
  let codes = []
  let numberOfValidCodes = 0
  let numberOfUsedCodes = 0

  const { shopify } = contributor

  if (shopify) {
    codes = shopify.codes
    numberOfValidCodes = codes.filter((code) => code.used === false).length
    numberOfUsedCodes = codes.length - numberOfValidCodes
  }

  if (numberOfValidCodes) {
    return (
      <span>
        Remember your <em>swag code!</em>
      </span>
    )
  } else if (numberOfUsedCodes === 2) {
    return <span>Thank you!</span>
  } else {
    return (
      <span>
        Get Gatsby swag <strong>for free</strong>
      </span>
    )
  }
}

class OpenBar extends Component {
  state = {
    className: `closed`,
  }

  componentDidUpdate(prevProps) {
    // most of code below is similar to ContributorArea, take a look for comments

    const isDesktopViewportChanged =
      this.props.isDesktopViewport !== prevProps.isDesktopViewport
    const areaStatusChanged = prevProps.areaStatus !== this.props.areaStatus
    const imageBrowserStatusChanged =
      this.props.productImagesBrowserStatus !==
      prevProps.productImagesBrowserStatus

    if (isDesktopViewportChanged && prevProps.isDesktopViewport === null) {
      if (this.props.isDesktopViewport) {
        this.setState({ className: `closed` })
      } else {
        this.setState({
          className: /\/product\//.test(this.props.location.pathname)
            ? `closed`
            : `open`,
        })
      }
    }

    if (areaStatusChanged) {
      if (this.revertStatus(this.props.areaStatus) === `open`) {
        this.setState({ className: `opening` })
        setTimeout(() => this.setState({ className: `open` }), 500)
      }

      if (this.revertStatus(this.props.areaStatus) === `closed`) {
        this.setState({ className: `closing` })
        setTimeout(() => this.setState({ className: `closed` }), 500)
      }
    }

    if (this.props.isDesktopViewport) {
      if (imageBrowserStatusChanged) {
        if (this.props.productImagesBrowserStatus === `open`) {
          setTimeout(() => {
            this.setState((state) => {
              return {
                className: state.className + ` covered`,
              }
            })
          }, 500)
        } else {
          this.setState((state) => {
            return {
              className: state.className.replace(`covered`, ``),
            }
          })
        }
      }
    }

    // hide bar on product pages on mobile
    if (!this.props.isDesktopViewport) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        if (/\/product\//.test(this.props.location.pathname)) {
          this.setState((state) => {
            return {
              className: state.className + ` hidden`,
            }
          })
        } else {
          this.setState((state) => {
            return {
              className: `open`,
            }
          })
        }
      }
    }
  }

  revertStatus = (status) => {
    if (status === `open`) {
      return `closed`
    } else if (status === `closed`) {
      return `open`
    } else {
      return status
    }
  }

  render() {
    const { onClick } = this.props
    const { className } = this.state

    return (
      <UserContext.Consumer>
        {({ contributor }) => (
          <OpenBarRoot onClick={onClick} className={className}>
            <Content>
              <Section>
                <Title>
                  <ContentFor contributor={contributor} />
                </Title>
                <PointerBox>
                  <RiArrowUpLine />
                </PointerBox>
              </Section>
              <Line />
              <Section>
                <Label>
                  <span>Open sidebar</span>
                </Label>
              </Section>
            </Content>
          </OpenBarRoot>
        )}
      </UserContext.Consumer>
    )
  }
}

OpenBar.propTypes = {
  areaStatus: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isDesktopViewport: PropTypes.bool,
  productImagesBrowserStatus: PropTypes.string,
}

export default OpenBar
