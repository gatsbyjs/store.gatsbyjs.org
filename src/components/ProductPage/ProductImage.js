import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { MdZoomIn } from 'react-icons/md';

import { breakpoints, colors, radius, spacing } from '../../utils/styles';

export const IMAGE_CHANGE_ANIM_DURATION = 250;

const change = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ProductImageLink = styled(`a`)`
  display: block;
  position: relative;

  &.change {
    animation: ${change} ${IMAGE_CHANGE_ANIM_DURATION}ms ease-out forwards;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    cursor: zoom-in;
  }
`;

const ZoomHelper = styled(`span`)`
  background: rgba(255, 255, 255, 0.5);
  border-radius: ${radius.large}px;
  display: flex;
  left: ${spacing['xs']}px;
  padding: ${spacing['xs']}px;
  position: absolute;
  top: ${spacing['xs']}px;

  svg {
    fill: ${colors.brand};
    height: 24px;
    width: 24px;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    display: none;
  }
`;

export const StyledImage = styled(Image)`
  border-radius: ${radius.large}px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
`;

class ProductImage extends Component {
  imageLink;

  componentDidUpdate = prevProps => {
    if (prevProps.image.id !== this.props.image.id) {
      this.imageLink.classList.add('change');

      setTimeout(
        () => this.imageLink.classList.remove('change'),
        IMAGE_CHANGE_ANIM_DURATION
      );
    }
  };

  handleClick = callback => event => {
    event.preventDefault();

    callback(this.props.image);
  };

  render() {
    const {
      image: {
        localFile: {
          childImageSharp: { fluid }
        }
      },
      onClick,
      imageFeatured = null
    } = this.props;

    return (
      <ProductImageLink
        ref={el => {
          this.imageLink = el;
        }}
        href={fluid.src}
        onClick={this.handleClick(onClick)}
      >
        <StyledImage fluid={imageFeatured ? featuredFluid : fluid} alt="" />
        <ZoomHelper>
          <MdZoomIn />
        </ZoomHelper>
      </ProductImageLink>
    );
  }
}

ProductImage.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  imageFeatured: PropTypes.object
};

export default ProductImage;
