import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import styled, { keyframes } from 'react-emotion';
import debounce from 'lodash.debounce';

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
const IMAGE_CHANGE_ANIM_DURATION = 250;

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

const exit = keyframes`
  0% {
    left: 0;
    opacity: 1;
    transform: scale(1);
  }
  99% {
    left: 0;
    opacity: 0;
    transform:  scale(0.8);
  }
  100% {
    left: 100%;
    opacity: 0;
    transform:scale(0.8);
  }
`;

const ProductImagesBrowserRoot = styled(`div`)`
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
  background: white;
  display: flex;
  flex-direction: column;
  bottom: 0;
  justify-content: stretch;
  left: 100%;
  position: fixed;
  top: 0;
  transform: scale(0.8);
  transform-origin: center center;
  width: 100vw;
  will-change: auto;
  z-index: 10000;

  &.open {
    animation: ${entry} 300ms ease-out forwards;
  }

  &.closed {
    animation: ${exit} 200ms ease-out forwards;
  }

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
  flex-grow: 1;
  overflow-x: scroll;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: calc(100% - ${ACTIONS_WIDTH_DESKTOP});

  &.change {
    animation: ${change} ${IMAGE_CHANGE_ANIM_DURATION}ms ease-out forwards;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    border-bottom: none;
    border-left: 1px solid ${colors.brandLight};
    display: flex;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100vh;
    width: calc(100% - ${ACTIONS_WIDTH_DESKTOP});
  }
`;

const ZoomImage = styled(`a`)`
  display: block;
  height: 100%;
  width: 100%;

  .gatsby-image-wrapper {
    height: auto;
    width: ${props => (props.superZoom ? props.width * 2 : props.width)}px;
  }

  @media (orientation: landscape) {
    .gatsby-image-wrapper {
      width: ${props => (props.superZoom ? '200' : '100')}%;
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    cursor: pointer;
    width: ${props => (props.superZoom ? '100%' : 'auto')};

    .gatsby-image-wrapper {
      width: ${props => (props.superZoom ? '100%' : '100vh')};
    }
  }
`;

const Actions = styled(`div`)`
  display: flex;
  height: ${ACTIONS_HEIGHT_MOBILE};
  flex-grow: 0;
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

const CloseButton = styled(Button)``;

const ProductThumbnailsRestyled = styled(ProductThumbnails)`
  @media (min-width: ${breakpoints.desktop}px) {
    ${ProductThumbnailsContent} {
      align-items: center;
      flex-direction: column;
    }

    ${Thumbnail} {
      height: 70px;
      margin-right: 0;
      margin-bottom: ${spacing.md}px;
      width: 70px;
    }
  }
`;

class ProductImagesBrowser extends Component {
  zoomContainer;
  zoomImage;

  state = {
    zoomContainerWidth: null,
    zoomImageHeight: null,
    superZoom: false
  };

  componentDidMount = () => {
    this.measureImage();
    this.centerImage();

    window.addEventListener('resize', debounce(this.measureImage, 250));
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.position !== this.props.position &&
      this.props.position === 'open' &&
      this.state.superZoom
    ) {
      this.setState({
        superZoom: false
      });
    }

    if (
      prevProps.imageFeatured !== this.props.imageFeatured ||
      prevProps.position !== this.props.position
    ) {
      this.centerImage();

      this.zoomContainer.classList.add('change');
      setTimeout(
        () => this.zoomContainer.classList.remove('change'),
        IMAGE_CHANGE_ANIM_DURATION
      );
    }
  };

  measureImage = () => {
    if (this.zoomContainer && this.zoomImage) {
      this.setState({
        zoomContainerWidth: this.zoomContainer.offsetWidth,
        zoomImageHeight: this.zoomImage.offsetHeight
      });
    }
  };

  centerImage = () => {
    const offsetToScroll =
      (this.state.zoomImageHeight - this.state.zoomContainerWidth) / 2;

    this.zoomContainer.scroll({ left: offsetToScroll });
  };

  close = callback => event => {
    callback();
  };

  toggleZoomRatio = event => {
    event.preventDefault();

    this.setState(state => ({ superZoom: !state.superZoom }));
  };

  render() {
    const { images, position, imageFeatured, toggle } = this.props;
    const image = imageFeatured ? imageFeatured : images[0];
    const {
      localFile: {
        childImageSharp: { fluid }
      }
    } = image;

    const { zoomImageHeight, superZoom } = this.state;

    return (
      <ProductImagesBrowserRoot
        role="dialog"
        aria-labelledby="Product's picture browser"
        aria-describedby="Browse pictures presenting"
        className={position}
      >
        <ZoomContainer
          innerRef={container => {
            this.zoomContainer = container;
          }}
        >
          <ZoomImage
            onClick={this.toggleZoomRatio}
            href={fluid.src}
            superZoom={superZoom}
            width={zoomImageHeight}
            innerRef={image => {
              this.zoomImage = image;
            }}
          >
            <Image fluid={fluid} />
          </ZoomImage>
        </ZoomContainer>

        <Actions>
          <CloseButton onClick={this.close(toggle)}>
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
  position: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  imageFeatured: PropTypes.object
};

export default ProductImagesBrowser;
