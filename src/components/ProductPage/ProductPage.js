import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import InterfaceContext from '../../context/InterfaceContext';
import Portal from '../Layout/Portal';
import ProductImagesMobile from './ProductImagesMobile';
import ProductImagesDesktop from './ProductImagesDesktop';
import ProductSpecs from './ProductSpecs';
import ProductForm from './ProductForm';
import BackLink from '../shared/BackLink';
import ProductImagesBrowser from './ProductImagesBrowser';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const ProductPageRoot = styled('div')`
  padding-bottom: ${spacing.md}px;
  position: ${props => (props.isCovered ? 'fixed' : 'static')};

  @media (min-width: ${breakpoints.desktop}px) {
    align-items: center;
    display: ${props => (props.isCovered ? 'none' : 'flex')};
    justify-content: center;
    min-height: calc(100vh - 120px);
    padding: ${spacing.xl}px;
    width: 100%;
  }
`;

const Container = styled(`div`)`
  @media (min-width: ${breakpoints.desktop}px) {
    align-items: flex-start;
    display: flex;
  }
`;

const Details = styled(`div`)`
  position: relative;

  @media (min-width: ${breakpoints.desktop}px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: -${spacing.xl}px;
    max-width: 400px;
    min-height: 490px;
  }
`;

const BackToProductList = styled(BackLink)`
  position: fixed;
`;

class ProductPage extends Component {
  desktopMediaQuery;

  state = {
    isDesktopViewport: false
  };

  componentDidMount = () => {
    const mediaQueryToMatch = `(min-width: ${breakpoints.desktop}px)`;

    this.desktopMediaQuery = window.matchMedia(mediaQueryToMatch);
    this.desktopMediaQuery.addListener(this.updateViewPortState);

    this.setState({ isDesktopViewport: this.desktopMediaQuery.matches });
  };

  componentWillUnmount = () => {
    this.desktopMediaQuery.removeListener(this.updateViewPortState);
  };

  updateViewPortState = e => {
    this.setState({ isDesktopViewport: this.desktopMediaQuery.matches });
  };

  render() {
    const {
      product,
      product: { id, images, variants }
    } = this.props;

    const { isDesktopViewport, imageBrowserIsActive } = this.state;

    return (
      <InterfaceContext.Consumer>
        {({
          productImagesBrowserStatus,
          productImageFeatured,
          toggleProductImagesBrowser
        }) => (
          <>
            <ProductPageRoot isCovered={productImagesBrowserStatus === 'open'}>
              <Container>
                {!isDesktopViewport ? (
                  <ProductImagesMobile
                    images={images}
                    imageOnClick={toggleProductImagesBrowser}
                  />
                ) : (
                  <ProductImagesDesktop
                    images={images}
                    imageOnClick={toggleProductImagesBrowser}
                    imageFeatured={productImageFeatured}
                  />
                )}
                <Details>
                  <BackToProductList>Back to Product List</BackToProductList>
                  <ProductSpecs product={product} />
                  <ProductForm id={id} variants={variants} />
                </Details>
              </Container>
            </ProductPageRoot>

            <Portal>
              <ProductImagesBrowser
                images={images}
                position={productImagesBrowserStatus}
                imageFeatured={productImageFeatured}
                toggle={toggleProductImagesBrowser}
                isDesktopViewport={isDesktopViewport}
              />
            </Portal>
          </>
        )}
      </InterfaceContext.Consumer>
    );
  }
}

ProductPage.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductPage;
