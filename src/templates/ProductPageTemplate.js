import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import InterfaceContext from '../context/InterfaceContext';
import ProductPage from '../components/ProductPage';

const ProductPageTemplate = props => {
  const {
    shopifyProduct: product,
    shopifyProduct: { title }
  } = props.data;

  return (
    <InterfaceContext.Consumer>
      {({
        isDesktopViewport,
        productImagesBrowserStatus,
        productImageFeatured,
        toggleProductImagesBrowser,
        setCurrentProductImages
      }) => (
        <>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          <ProductPage
            product={product}
            isDesktopViewport={isDesktopViewport}
            productImagesBrowserStatus={productImagesBrowserStatus}
            productImageFeatured={productImageFeatured}
            toggleProductImagesBrowser={toggleProductImagesBrowser}
            setCurrentProductImages={setCurrentProductImages}
          />
        </>
      )}
    </InterfaceContext.Consumer>
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
