import React from 'react';
import styled from '@emotion/styled';

import { animations, colors, fontSizes, spacing } from '../../utils/styles';
import Spinner from '../shared/Spinner';

const LoadingRoot = styled(`div`)`
  align-items: center;
  animation: ${animations.simpleEntry};
  color: ${colors.textLight};
  display: flex;
  flex-direction: column;
  font-size: ${fontSizes.lg};
  height: 70vh;
  justify-content: center;
`;

const Loading = () => (
  <LoadingRoot>
    <span css={{ marginBottom: spacing.lg }}>
      <Spinner />
    </span>
    Loading…
  </LoadingRoot>
);

export default Loading;
