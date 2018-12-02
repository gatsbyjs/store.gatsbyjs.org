import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { fonts, spacing, colors } from '../../utils/styles';

const ProductSpecsRoot = styled(`div`)`
  padding: 0 ${spacing.md}px;
`;

const Name = styled(`h1`)`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 1.8rem;
  font-weight: 500;
  margin: 0;
  margin-top: 1rem;
`;

const Description = styled(`p`)`
  color: ${colors.text};
  font-size: 1rem;
  line-height: 1.5;
`;

const Price = styled(`div`)`
  color: ${colors.brand};
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: -0.02em;

  span {
    color: ${colors.textLighter};
  }
`;

const removeCareInstructions = desc =>
  desc.split(/Care Instructions/).slice(0, 1);

const ProductSpecs = props => {
  const {
    product: {
      title,
      description,
      variants,
      variants: [variant]
    }
  } = props;

  const { price } = variant;

  return (
    <ProductSpecsRoot>
      <Name>{title}</Name>
      <Description>{removeCareInstructions(description)}</Description>
      <Price>
        <span>USD</span> ${price}
      </Price>
    </ProductSpecsRoot>
  );
};

ProductSpecs.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductSpecs;
