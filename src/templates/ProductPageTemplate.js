import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/shared/Layout';
import ProductPage from '../components/ProductPage';

const ProductPageTemplate = props => {
  const { shopifyProduct: product } = props.data;

  return (
    <Layout newDesign={true}>
      <ProductPage product={product} />
    </Layout>
  );
};

export default ProductPageTemplate;

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
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
`;
