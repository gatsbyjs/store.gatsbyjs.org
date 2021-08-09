import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import ProductListingHeader from './ProductListingHeader';
import ProductListingItem from './ProductListingItem';

import { breakpoints, borders } from '../../utils/styles';

const ProductListingContainer = styled(`div`)`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: ${breakpoints.phablet}px) {
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: -1px;
    border-top: ${borders.grid};
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
                gatsbyImageData(
                  width: 800
                  height: 800
                  placeholder: "DOMINANT_COLOR"
                )
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
