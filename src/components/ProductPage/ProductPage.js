import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import InterfaceContext from '../../context/InterfaceContext';
import ProductImagesMobile from './ProductImagesMobile';
import ProductImagesDesktop from './ProductImagesDesktop';
import ProductSpecs from './ProductSpecs';
import ProductForm from './ProductForm';
import BackLink from '../shared/BackLink';
import ProductImagesBrowser from './ProductImagesBrowser';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const ProductPageRoot = styled('div')`
  padding-bottom: calc(${spacing['3xl']}px * 2);
  position: ${props => (props.isCovered ? 'fixed' : 'static')};

  @media (min-width: ${breakpoints.desktop}px) {
    align-items: center;
    display: ${props => (props.isCovered ? 'none' : 'flex')};
    min-height: calc(100vh - 60px);
    padding: ${spacing.xl}px;
    justify-content: center;
    width: 100%;
  }
`;

const Container = styled(`div`)`
  @media (min-width: ${breakpoints.desktop}px) {
    display: flex;
    align-items: flex-start;
  }
`;

const Details = styled(`div`)`
  position: relative;

  @media (min-width: ${breakpoints.desktop}px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    desktopViewport: false
  };

  componentDidMount = () => {
    const mediaQueryToMatch = `(min-width: ${breakpoints.desktop}px)`;

    this.desktopMediaQuery = window.matchMedia(mediaQueryToMatch);
    this.desktopMediaQuery.addListener(this.updateViewPortState);

    this.setState({ desktopViewport: this.desktopMediaQuery.matches });
  };

  componentWillUnmount = () => {
    this.desktopMediaQuery.removeListener(this.updateViewPortState);
  };

  updateViewPortState = e => {
    this.setState({ desktopViewport: this.desktopMediaQuery.matches });
  };

  render() {
    const {
      product,
      product: { id, images, variants }
    } = this.props;

    const { desktopViewport, imageBrowserIsActive } = this.state;

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
                {!desktopViewport ? (
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
                  <BackToProductList to="/">
                    Back to Product List
                  </BackToProductList>
                  <ProductSpecs product={product} />
                  <ProductForm id={id} variants={variants} />
                </Details>
              </Container>
            </ProductPageRoot>

            <ProductImagesBrowser
              images={images}
              position={productImagesBrowserStatus}
              imageFeatured={productImageFeatured}
              toggle={toggleProductImagesBrowser}
              desktopViewport={desktopViewport}
            />
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
