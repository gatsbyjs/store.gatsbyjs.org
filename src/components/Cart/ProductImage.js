import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Image from 'gatsby-image';

const ProductImage = ({
  shopifyImages,
  id: imageId,
  fallback,
  ...imageProps
}) => {
  // Shopify's JavaScript Buy SDK returns the ID alone, while the Gatsby
  // source plugin prepends the ID with the GraphQL type
  const formattedImageId = `Shopify__ProductImage__${imageId}`

  const image = shopifyImages.find(({ node: { id } }) => id === formattedImageId)

  if (image) {
    imageProps.fluid = image.node.localFile.childImageSharp.fluid
  } else {
    imageProps.src = fallback
  }

  return(
    <Image {...imageProps} />
  )
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query ImageListings {
        images: allShopifyProductImage {
          edges {
            node {
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
    `}
    render={({ images }) => (
      <ProductImage shopifyImages={images.edges} {...props} />
    )}
  />
);
