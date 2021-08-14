import React, { Component } from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"

import { RiArrowRightDownLine } from "react-icons/ri"

import {
  colors,
  radius,
  spacing,
  defaultFontStack,
  fontSizes,
  transitions,
} from "../../utils/styles"

const ShippingInfoRoot = styled(`div`)`
  border-radius: ${radius.md}px;
  margin: ${spacing.sm} 0;
`

const Intro = styled(`p`)`
  color: ${colors.text};
  cursor: pointer;
  display: block;
  font-family: ${defaultFontStack};
  font-size: ${fontSizes.sm};
  margin: 0;
  position: relative;
  text-align: left;

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid currentColor;
  }

  a:hover {
    border-bottom-color: transparent;
  }
`

const on = keyframes`
  to {
    opacity: 1;
  }
`

const Details = styled(Intro)`
  animation: ${on} 1s ease forwards;
  cursor: default;
  display: none;
  margin-top: ${spacing.xs};
  opacity: 0;
  transition: ${transitions.speed.slow};

  .expanded & {
    display: block;
  }
`

const ArrowIcon = styled(RiArrowRightDownLine)`
  color: ${colors.brand};
  height: 24px;
  position: relative;
  transform: translateY(-10%) rotate(0);
  transition: ${transitions.speed.slow};
  vertical-align: top;
  width: 24px;

  .expanded & {
    transform: translateY(-10%) rotate(180deg);
  }

  ${Intro}:hover & {
    color: ${colors.accent};
  }
`

class ShippingInfo extends Component {
  state = {
    detailsVisible: false,
  }

  toggle = () => {
    this.setState({ detailsVisible: !this.state.detailsVisible })
  }

  render() {
    const { detailsVisible } = this.state

    return (
      <ShippingInfoRoot className={detailsVisible ? `expanded` : ``}>
        <Intro role="button" onClick={this.toggle}>
          International shipments can take <strong>6 weeks or more</strong> to
          be delivered and may be subject to{` `}
          <a
            href="https://github.com/gatsbyjs/store.gatsbyjs.org#frequently-asked-questions"
            target="blank"
            rel="nofollow"
          >
            local taxes and duties
          </a>
          . <ArrowIcon />
        </Intro>
        <Details>
          Tracking updates may not always show up in real time on your tracking
          link. If you still have not received your order at the end of 6 weeks,
          please let us know by sending an email to{` `}
          <a href="mailto:team@gatsbyjs.com">team@gatsbyjs.com</a>
        </Details>
      </ShippingInfoRoot>
    )
  }
}

export default ShippingInfo
