import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Image from 'gatsby-image';

const ProductImage = ({
  shopifyImages,
  id: imageId,
  fallback,
  ...imageProps
}) => {
  const image = shopifyImages.find(({ id }) => id === imageId);

  if (image) {
    imageProps.fluid = image.localFile.childImageSharp.fluid;
  } else {
    imageProps.src = fallback;
  }

  return <Image {...imageProps} />;
};

export default props => (
  <StaticQuery
    query={graphql`
      {
        allShopifyProduct {
          edges {
            node {
              images {
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
    render={({ allShopifyProduct }) => {
      const images = allShopifyProduct.edges
        .map(({ node }) => node.images)
        .reduce((acc, val) => acc.concat(val), []);

      return <ProductImage shopifyImages={images} {...props} />;
    }}
  />
);
