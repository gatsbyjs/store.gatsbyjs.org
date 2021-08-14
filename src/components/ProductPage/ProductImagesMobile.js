import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { RiCamera2Line } from "react-icons/ri"

import ProductImage, { StyledImage } from "./ProductImage"

import {
  breakpoints,
  dimensions,
  fonts,
  fontSizes,
  lineHeights,
  radius,
  shadows,
  spacing,
} from "../../utils/styles"

const ProductImagesMobileRoot = styled(`div`)`
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  padding: ${dimensions.gutter.default};
  width: 100%;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: ${dimensions.gutter.desktop};
  }
`

const ProductImagesMobileContent = styled(`div`)`
  display: inline-flex;

  ${StyledImage} {
    flex-shrink: 0;
    width: 50vw;
    margin-right: ${spacing.md};

    @media (min-width: ${breakpoints.tablet}px) {
      margin-right: ${spacing.xl};
    }
  }
`

const Incentive = styled(`div`)`
  border-radius: ${radius.lg}px;
  // box-shadow: ${shadows.card};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  padding: ${spacing.xl};
  width: 50vw;

  h3 {
    margin: 0 0 0.5em;
    font-family: ${fonts.heading};
    line-height: ${lineHeights.dense};

    svg {
      display: block;
      width: 1.5em;
      height: 1.5em;
      margin-bottom: ${spacing.md};
    }
  }

  p {
    margin: 0;
    font-size: ${fontSizes.md};
  }
`

const ProductImagesMobile = ({ images, imageOnClick }) => (
  <ProductImagesMobileRoot>
    <ProductImagesMobileContent>
      {images.map((image, idx) => (
        <ProductImage key={idx} image={image} onClick={imageOnClick} />
      ))}

      <Incentive>
        <h3>
          <RiCamera2Line />
          We want to see your Gatsby swag photos!
        </h3>
        <p>
          Share your photos in{` `}
          <a href="https://github.com/gatsbyjs/store.gatsbyjs.org/issues/143">
            the official photo sharing issue
          </a>
          {` `}
          and they may be featured in the store!
        </p>
      </Incentive>
    </ProductImagesMobileContent>
  </ProductImagesMobileRoot>
)

ProductImagesMobile.propTypes = {
  images: PropTypes.array.isRequired,
  imageOnClick: PropTypes.func,
}

export default ProductImagesMobile
