import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(`span`)`
  animation: ${spin} 1s ease infinite;
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 0.125em solid
    ${props =>
      props.light ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 50%;
  border-top-color: ${props =>
    props.light ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.5)'};
`;

export default Spinner;
