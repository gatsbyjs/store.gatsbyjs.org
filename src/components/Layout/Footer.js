import React from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import { RiArrowRightUpLine } from "react-icons/ri"

import {
  borders,
  breakpoints,
  colors,
  dimensions,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
} from "../../utils/styles"

export const minHeight = `64px`

const FooterRoot = styled(`footer`)`
  align-items: center;
  border-top: ${borders.grid};
  display: flex;
  flex-direction: column;
  font-size: ${fontSizes.xs};
  margin-top: -1px;
  min-height: ${minHeight};
  padding-bottom: ${dimensions.contributorAreaBarHeight};
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
  z-index: -1;

  a {
    color: ${colors.text};
    text-decoration: none;

    :hover {
      color: ${colors.brand};
      border-color: ${colors.brand};
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-content: stretch;
    align-items: stretch;
    justify-content: stretch;
    padding-bottom: 0;
  }
`

const Row = styled(`span`)`
  display: flex;
  line-height: ${lineHeights.dense};
  min-height: calc(${minHeight} - 1px);
  border-top: ${borders.grid};
  width: 100%;
  justify-items: stretch;

  @media (min-width: ${breakpoints.desktop}px) {
    flex-shrink: 0;
    width: auto;
    border: 0;
  }

  a {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    margin-left: -1px;
    padding: 0 ${spacing.lg};
    color: ${colors.text};
    border-bottom: 0;
    border-left: ${borders.grid};
  }

  a span {
    display: inline-block;
    color: ${colors.text};
    border-bottom: 1px solid transparent;
  }

  @media (hover: hover) {
    a:hover span {
      border-color: currentColor;
    }
  }

  a:nth-of-type(1) {
    // background: #fffafd;
    background: #ffe6f6;
  }

  a:nth-of-type(2) {
    // background: #fffafa;
    background: #fde7e7;
  }

  a:nth-of-type(3) {
    // background: #fffcf7;
    background: #fff4db;
  }
`

const iconEntry = keyframes`
  0% { transform: translate3d(0%, 0, 0); }
  100% { transform: translate3d(-100%, 0, 0); }
`

const Marquee = styled(`span`)`
  align-items: center;
  // background: #F6EDFA;
  // background: #D9BAE8;
  background: ${colors.brandLight};
  border-right: ${borders.grid};
  display: inline-flex;
  font-family: ${fonts.monospace};
  justify-content: center;
  overflow: hidden;
  position: relative;
  min-height: calc(${minHeight} - 1px);
  min-width: 0;
  white-space: nowrap;
  flex: 1;

  a {
    font-weight: ${fontWeights.medium};
    border-bottom: 1px solid currentColor;
  }

  a:hover {
    border-bottom-color: transparent;
  }

  &:hover > span {
    animation-play-state: paused;
  }
`

const MarqueeSpan = styled(`span`)`
  animation: ${iconEntry} 30s linear infinite;
  display: inline-block;
  padding: 0 12px 0 0;

  &::after {
    content: " · ";
  }
`

const MarqueeContent = ({ props }) => (
  <MarqueeSpan {...props}>
    Built with love by the <a href="https://www.gatsbyjs.com/">Gatsby Team</a>
    {` `}
    and the Gatsby community &middot; Source code on{` `}
    <a href="https://github.com/gatsbyjs/store.gatsbyjs.org">GitHub</a>
  </MarqueeSpan>
)

const Footer = () => (
  <FooterRoot>
    <Marquee>
      <MarqueeContent />
      <MarqueeContent aria-hidden="true" />
      <MarqueeContent aria-hidden="true" />
      <MarqueeContent aria-hidden="true" />
    </Marquee>
    <Row>
      <a href="https://github.com/gatsbyjs/store.gatsbyjs.org#frequently-asked-questions">
        <span>FAQs</span> <RiArrowRightUpLine />
      </a>
      <a href="https://twitter.com/gatsbyjs">
        <span>@gatsbyjs</span> <RiArrowRightUpLine />
      </a>
      <a href="mailto:team@gatsbyjs.com">
        <span>team@gatsbyjs.com</span>
      </a>
    </Row>
  </FooterRoot>
)

export default Footer
