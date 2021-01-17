import React from 'react';
import styled from '@emotion/styled';

import {
  breakpoints,
  colors,
  fonts,
  spacing,
  fontSizes
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
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: ${fontSizes['3xl']};
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.25;
  margin: 0;
  margin-top: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: ${fontSizes['4xl']};
  }
`;

const Intro = styled(`p`)`
  color: ${colors.text};
  font-size: ${fontSizes.md};
  line-height: 1.5;
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
