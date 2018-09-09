import React from 'react';
import styled from 'react-emotion';
import Link from 'gatsby-link';
// import CallOut from './CallOut';
import ProductListings from './ProductListings';
import { pullHeadline, breakpoints, colors, link } from '../../utils/styles';

const Headline = styled('h1')`
  ${pullHeadline};

  @media (min-width: ${breakpoints.hd}px) {
    padding-top: 80px;
  }
`;

const ProductDetailsLink = styled(Link)`
  ${link};
  text-decoration: none;
`

export default () => (
  <>
    <Headline>Get Gatsby Swag!</Headline>
    {/* <CallOut /> */}
    <ProductListings />
    <ProductDetailsLink
      to="/product-details"
      style={{
        textDecoration: 'none'
      }}
    >
      Product Details & Size Chart
    </ProductDetailsLink>
  </>
);
