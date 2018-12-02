import React, { Component } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import ProductListingHeader from './ProductListingHeader';
import ProductListingItem from './ProductListingItem';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

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

const ProductListing = props => (
  <StaticQuery
    query={graphql`
      query ProductListingQuery {
        products: allShopifyProduct(
          sort: { fields: [publishedAt], order: ASC }
        ) {
          edges {
            node {
              id
              handle
              title
              description
              productType
              variants {
                shopifyId
                title
                price
                availableForSale
              }
              images {
                id
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910, maxHeight: 910) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
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

ProductListing.propTypes = {};

export default ProductListing;
