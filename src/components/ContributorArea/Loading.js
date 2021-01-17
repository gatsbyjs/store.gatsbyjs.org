import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import { animations, colors } from '../../utils/styles';

const LoadingRoot = styled(`div`)`
  align-items: center;
  animation: ${animations.simpleEntry};
  display: flex;
  flex-direction: column;
  height: 70vh;
  justify-content: center;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(`span`)`
  animation: ${spin} 1s ease infinite;
  display: inline-block;
  width: 32px;
  height: 32px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${colors.accent};
  margin: 0 0 15px;
`;

const Loading = () => (
  <LoadingRoot>
    <Spinner />
    Loading...
  </LoadingRoot>
);

export default Loading;
