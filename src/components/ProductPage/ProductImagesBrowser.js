import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import styled from 'react-emotion';

import InterfaceContext from '../../context/InterfaceContext';
import BackLink from '../shared/BackLink';
import ProductImage from './ProductImage';

const ProductImagesBrowserRoot = styled(`div`)`
  background: white;
  bottom: 0;
  left: ${props => (props.isActive ? '0' : '100%')};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const BackToProductDetails = styled(BackLink)``;

const ProductImagesBrowser = props => {
  const { images } = props;

  return (
    <InterfaceContext.Consumer>
      {({ productImagesBrowserIsActive, toggleProductImagesBrowser }) => (
        <ProductImagesBrowserRoot isActive={productImagesBrowserIsActive}>
          <ProductImage image={images[0]} />
          <BackToProductDetails callback={toggleProductImagesBrowser}>
            Back to Product Details
          </BackToProductDetails>
        </ProductImagesBrowserRoot>
      )}
    </InterfaceContext.Consumer>
  );
};

ProductImagesBrowser.propTypes = {
  images: PropTypes.array.isRequired
};

export default ProductImagesBrowser;
