import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { MdCameraAlt } from 'react-icons/md';

import ProductImage, { StyledImage } from './ProductImage';

import { radius, fonts, spacing, colors } from '../../utils/styles';

const ProductImagesMobileRoot = styled(`div`)`
  overflow-x: scroll;
  padding: ${spacing.md}px;
  padding-bottom: 10px;
  width: 100%;
  -webkit-overflow-scrolling: touch;
`;

const ProductImagesMobileContent = styled(`div`)`
  display: inline-flex;

  ${StyledImage} {
    flex-shrink: 0;
    width: 75vw;
    margin-right: ${spacing.md}px;
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

const ProductImagesMobile = ({ images }) => (
  <ProductImagesMobileRoot>
    <ProductImagesMobileContent>
      {images.map((image, idx) => (
        <ProductImage key={idx} image={image} />
      ))}

      <Incentive>
        <h3>
          <MdCameraAlt />
          Would you like to see a photo of your pet here?
        </h3>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin.
        </p>
      </Incentive>
    </ProductImagesMobileContent>
  </ProductImagesMobileRoot>
);

ProductImagesMobile.propTypes = {
  images: PropTypes.array.isRequired
};

export default ProductImagesMobile;
