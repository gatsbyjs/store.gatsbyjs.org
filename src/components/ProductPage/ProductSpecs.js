import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

import {
  breakpoints,
  colors,
  dimensions,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
} from "../../utils/styles"

const ProductSpecsRoot = styled(`div`)`
  padding: 0 ${dimensions.gutter.default};

  @media (min-width: ${breakpoints.tablet}px) {
    padding: ${spacing[`2xl`]} ${dimensions.gutter.desktop};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    padding: ${spacing[`2xl`]} 0;
  }
`

const Name = styled(`h1`)`
  color: ${colors.text};
  font-family: ${fonts.heading};
  font-size: ${fontSizes[`2xl`]};
  font-weight: ${fontWeights.bold};
  line-height: 1.125;
  margin: 0;
  letter-spacing: -0.02em;
`

const Description = styled(`p`)`
  color: ${colors.text};
  font-size: ${fontSizes.md};
  line-height: ${lineHeights.default};
  margin-bottom: 0;
`

const Price = styled(`div`)`
  color: ${colors.text};
  font-family: ${fonts.serif};
  font-size: ${fontSizes[`2xl`]};
  font-weight: ${fontWeights.normal};
  letter-spacing: -0.02em;

  span {
    color: ${colors.text};
  }
`

const removeCareInstructions = (desc) =>
  desc.split(/Care Instructions/).slice(0, 1)

const ProductSpecs = (props) => {
  const {
    product: {
      title,
      description,
      variants: [variant],
    },
  } = props

  const { price } = variant

  return (
    <ProductSpecsRoot>
      <Name>{title}</Name>
      <Price>
        <span>USD</span> ${price}
      </Price>
      <Description>{removeCareInstructions(description)}</Description>
    </ProductSpecsRoot>
  )
}

ProductSpecs.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductSpecs
