import React from 'react';
import { Heading, Text } from '../shared/Typography';
import styled from 'react-emotion';
import { colors } from '../../utils/styles';

const Error = styled('div')`
  background: rgba(255, 0, 0, 0.125);
  border: 1px solid rgba(255, 0, 0, 0.25);
  border-radius: 3px;
  padding: 1.5rem;
`;

const ErrorText = styled('pre')`
  background: ${colors.lightest};
  border: 1px solid rgba(255, 0, 0, 0.25);
  border-radius: 3px;
  box-shadow: inset 1px 1px 5px ${colors.textLight}40;
  padding: 0.75rem;
`;

export default ({ error }) => (
  <Error>
    <Heading>There was an error loading your discount code.</Heading>
    <Text>Here’s what came back from the server:</Text>
    <ErrorText>{error}</ErrorText>
    <Text>
      Please reload the page and try again. If a page refresh doesn’t clear
      things up, please{' '}
      <a href="https://github.com/gatsbyjs/store.gatsbyjs.org/issues">
        open an issue
      </a>{' '}
      and we’ll figure out what’s going on.
    </Text>
  </Error>
);
