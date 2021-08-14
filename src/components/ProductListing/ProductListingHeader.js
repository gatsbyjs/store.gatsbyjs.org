import React from "react"
import styled from "@emotion/styled"

import {
  breakpoints,
  colors,
  fonts,
  fontSizes,
  lineHeights,
  spacing,
} from "../../utils/styles"

const ProductListingHeaderRoot = styled(`header`)`
  display: flex;
  flex-direction: column;
  max-width: 52em;
  padding: ${spacing[`2xl`]};
`

const Title = styled(`h1`)`
  color: ${colors.text};
  font-family: ${fonts.heading};
  font-size: ${fontSizes[`lg`]};
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: ${lineHeights.dense};
  margin: 0;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: ${fontSizes[`3xl`]};
  }
`

const Intro = styled(`p`)`
  color: ${colors.text};
  font-size: ${fontSizes.lg};
  line-height: ${lineHeights.default};
  margin: ${spacing.md} 0 0;
  font-weight: 500;
`

const ProductListingHeader = () => (
  <ProductListingHeaderRoot>
    <Title>Get Gatsby Swag</Title>
    <Intro>
      The money we charge for swag helps to cover production and shipping costs.
      In the unlikely event that Gatsby swag ends up turning a profit, we’ll
      reinvest that money into the open source community.
    </Intro>
  </ProductListingHeaderRoot>
)

export default ProductListingHeader
