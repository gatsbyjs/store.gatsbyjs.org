import React from 'react';
// import Client from 'shopify-buy';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'react-emotion';
import ProductPreview from '../ProductPreview/ProductPreview';

const Previews = styled('div')`
  @media (min-width: 480px) {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

export default () => (
  <StaticQuery
    query={graphql`
      query ProductListingsQuery {
        products: allShopifyProduct {
          edges {
            node {
              id
              title
              description
              productType
              variants: childrenShopifyProductVariant {
                shopifyId
                title
                price
              }
              images: childrenShopifyProductImage {
                id
                localFile {
                  childImageSharp {
                    fluid {
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
      <Previews>
        {products.edges.map(({ node: product }) => (
          <ProductPreview key={product.id} product={product} />
        ))}
      </Previews>
    )}
  />
);
