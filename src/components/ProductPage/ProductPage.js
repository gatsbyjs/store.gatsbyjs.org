import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

import ProductImagesMobile from "./ProductImagesMobile"
import ProductImagesDesktop from "./ProductImagesDesktop"
import ProductSpecs from "./ProductSpecs"
import ProductForm from "./ProductForm"
import BackLink from "./BackLink"

import { breakpoints, spacing, dimensions } from "../../utils/styles"
import { minHeight } from "../Layout/Footer"

const ProductPageRoot = styled(`div`)`
  // padding-bottom: ${spacing.md};

  @media (min-width: ${breakpoints.desktop}px) {
    display: flex;
    align-items: stretch;
    justify-content: space-evenly;
    width: 100%;
    min-height: calc(100vh - ${dimensions.headerHeight} - ${minHeight});
  }
`

const Container = styled(`div`)`
  @media (min-width: ${breakpoints.desktop}px) {
    display: flex;
    align-items: stretch;
    justify-content: space-evenly;
    width: 100%;
  }
`

const Details = styled(`div`)`
  position: relative;
  max-width: 40rem;
  margin: 0 auto ${spacing[`3xl`]};
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.desktop}px) {
    justify-content: center;
    max-width: 480px;
    min-height: 490px;
    margin: 0;
    padding: ${spacing[`2xl`]} ${dimensions.headerHeight} ${spacing[`2xl`]} 0;
  }
`

class ProductPage extends Component {
  componentDidMount() {
    const images = this.props.product.images
    this.props.setCurrentProductImages(images)
  }

  render() {
    const {
      product,
      product: { id, images, variants },
    } = this.props

    const {
      isDesktopViewport,
      productImageFeatured,
      toggleProductImagesBrowser,
    } = this.props

    return (
      <ProductPageRoot>
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
            <BackLink>Back to all products</BackLink>
            <ProductSpecs product={product} />
            <ProductForm id={id} variants={variants} />
          </Details>
        </Container>
      </ProductPageRoot>
    )
  }
}

ProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  productImagesBrowserStatus: PropTypes.string.isRequired,
  toggleProductImagesBrowser: PropTypes.func.isRequired,
  setCurrentProductImages: PropTypes.func.isRequired,
  productImageFeatured: PropTypes.object,
  isDesktopViewport: PropTypes.bool,
}

export default ProductPage
