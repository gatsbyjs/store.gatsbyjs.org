import React from 'react';
import styled from '@emotion/styled';
import { GoMarkGithub } from 'react-icons/go';

import { login } from '../../utils/auth';
import { Button as BaseButton } from '../shared/Buttons';
import { Heading, SectionHeading, Text } from './AreaTypography';
import { spacing, animations } from '../../utils/styles';

const ContentForGuestRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
  position: relative;
`;

const FirstHeading = styled(Heading)`
  padding-right: ${spacing.lg}px;
  margin-right: 15px;
`;

const Button = styled(BaseButton)`
  margin: ${spacing.lg}px 0 ${spacing.xl}px 0;
`;

const ContentForGuest = () => (
  <ContentForGuestRoot>
    <SectionHeading>For Existing Contributors</SectionHeading>
    <FirstHeading>
      Get Gatsby Swag for <strong>FREE!</strong>
    </FirstHeading>
    <Text>
      Already contributed to Gatsby? Claim your personal coupon code and get
      free swag by logging in with your GitHub account!
    </Text>
    <Button inverse onClick={e => login()}>
      Log in with GitHub <GoMarkGithub />
    </Button>
    <SectionHeading>For Future Contributors</SectionHeading>
    <Heading>Never contributed to Gatsby?</Heading>
    <Text>
      Let’s get you started with your first contribution to Gatsby! Once you’ve
      had your first pull request merged into Gatsby, you can come back here to
      claim free swag.
    </Text>

    <Button
      inverse
      href="https://github.com/search?o=desc&q=org%3Agatsbyjs+type%3Aissue+label%3A%22help%20wanted%22+is%3Aopen&s=updated&type=Issues"
    >
      Explore Open Issues
    </Button>
  </ContentForGuestRoot>
);

export default ContentForGuest;
