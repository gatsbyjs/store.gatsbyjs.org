import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { MdCameraAlt } from 'react-icons/md';

import ProductImage, { StyledImage } from './ProductImage';
import ProductThumbnails, { Thumbnail } from './ProductThumbnails';

import { radius, fonts, spacing, colors } from '../../utils/styles';

const THUMBNAIL_SIZE = '54px';

const ProductImagesDesktopRoot = styled(`div`)`
  margin-right: ${spacing.lg}px;
  width: 440px;
`;

const Thumbnails = styled(ProductThumbnails)`
  ${Thumbnail} {
    height: ${THUMBNAIL_SIZE};
    width: ${THUMBNAIL_SIZE};
  }
`;

const ProductImagesDesktop = ({ images, imageFeatured, imageOnClick }) => {
  const image = images[0];

  return (
    <ProductImagesDesktopRoot>
      <ProductImage
        image={imageFeatured ? imageFeatured : image}
        onClick={imageOnClick}
      />
      <Thumbnails images={images} />
    </ProductImagesDesktopRoot>
  );
};

ProductImagesDesktop.propTypes = {
  images: PropTypes.array.isRequired,
  imageOnClick: PropTypes.func,
  imageFeatured: PropTypes.object
};

export default ProductImagesDesktop;
