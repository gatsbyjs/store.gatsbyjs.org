import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { RiArrowGoBackLine } from "react-icons/ri"

import { Button } from "../shared/Buttons"

import {
  breakpoints,
  colors,
  dimensions,
  fontSizes,
  lineHeights,
  spacing,
} from "../../utils/styles"

const BackLinkRoot = styled(`div`)`
  padding: ${spacing.lg} ${dimensions.gutter.default}
    ${dimensions.gutter.default};
  width: 100%;
  order: 1;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: ${spacing[`2xl`]} ${dimensions.gutter.desktop};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    order: -1;
    padding: 0;
  }
`

const BackToListing = styled(Button)`
  border: 0;
  color: ${colors.text};
  font-size: ${fontSizes.sm};
  line-height: ${lineHeights.default};
  width: 100%;

  @media (min-width: ${breakpoints.desktop}px) {
    width: auto;
    padding: 0;
    background: transparent;
    border: 0;

    span {
      border-bottom: 1px solid transparent;
    }
  }

  @media (hover: hover) {
    :hover {
      color: ${colors.brand};

      span {
        border-bottom-color: currentColor;
      }
    }
  }
`

const BackLink = ({ children, className }) => (
  <BackLinkRoot className={className}>
    <BackToListing to="/">
      <RiArrowGoBackLine /> <span>{children}</span>
    </BackToListing>
  </BackLinkRoot>
)

BackLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default BackLink
