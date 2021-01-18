import React from 'react';
import styled from '@emotion/styled';

import {
  breakpoints,
  colors,
  fonts,
  spacing,
  fontSizes,
  lineHeights,
  gradients
} from '../../utils/styles';

const ProductListingHeaderRoot = styled(`header`)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 40em;
  padding: ${spacing.lg}px;
  text-align: center;
`;

const Title = styled(`h1`)`
  color: ${colors.text};
  font-family: ${fonts.heading};
  font-size: ${fontSizes['3xl']};
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: ${lineHeights.dense};
  margin: 0;
  margin-top: ${spacing.md}px;
  background: ${gradients.default};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: ${fontSizes['4xl']};
  }
`;

const Intro = styled(`p`)`
  color: ${colors.text};
  font-size: ${fontSizes.md};
  line-height: ${lineHeights.default};
  margin: 0;
  margin-top: ${spacing.md}px;
`;

const ProductListingHeader = () => (
  <ProductListingHeaderRoot>
    <Title>Get Gatsby Swag!</Title>
    <Intro>
      The money we charge for swag helps to cover production and shipping costs.
      In the unlikely event that Gatsby swag ends up turning a profit, we’ll
      reinvest that money into the open source community.
    </Intro>
  </ProductListingHeaderRoot>
);

export default ProductListingHeader;
