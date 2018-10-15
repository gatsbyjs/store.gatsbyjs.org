import React from 'react';
import { push } from 'gatsby';
import styled from 'react-emotion';
import { handleAuthentication } from '../utils/auth';
import { colors, fonts } from '../utils/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
  overflow: none;
`;

const Message = styled.h1`
  color: ${colors.darkest};
  font-family: ${fonts.heading};
`;

export default () => {
  handleAuthentication(() => push('/account/dashboard'));

  return (
    <Container>
      <Message>Logging you in...</Message>
    </Container>
  );
};
