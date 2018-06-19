import styled from 'react-emotion';
import { colors, fonts } from '../../utils/styles';

export const Heading = styled('h2')`
  color: ${colors.darkest};
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  margin: 0;
`;

export const Subheading = styled('h3')`
  color: ${colors.darkest};
  font-family: ${fonts.heading};
  font-size: 1.125rem;
  margin: 1.5rem 0 0;
`;

export const Lede = styled('p')`
  color: ${colors.text};
  font-size: 1.125rem;
  margin: 0.5rem 0 0;
`;

export const Text = styled('p')`
  color: ${colors.text};
  font-size: 1rem;
  margin: 1rem 0 0;
`;

export const UnorderedList = styled('ul')`
  color: ${colors.text};
  margin: 1rem 0 0;

  li {
    margin: 0 0 0.25rem;
  }

  a {
    color: ${colors.text};
  }
`;
