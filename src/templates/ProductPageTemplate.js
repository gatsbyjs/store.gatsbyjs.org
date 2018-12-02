import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import ProductPage from '../components/ProductPage';

const ProductPageTemplate = props => {
  const {
    shopifyProduct: product,
    shopifyProduct: { title }
  } = props.data;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ProductPage product={product} />
    </>
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
        altText
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
