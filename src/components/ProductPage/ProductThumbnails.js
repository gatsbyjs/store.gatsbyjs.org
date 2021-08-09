import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';

import InterfaceContext from '../../context/InterfaceContext';
import { breakpoints, colors, radius, spacing } from '../../utils/styles';

const THUMBNAIL_SIZE = '44px';

const ProductThumbnailsRoot = styled(`div`)`
  height: ${THUMBNAIL_SIZE};
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  width: 100%;

  @media (min-width: ${breakpoints.desktop}px) {
    height: auto;
    overflow-x: hidden;
  }
`;

export const ProductThumbnailsContent = styled(`div`)`
  display: inline-flex;
  gap: ${spacing.md};
  height: 100%;
  padding-left: ${spacing.md};

  @media (min-width: ${breakpoints.desktop}px) {
    gap: ${spacing.lg};
    justify-content: center;
    min-width: 100%;
    padding: ${spacing.lg} 0;
  }
`;

export const Thumbnail = styled(`a`)`
  border-radius: ${radius.lg}px;
  background: ${colors.brandLight};
  height: ${THUMBNAIL_SIZE};
  width: ${THUMBNAIL_SIZE};
  overflow: hidden;

  @media (min-width: ${breakpoints.desktop}px) {
    cursor: pointer;
  }
`;

class ProductThumbnails extends Component {
  handleClick = (image, callback) => event => {
    event.preventDefault();

    callback(image);
  };

  render() {
    const { images, className = '' } = this.props;

    return (
      <InterfaceContext.Consumer>
        {({ featureProductImage }) => (
          <ProductThumbnailsRoot className={className}>
            <ProductThumbnailsContent>
              {images.map(image => {
                const { id, gatsbyImageData, altText, src } = image;

                return (
                  <Thumbnail
                    key={id}
                    onClick={this.handleClick(image, featureProductImage)}
                    href={src}
                  >
                    <GatsbyImage image={gatsbyImageData} alt={altText} />
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
