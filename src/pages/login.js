import React from 'react';
import styled from 'react-emotion';

import { isAuthenticated, login } from '../utils/auth';
import {
  TextContainer,
  Text as BaseText
} from '../components/shared/Typography';

const Text = styled(BaseText)`
  text-align: center;
`;

export default () => {
  if (!isAuthenticated()) {
    // login();

    return (
      <TextContainer>
        <Text>Redirecting you to the login screen...</Text>
      </TextContainer>
    );
  }
};
