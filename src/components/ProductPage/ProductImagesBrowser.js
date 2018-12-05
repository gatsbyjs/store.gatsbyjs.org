import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import styled from 'react-emotion';

import { MdClose } from 'react-icons/md';

import InterfaceContext from '../../context/InterfaceContext';
import BackLink from '../shared/BackLink';
import ProductThumbnails from './ProductThumbnails';
import { Button } from '../shared/Buttons';

import { colors, spacing } from '../../utils/styles';

const ProductImagesBrowserRoot = styled(`div`)`
  background: white;
  display: flex;
  flex-direction: column;
  height: calc(var(--vh) * 100);
  justify-content: stretch;
  left: ${props => (props.isOpen ? '0' : '100%')};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
`;

const ZoomContainer = styled(`div`)`
  background: blue;
  border-bottom: 1px solid ${colors.brandLight};

  flex-shrink: 0;
  overflow-x: scroll;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const ZoomImage = styled(Image)`
  height: calc((var(--vh) * 100) - 80px);
  width: calc((var(--vh) * 100) - 80px);
`;

const Actions = styled(`div`)`
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: ${spacing.md}px;
`;

const CloseButton = styled(Button)`
  height: 44px;
`;

class ProductImagesBrowser extends Component {
  zoomContainer;
  zoomImage;
  myRef = React.createRef();

  componentDidMount = () => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.productImageFeatured !== this.props.productImageFeatured) {
      const zoomContainerWidth = this.zoomContainer.offsetWidth;
      const zoomImageWidth = this.zoomImage.imageRef.current.offsetWidth;
      const widthToScroll = (zoomImageWidth - zoomContainerWidth) / 2;
      console.log(widthToScroll);

      this.zoomContainer.scroll({
        left: widthToScroll,
        behavior: 'smooth'
      });
    }
  };

  handleClose = callback => event => {
    callback();
  };

  render() {
    const {
      images,
      productImagesBrowserOpen,
      productImageFeatured,
      toggleProductImagesBrowser
    } = this.props;

    const featuredImage = productImageFeatured
      ? productImageFeatured
      : images[0];

    const {
      localFile: {
        childImageSharp: { fluid }
      }
    } = featuredImage;

    return (
      <ProductImagesBrowserRoot isOpen={productImagesBrowserOpen}>
        <ZoomContainer
          innerRef={continer => {
            this.zoomContainer = continer;
          }}
        >
          <ZoomImage
            fluid={fluid}
            innerRef={image => {
              this.zoomImage = image;
            }}
          />
        </ZoomContainer>

        <Actions>
          <CloseButton onClick={this.handleClose(toggleProductImagesBrowser)}>
            <span>
              <MdClose />
              Close
            </span>
          </CloseButton>
          <ProductThumbnails images={images} />
        </Actions>
      </ProductImagesBrowserRoot>
    );
  }
}

ProductImagesBrowser.propTypes = {
  images: PropTypes.array.isRequired,
  toggleProductImagesBrowser: PropTypes.func,
  productImagesBrowserOpen: PropTypes.bool,
  productImageFeatured: PropTypes.object
};

export default ProductImagesBrowser;
