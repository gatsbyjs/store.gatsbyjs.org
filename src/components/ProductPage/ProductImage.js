import React, { Component } from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import { RiZoomInLine } from "react-icons/ri"

import { breakpoints, colors, radius, spacing } from "../../utils/styles"

export const IMAGE_CHANGE_ANIM_DURATION = 250

const change = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ProductImageLink = styled(`a`)`
  display: block;
  position: relative;

  &.change {
    animation: ${change} ${IMAGE_CHANGE_ANIM_DURATION}ms ease-out forwards;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    cursor: zoom-in;
  }
`

const ZoomHelper = styled(`span`)`
  background: rgba(255, 255, 255, 0.5);
  border-radius: ${radius.lg}px;
  display: flex;
  left: ${spacing.xs};
  padding: ${spacing.xs};
  position: absolute;
  top: ${spacing.xs};

  svg {
    width: 24px;
    height: 24px;
    fill: ${colors.brand};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    display: none;
  }
`

export const StyledImage = styled(GatsbyImage)`
  border-radius: ${radius.lg}px;

  @media (min-width: ${breakpoints.desktop}px) {
    box-shadow: none;
  }
`

class ProductImage extends Component {
  imageLink

  componentDidUpdate = (prevProps) => {
    if (prevProps.image.id !== this.props.image.id) {
      this.imageLink.classList.add(`change`)

      setTimeout(
        () => this.imageLink.classList.remove(`change`),
        IMAGE_CHANGE_ANIM_DURATION,
      )
    }
  }

  handleClick = (callback) => (event) => {
    event.preventDefault()

    callback(this.props.image)
  }

  render() {
    const {
      image: { gatsbyImageData, altText, src },
      onClick,
    } = this.props

    return (
      <ProductImageLink
        ref={(el) => {
          this.imageLink = el
        }}
        href={src}
        onClick={this.handleClick(onClick)}
      >
        <StyledImage image={gatsbyImageData} alt={altText} />
        <ZoomHelper>
          <RiZoomInLine />
        </ZoomHelper>
      </ProductImageLink>
    )
  }
}

ProductImage.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  imageFeatured: PropTypes.object,
}

export default ProductImage
