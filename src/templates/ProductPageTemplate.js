import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import InterfaceContext from '../context/InterfaceContext';
import ProductPage from '../components/ProductPage';

const removeCareInstructions = desc =>
  desc.split(/Care Instructions/).slice(0, 1);

const ProductPageTemplate = props => {
  const {
    data: {
      site,
      shopifyProduct: product,
      shopifyProduct: { title, description: fullDescription, handle }
    },
    location: { pathname }
  } = props;
  const {
    siteMetadata: { siteUrl }
  } = site;

  const description = removeCareInstructions(fullDescription);
  const image = product.images[0].src;
  const canonical = `${siteUrl}${pathname}`;

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

            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />

            <meta property="og:url" content={`${siteUrl}/product/${handle}`} />
            <meta property="og:locale" content="en" />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content="Gatsby Swag Store" />
            <meta property="og:description" content={description} />

            {/* TODO: add the image */}
            <meta property="og:image" content={`${siteUrl}${image}`} />
            <meta property="og:image:alt" content={title} />
            <meta property="og:image:width" content="600" />
            <meta property="og:image:height" content="600" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@gatsbyjs" />
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
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      description
      productType
      storefrontId
      variants {
        storefrontId
        shopifyId
        title
        price
        availableForSale
      }
      images {
        id
        altText
        gatsbyImageData(width: 910, height: 910, placeholder: BLURRED)
      }
    }
  }
`;
