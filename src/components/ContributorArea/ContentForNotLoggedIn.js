import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';

import { GoMarkGithub } from 'react-icons/go';

import Butler from '../../assets/Butler';
import { login } from '../../utils/auth';
import { Button as BaseButton } from '../shared/Buttons';
import { Heading, SectionHeading, SubHeading, Text } from './AreaTypography';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing,
  dimensions,
  animations
} from '../../utils/styles';

const ContentForGuestRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
`;

const delayedEntry = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform:  scale(1.5, 1.5);
  }
`;

const ButtlerBox = styled(`div`)`
  animation: ${delayedEntry} 0.25s 0.75s ease forwards;
  display: none;
  opacity: 0;
  position: absolute;
  right: -10px;
  top: 30px;
  transform: scale(0.5);
  transition: 0.2s;

  .closed & {
    display: none;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    display: block;
  }
`;

const Button = styled(BaseButton)`
  margin: ${spacing.lg}px 0 ${spacing.xl}px 0;
`;

const ContentForGuest = props => {
  return (
    <ContentForGuestRoot>
      <SectionHeading>For Existing Contributors</SectionHeading>

      <Heading>
        Get Gatsby Swag for <strong>!FREE!</strong>
      </Heading>
      <Text>
        Already contributed to Gatsby? Claim your personal coupon code and get
        free swag by logging in with your GitHub account!
      </Text>
      <Button inverse onClick={e => login()}>
        Log in with Github <GoMarkGithub />
      </Button>
      <SectionHeading>For Future Contributors</SectionHeading>
      <Heading>Never contributed to Gatsby?</Heading>
      <Text>
        Let’s get you started with your first contribution to Gatsby! Once
        you’ve had your first pull request merged into Gatsby, you can come back
        here to claim free swag.
      </Text>

      <Button
        inverse
        href="https://github.com/search?o=desc&q=org%3Agatsbyjs+type%3Aissue+label%3A%22status:%20help%20wanted%22+is%3Aopen&s=updated&type=Issues"
      >
        Explore Open Issues
      </Button>

      <ButtlerBox>
        <Butler />
      </ButtlerBox>
    </ContentForGuestRoot>
  );
};

export default ContentForGuest;
