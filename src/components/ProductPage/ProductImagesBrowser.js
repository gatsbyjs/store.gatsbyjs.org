import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import styled, { keyframes } from 'react-emotion';

import { MdClose } from 'react-icons/md';

import InterfaceContext from '../../context/InterfaceContext';
import BackLink from '../shared/BackLink';
import ProductThumbnails, {
  ProductThumbnailsContent,
  Thumbnail
} from './ProductThumbnails';
import { Button } from '../shared/Buttons';

import { breakpoints, colors, spacing } from '../../utils/styles';

const ACTIONS_WIDTH_DESKTOP = '200px';
const ACTIONS_HEIGHT_MOBILE = '80px';
const IMAGE_CHANGE_ANIM_DURATION = 350;

const entry = keyframes`
  0% {
    left: 0;
    transform: scale(0.8);
  }
  100% {
    left: 0;
    transform: scale(1);
  }
`;

const ProductImagesBrowserRoot = styled(`div`)`
  animation: ${props =>
    props.isOpen
      ? `${entry} ${IMAGE_CHANGE_ANIM_DURATION}ms ease-out forwards`
      : ''};
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
  background: white;
  display: flex;
  flex-direction: column;
  height: calc(var(--vh) * 100);
  justify-content: stretch;
  left: 100%;
  position: fixed;
  top: 0;
  transform: scale(0.8);
  transform-origin: center center;
  width: 100%;
  z-index: 10000;

  @media (min-width: ${breakpoints.desktop}px) {
    flex-direction: row-reverse;
    height: 100vh;
  }
`;

const change = keyframes`
  0% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
`;

const ZoomContainer = styled(`div`)`
  border-bottom: 1px solid ${colors.brandLight};
  flex-shrink: 0;
  overflow-x: scroll;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  &.change {
    animation: ${change} 0.4s ease-out forwards;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    border-bottom: none;
    border-left: 1px solid ${colors.brandLight};
    display: flex;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
    width: calc(100% - ${ACTIONS_WIDTH_DESKTOP});
  }
`;

const ZoomImage = styled(Image)`
  height: calc((var(--vh) * 100) - 80px);
  width: calc((var(--vh) * 100) - 80px);

  @media (min-width: ${breakpoints.desktop}px) {
    height: 100vh;
    width: 100vh;
  }
`;

const Actions = styled(`div`)`
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: ${ACTIONS_WIDTH_DESKTOP};
    padding-left: 0;
    padding-top: ${spacing.xl}px;
  }
`;

const CloseButton = styled(Button)`
  height: 44px;
`;

const ProductThumbnailsRestyled = styled(ProductThumbnails)`
  @media (min-width: ${breakpoints.desktop}px) {
    ${ProductThumbnailsContent} {
      align-items: center;
      flex-direction: column;
    }

    ${Thumbnail} {
      height: 80px;
      margin-right: 0;
      margin-bottom: ${spacing.md}px;
      width: 80px;
    }
  }
`;

class ProductImagesBrowser extends Component {
  zoomContainer;
  zoomImage;

  state = {
    zoomContainerWidth: null,
    zoomImageWidth: null
  };

  componentDidMount = () => {
    let vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      let vh = document.documentElement.clientHeight * 0.01;

      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    this.setState({
      zoomContainerWidth: this.zoomContainer.offsetWidth,
      zoomImageWidth: this.zoomImage.imageRef.current.offsetWidth
    });
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.productImageFeatured !== this.props.productImageFeatured ||
      prevProps.productImagesBrowserOpen !== this.props.productImagesBrowserOpen
    ) {
      this.centerZoomImage();

      console.log(this.zoomContainer);

      this.zoomContainer.classList.add('change');
      setTimeout(
        () => this.zoomContainer.classList.remove('change'),
        IMAGE_CHANGE_ANIM_DURATION
      );
    }
  };

  centerZoomImage = () => {
    const offsetToScroll =
      (this.state.zoomImageWidth - this.state.zoomContainerWidth) / 2;

    this.zoomContainer.scroll({ left: offsetToScroll });
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
          <ProductThumbnailsRestyled images={images} />
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
