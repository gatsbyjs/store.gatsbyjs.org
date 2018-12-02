import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import ProductImagesMobile from './ProductImagesMobile';
import ProductSpecs from './ProductSpecs';
import ProductForm from './ProductForm';
import BackLink from '../shared/BackLink';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const ProductPageRoot = styled('div')`
  @media (min-width: ${breakpoints.desktop}px) {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100%;
  }
`;

const Details = styled(`div`)`
  background: red;
  position: relative;

  @media (min-width: ${breakpoints.desktop}px) {
    max-width: 400px;
  }
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
      product: { images }
    } = this.props;

    const { desktopViewport } = this.state;

    return (
      <ProductPageRoot>
        {!desktopViewport ? (
          <ProductImagesMobile images={images} />
        ) : (
          <div>image</div>
        )}
        <Details>
          <BackLink to="/">Back to Product List</BackLink>
          <ProductSpecs product={product} />
          <ProductForm product={product} />
        </Details>
      </ProductPageRoot>
    );
  }
}

ProductPage.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductPage;
