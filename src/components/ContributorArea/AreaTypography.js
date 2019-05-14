import styled from '@emotion/styled';

import { colors, fonts, spacing } from '../../utils/styles';

export const SectionHeading = styled(`h3`)`
  color: ${colors.lightest};
  font-family: ${fonts.heading};
  font-size: 1rem;
  margin: 0;
`;

export const Heading = styled(`h2`)`
  color: ${colors.lemon};
  font-family: ${fonts.heading};
  font-size: 1.6rem;
  line-height: 1.2;
  margin: 0;
  margin-top: ${spacing.sm}px;

  strong {
    color: ${colors.lightest};
  }
`;

export const Subheading = styled(Heading)`
  color: ${colors.lightest};
  font-size: 1.4rem;
`;

export const Text = styled(`p`)`
  color: ${colors.lightest};
  line-height: 1.6;
  margin-bottom: 0;

  a {
    color: ${colors.lightest};
    font-weight: bold;

    :hover {
      color: ${colors.lemon};
    }
  }
`;

export const Lede = styled(Text)`
  font-size: 1.25rem;
  line-height: 1.4;
`;
