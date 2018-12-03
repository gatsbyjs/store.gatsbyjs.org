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

const ProductImagesDesktop = ({ images }) => {
  const image = images[0];

  return (
    <ProductImagesDesktopRoot>
      <ProductImage image={image} />
      <ProductThumbnails images={images} />
    </ProductImagesDesktopRoot>
  );
};

ProductImagesDesktop.propTypes = {
  images: PropTypes.array.isRequired
};

export default ProductImagesDesktop;
