import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { MdCameraAlt } from 'react-icons/md';

import ProductImage, { StyledImage } from './ProductImage';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing
} from '../../utils/styles';

const ProductImagesMobileRoot = styled(`div`)`
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  padding: ${spacing.md}px;
  padding-bottom: ${spacing.xs}px;
  width: 100%;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: ${spacing.xl}px;
    padding-bottom: ${spacing.lg}px;
  }
`;

const ProductImagesMobileContent = styled(`div`)`
  display: inline-flex;

  ${StyledImage} {
    flex-shrink: 0;
    margin-right: ${spacing.md}px;
    width: 75vw;

    @media (min-width: ${breakpoints.tablet}px) {
      margin-right: ${spacing.xl}px;
    }
  }
`;

const Incentive = styled(`div`)`
  border-radius: ${radius.large}px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  padding: ${spacing.xl}px;
  width: 250px;

  h3 {
    font-family: ${fonts.heading};
    font-size: 1.2rem;
    line-height: 1.2;
    margin: 0 0 0.5em;

    svg {
      fill: ${colors.brand};
      height: 1.15em;
      margin-right: ${spacing['2xs']}px;
      vertical-align: top;
      width: 1.15em;
    }
  }

  p {
    font-size: 1rem;
    line-height: 1.4;
    margin: 0;
  }
`;

const ProductImagesMobile = ({ images, imageOnClick }) => (
  <ProductImagesMobileRoot>
    <ProductImagesMobileContent>
      {images.map((image, idx) => (
        <ProductImage key={idx} image={image} onClick={imageOnClick} />
      ))}

      <Incentive>
        <h3>
          <MdCameraAlt />
          We want to see your Gatsby swag photos!
        </h3>
        <p>
          Upload your photos to{' '}
          <a href="https://github.com/gatsbyjs/store.gatsbyjs.org/issues/143">
            the official photo sharing issue
          </a>{' '}
          and it may be featured in the store!
        </p>
      </Incentive>
    </ProductImagesMobileContent>
  </ProductImagesMobileRoot>
);

ProductImagesMobile.propTypes = {
  images: PropTypes.array.isRequired,
  imageOnClick: PropTypes.func
};

export default ProductImagesMobile;
