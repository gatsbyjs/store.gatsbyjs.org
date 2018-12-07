import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { MdCameraAlt } from 'react-icons/md';

import ProductImage, { StyledImage } from './ProductImage';
import ProductThumbnails from './ProductThumbnails';

import { radius, fonts, spacing, colors } from '../../utils/styles';

const ProductImagesDesktopRoot = styled(`div`)`
  width: 440px;
  margin-right: ${spacing.lg}px;
`;

const ProductImagesDesktop = ({ images, imageFeatured, imageOnClick }) => {
  const image = images[0];

  return (
    <ProductImagesDesktopRoot>
      <ProductImage
        image={imageFeatured ? imageFeatured : image}
        onClick={imageOnClick}
      />
      <ProductThumbnails images={images} />
    </ProductImagesDesktopRoot>
  );
};

ProductImagesDesktop.propTypes = {
  images: PropTypes.array.isRequired,
  imageOnClick: PropTypes.func,
  imageFeatured: PropTypes.object
};

export default ProductImagesDesktop;
