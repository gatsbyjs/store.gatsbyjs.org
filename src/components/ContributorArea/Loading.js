import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import Butler from '../../assets/Butler';
import { animations } from '../../utils/styles';

const LoadingRoot = styled(`div`)`
  align-items: center;
  animation: ${animations.simpleEntry};
  display: flex;
  flex-direction: column;
  height: 70vh;
  justify-content: center;
`;

const bounce = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  20% {
    transform: translateY(-50px) rotate(-140deg);
  }
  25% {
    transform: translateY(-55px) rotate(-180deg);
  }
  30% {
    transform: translateY(-50px) rotate(-220deg);
  }
  50% {
    transform: translateY(5px) rotate(-360deg);
  }
    55% {
    transform: translateY(0px) rotate(-360deg);
  }
  100% {
    transform: translateY(0) rotate(-360deg);
  }
`;

const ButlerBox = styled(`span`)`
  animation: ${bounce} 1s ease-in-out infinite;
  margin: 0 0 15px;

  svg {
    height: auto;
    width: 40px;
  }
`;

const Loading = () => (
  <LoadingRoot>
    <ButlerBox>
      <Butler />
    </ButlerBox>
    Loading...
  </LoadingRoot>
);

export default Loading;
