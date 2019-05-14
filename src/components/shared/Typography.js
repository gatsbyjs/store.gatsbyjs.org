import styled from '@emotion/styled';

import { breakpoints, colors, spacing } from '../../utils/styles';

export const TextContainer = styled(`div`)`
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  padding: ${spacing.md}px;
  width: 100%;

  @media (min-width: ${breakpoints.desktop}px) {
    padding-bottom: 100px;
  }
`;

export const Heading = styled('h1')`
  color: ${colors.brandDark};
  font-size: 2.6rem;
  letter-spacing: -0.02em;
  margin: 0;
  margin-bottom: ${spacing.lg}px;
`;

export const Text = styled('p')`
  color: ${colors.text};
  font-size: 1rem;
  margin: 1rem 0 0;
`;

export const UnorderedList = styled('ul')`
  color: ${colors.text};
  margin: 1rem 0 0;
  padding-left: 2rem;

  li {
    margin: 0 0 0.25rem;
  }

  a {
    color: ${colors.text};
  }
`;
