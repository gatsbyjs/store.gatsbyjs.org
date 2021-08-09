import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(`span`)`
  animation: ${spin} 1s ease infinite;
  border: 0.125em solid
    ${props =>
      props.light ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.125)'};
  border-radius: 50%;
  border-top-color: ${props =>
    props.light ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.5)'};
  display: inline-block;
  height: 1em;
  width: 1em;
`;

export default Spinner;
