import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';

import { colors, radius } from '../../utils/styles';

const CartThumbnailRoot = styled(GatsbyImage)`
  border: 1px solid ${colors.brandLight};
  border-radius: ${radius.md}px;
  height: 36px;
  width: 36px;
`;

const CartThumbnailRootFallback = styled(GatsbyImage)`
  border: 1px solid ${colors.brandLight};
  border-radius: ${radius.default}px;
  height: 36px;
  width: 36px;
`;

const CartThumbnail = ({ shopifyImages, fallback, ...imageProps }) => {
  const image = shopifyImages.find(({ src }) => src === fallback);

  if (image) {
    return (
      <CartThumbnailRoot image={image.gatsbyImageData} alt={image.altText} />
    );
  }

  return <CartThumbnailRootFallback {...imageProps} src={fallback} />;
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
                src
                originalSrc
                gatsbyImageData(width: 910, height: 910)
              }
            }
          }
        }
      }
    `}
    render={({ allShopifyProduct: { edges } }) => {
      const images = edges
        .map(({ node }) => node.images)
        .reduce((acc, val) => acc.concat(val), []);

      return <CartThumbnail shopifyImages={images} {...props} />;
    }}
  />
);
