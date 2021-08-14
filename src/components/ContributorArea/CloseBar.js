import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

import { MdArrowForward, MdClose } from "react-icons/md"

import {
  borders,
  breakpoints,
  colors,
  fonts,
  spacing,
  dimensions,
  transitions,
  fontSizes,
  zIndices,
} from "../../utils/styles"

const {
  contributorAreaWidth: { openDesktop: desktopMaxWidth, openHd: hdMaxWidth },
  contributorAreaBarHeight: height,
} = dimensions

const CloseBarRoot = styled(`button`)`
  align-items: center;
  background: ${colors.brand};
  border: 0;
  border-top: ${borders.grid};
  bottom: 0;
  color: ${colors.text};
  cursor: pointer;
  display: flex;
  font-family: ${fonts.heading};
  font-size: ${fontSizes.sm};
  font-weight: inherit;
  height: ${height};
  justify-content: flex-end;
  padding-right: ${spacing.lg};
  position: fixed;
  text-align: right;
  transform: translateX(-100%);
  transition: ${transitions.sidebar};
  width: 100%;
  z-index: ${zIndices.closeBar};

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
    width: 24px;
    height: 24px;
    margin-left: ${spacing.xs};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    width: ${desktopMaxWidth};
    background: ${colors.lightest};
    border-right: ${borders.grid};
    transform: translateX(0);

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
`

class CloseBar extends Component {
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
      this.setState({
        className: this.props.isDesktopViewport ? `open` : `closed`,
      })
    }

    if (areaStatusChanged) {
      if (this.props.areaStatus === `open`) {
        this.setState({ className: `${this.state.className} unhide` })
        setTimeout(() => this.setState({ className: `opening` }), 0)
        setTimeout(() => this.setState({ className: `open` }), 500)
      }

      if (this.props.areaStatus === `closed`) {
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
  }

  render() {
    const { onClick, isDesktopViewport } = this.props
    const { className } = this.state

    return (
      <CloseBarRoot className={className} onClick={onClick}>
        {isDesktopViewport ? `Close sidebar` : `Continue shopping`}
        {isDesktopViewport ? <MdClose /> : <MdArrowForward />}
      </CloseBarRoot>
    )
  }
}

CloseBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  areaStatus: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool,
  productImagesBrowserStatus: PropTypes.string,
}

export default CloseBar
