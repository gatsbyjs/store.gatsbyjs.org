import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const ProductSpecsRoot = styled(`div`)`
  padding: 0 ${spacing.md}px;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: ${spacing['2xl']}px ${spacing.xl}px 0;
  }
`;

const Name = styled(`h1`)`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 1.8rem;
  font-weight: 500;
  margin: 0;
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
    color: ${colors.textLight};
  }
`;

const removeCareInstructions = desc =>
  desc.split(/Care Instructions/).slice(0, 1);

const ProductSpecs = props => {
  const {
    product: {
      title,
      description,
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
