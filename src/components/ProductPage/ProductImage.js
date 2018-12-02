import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import styled from 'react-emotion';

import { radius } from '../../utils/styles';

export const StyledImage = styled(Image)`
  border-radius: ${radius.large}px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = props => {
  const {
    image: {
      localFile: {
        childImageSharp: { fluid }
      }
    }
  } = props;

  return <StyledImage fluid={fluid} alt="" />;
};

ProductImage.propTypes = {
  image: PropTypes.object.isRequired
};

export default ProductImage;
