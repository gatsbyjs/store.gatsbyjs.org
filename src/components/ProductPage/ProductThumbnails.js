import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Image from 'gatsby-image';

import InterfaceContext from '../../context/InterfaceContext';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing
} from '../../utils/styles';

const THUMBNAIL_SIZE = '44px';

const ProductThumbnailsRoot = styled(`div`)`
  height: ${THUMBNAIL_SIZE};
  overflow-x: scroll;
  width: 100%;
  -webkit-overflow-scrolling: touch;

  @media (min-width: ${breakpoints.desktop}px) {
    height: auto;
    overflow-x: hidden;
  }
`;

export const ProductThumbnailsContent = styled(`div`)`
  display: inline-flex;
  height: 100%;
  padding-left: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    padding: ${spacing.lg}px 0;
    min-width: 100%;
    justify-content: center;
  }
`;

export const Thumbnail = styled(`div`)`
  border: 1px solid ${colors.brandBright};
  border-radius: ${radius.default}px;
  height: ${THUMBNAIL_SIZE};
  margin-right: ${spacing.md}px;
  width: ${THUMBNAIL_SIZE};

  @media (min-width: ${breakpoints.desktop}px) {
    cursor: pointer;
    margin-right: ${spacing.md}px;
  }
`;

class ProductThumbnails extends Component {
  handleClick = (image, callback) => event => {
    callback(image);
  };

  render() {
    const { images, className = '' } = this.props;

    return (
      <InterfaceContext.Consumer>
        {({ featureProductImage }) => (
          <ProductThumbnailsRoot className={className}>
            <ProductThumbnailsContent>
              {images.map((image, idx) => {
                const {
                  id,
                  localFile: {
                    childImageSharp: { fluid }
                  }
                } = image;

                return (
                  <Thumbnail
                    key={id}
                    onClick={this.handleClick(image, featureProductImage)}
                  >
                    <Image fluid={fluid} />
                  </Thumbnail>
                );
              })}
            </ProductThumbnailsContent>
          </ProductThumbnailsRoot>
        )}
      </InterfaceContext.Consumer>
    );
  }
}

ProductThumbnails.propTypes = {
  images: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default ProductThumbnails;
