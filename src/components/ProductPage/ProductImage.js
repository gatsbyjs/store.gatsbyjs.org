import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import styled from 'react-emotion';

import { MdZoomIn } from 'react-icons/md';

import InterfaceContext from '../../context/InterfaceContext';

import { breakpoints, colors, radius, spacing } from '../../utils/styles';

const ProductImageRoot = styled(`div`)`
  position: relative;
  display: block;

  @media (min-width: ${breakpoints.desktop}px) {
    cursor: pointer;
  }
`;

const Helper = styled(`span`)`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0 ${radius.large}px 0;
  bottom: 0;
  display: flex;
  left: 0;
  padding: ${spacing['xs']}px;
  position: absolute;

  svg {
    fill: ${colors.brand};
    height: 24px;
    width: 24px;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    background: rgba(255, 255, 255, 0.5);
    border-radius: ${radius.large}px;
    bottom: auto;
    left: 50%;
    opacity: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.5s;

    svg {
      height: 40px;
      width: 40px;
    }

    ${ProductImageRoot}:hover & {
      opacity: 1;
    }
  }
`;

export const StyledImage = styled(Image)`
  border-radius: ${radius.large}px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
`;

class ProductImage extends Component {
  render() {
    const {
      image: {
        localFile: {
          childImageSharp: { fluid }
        }
      }
    } = this.props;

    return (
      <InterfaceContext.Consumer>
        {({ toggleProductImagesBrowser }) => (
          <ProductImageRoot onClick={toggleProductImagesBrowser}>
            <StyledImage fluid={fluid} alt="" />
            <Helper>
              <MdZoomIn />
            </Helper>
          </ProductImageRoot>
        )}
      </InterfaceContext.Consumer>
    );
  }
}

ProductImage.propTypes = {
  image: PropTypes.object.isRequired
};

export default ProductImage;
