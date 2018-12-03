import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import styled from 'react-emotion';

import InterfaceContext from '../../context/InterfaceContext';
import BackLink from '../shared/BackLink';
import ProductThumbnails from './ProductThumbnails';

const ProductImagesBrowserRoot = styled(`div`)`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  background: red;
  bottom: 0;
  left: ${props => (props.isActive ? '0' : '100%')};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const ZoomContainer = styled(`div`)`
  background: blue;
  flex-basis: calc(100vh - 150px);
  overflow-x: scroll;
  width: 100%;
  background: 3px solid red;
  -webkit-overflow-scrolling: touch;
  flex-shrink: 0;
`;

const ZoomImage = styled(Image)`
  height: 100%;
  width: calc(100vh - 150px);
`;

const ThumbnailsContainer = styled(`div`)`
  background: yellow;
  flex-basis: 100px;
  flex-shrink: 1;
  flex-grow: 1;
`;

const BackToProductDetails = styled(BackLink)``;

const ProductImagesBrowser = props => {
  const { images } = props;

  const {
    id,
    localFile: {
      childImageSharp: { fluid }
    }
  } = images[0];

  return (
    <InterfaceContext.Consumer>
      {({ productImagesBrowserIsActive, toggleProductImagesBrowser }) => (
        <ProductImagesBrowserRoot isActive={productImagesBrowserIsActive}>
          <ZoomContainer>
            <ZoomImage fluid={fluid} />

            {/* <ZoomImage fluid={fluid} /> */}
          </ZoomContainer>
          <ThumbnailsContainer>
            <ProductThumbnails images={images} />
          </ThumbnailsContainer>
          {/* <ProductThumbnails images={images} /> */}
          {/* <BackToProductDetails callback={toggleProductImagesBrowser}>
            Back to Product Details
          </BackToProductDetails> */}
        </ProductImagesBrowserRoot>
      )}
    </InterfaceContext.Consumer>
  );
};

ProductImagesBrowser.propTypes = {
  images: PropTypes.array.isRequired
};

export default ProductImagesBrowser;
