import React from 'react';
import styled from 'react-emotion';
import { colors, spacing } from '../../utils/styles';

const AddedToCartMessage = styled('div')`
  background: ${colors.brandLighter};
  border-bottom: 1px solid ${colors.brandLight};
  color: ${colors.brand};
  font-size: 0.875rem;
  margin: 0;
  margin-left: -${spacing.sm}px;
  margin-right: -${spacing.sm}px;
  padding: ${spacing.sm}px;
`;

const AddedToCartProductInfo = styled('p')`
  color: ${colors.lilac};
  font-size: 0.75rem;
  margin: 0;
`;

export default () => (
  <>
    <AddedToCartMessage>
      <strong>Excellent Choice!</strong>{' '}
      <span role="img" aria-label="sparkles">
        ✨
      </span>
      <AddedToCartProductInfo>
        Added 1x “Purple Logo Tee”:
      </AddedToCartProductInfo>
    </AddedToCartMessage>
  </>
);
