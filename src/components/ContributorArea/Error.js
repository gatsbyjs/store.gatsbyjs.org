import React from 'react';
import { Heading, Text } from './AreaTypography';
import styled from '@emotion/styled';

import { MdSentimentDissatisfied } from 'react-icons/md';

import { animations, colors, spacing } from '../../utils/styles';

const ErrorRoot = styled('div')`
  animation: ${animations.simpleEntry};

  ${Heading} {
    svg {
      color: red;
      height: 30px;
      margin-right: ${spacing.xs}px;
      vertical-align: top;
      width: 30px;
    }
  }
`;

const ErrorText = styled('pre')`
  background: ${colors.lightest};
  border-radius: 3px;
  padding: ${spacing.sm}px ${spacing.md}px;

  pre {
    color: ${colors.text};
    font-size: 0.9rem;
    margin: 0;
    padding: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const Error = ({ error }) => (
  <ErrorRoot>
    <Heading>
      <MdSentimentDissatisfied />
      There was an error loading your discount code.
    </Heading>
    <Text>Here’s what came back from the server:</Text>
    <ErrorText>
      <pre>{error}</pre>
    </ErrorText>
    <Text>
      Please reload the page and try again. If a page refresh doesn’t clear
      things up, please{' '}
      <a href="https://github.com/gatsbyjs/store.gatsbyjs.org/issues">
        open an issue
      </a>{' '}
      and we’ll figure out what’s going on.
    </Text>
  </ErrorRoot>
);

export default Error;
