import styled from "@emotion/styled"

import {
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
} from "../../utils/styles"

export const SectionHeading = styled(`h3`)`
  color: ${colors.text};
  font-family: ${fonts.body};
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.semibold};
  margin: 0;
`

export const Heading = styled(`h2`)`
  color: ${colors.text};
  font-family: ${fonts.heading};
  font-size: ${fontSizes.lg};
  line-height: ${lineHeights.dense};
  margin: 0;
  margin-top: ${spacing[`2xs`]};

  strong {
    color: ${colors.accent};
  }
`

export const Subheading = styled(Heading)`
  color: ${colors.text};
  font-size: ${fontSizes.lg};
`

export const Text = styled(`p`)`
  color: ${colors.text};
  font-size: ${fontSizes.md};
  line-height: ${lineHeights.default};
  margin-bottom: 0;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: ${fontSizes.sm};
  }

  a {
    color: ${colors.brand};
    text-decoration: none;
    border-bottom: 1px solid ${colors.brand};

    :hover {
      border-bottom-color: transparent;
    }
  }
`

export const Lede = styled(Text)`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
`
