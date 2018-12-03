import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Image from 'gatsby-image';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing
} from '../../utils/styles';

const ProductThumbnailsRoot = styled(`div`)`
  overflow-x: scroll;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  height: 100px;

  @media (min-width: ${breakpoints.desktop}px) {
    overflow-x: hidden;
    height: auto;
  }
`;

const ProductThumbnailsContent = styled(`div`)`
  display: inline-flex;

  @media (min-width: ${breakpoints.desktop}px) {
    padding: ${spacing.lg}px 0;
    min-width: 100%;
    justify-content: center;
  }
`;

const Thumbnail = styled(Image)`
  width: 15vw;
  border: 1px solid ${colors.brandBright};
  border-radius: ${radius.default}px;

  @media (min-width: ${breakpoints.desktop}px) {
    cursor: pointer;
    margin-right: ${spacing.md}px;
    width: 50px;

    :last-child {
      margin-right: 0;
    }
  }
`;

const ProductThumbnails = ({ images }) => (
  <ProductThumbnailsRoot>
    <ProductThumbnailsContent>
      {images.map((image, idx) => {
        const {
          id,
          localFile: {
            childImageSharp: { fluid }
          }
        } = image;

        return <Thumbnail key={id} fluid={fluid} />;
      })}
    </ProductThumbnailsContent>
  </ProductThumbnailsRoot>
);

ProductThumbnails.propTypes = {
  images: PropTypes.array.isRequired
};

export default ProductThumbnails;
