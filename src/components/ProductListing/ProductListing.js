import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import ProductListingHeader from './ProductListingHeader';
import ProductListingItem from './ProductListingItem';

import { breakpoints, spacing } from '../../utils/styles';

const ProductListingContainer = styled(`div`)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${spacing.lg}px;

  @media (min-width: ${breakpoints.desktop}px) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: ${spacing['2xl']}px;
  }
`;

const ProductListing = () => (
  <StaticQuery
    query={graphql`
      query ProductListingQuery {
        products: allShopifyProduct(
          sort: { fields: [publishedAt], order: ASC }
        ) {
          edges {
            node {
              id
              storefrontId
              handle
              title
              description
              productType
              variants {
                storefrontId
                shopifyId
                title
                price
                availableForSale
              }
              featuredImage {
                id
                altText
                gatsbyImageData(width: 910, height: 910, placeholder: BLURRED)
              }
            }
          }
        }
      }
    `}
    render={({ products }) => (
      <>
        <ProductListingHeader />
        <ProductListingContainer>
          {products.edges.map(({ node: product }) => (
            <ProductListingItem key={product.id} product={product} />
          ))}
        </ProductListingContainer>
      </>
    )}
  />
);

export default ProductListing;
