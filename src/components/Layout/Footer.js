import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import {
  breakpoints,
  colors,
  spacing,
  fontSizes,
  lineHeights
} from '../../utils/styles';

export const minHeight = '96px';

const FooterRoot = styled('footer')`
  align-items: center;
  color: ${colors.textLight};
  display: flex;
  flex-direction: column;
  font-size: ${fontSizes.sm};
  padding: ${spacing.xl}px;
  max-width: 1080px;
  margin: 0 auto;

  a {
    border-bottom: 1px solid ${colors.border};
    color: ${colors.textLight};
    text-decoration: none;

    :hover {
      border-color: ${colors.brand};
      color: ${colors.brand};
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    align-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 ${spacing.xl}px 0;
    min-height: ${minHeight};
  }
`;

const Row = styled(`span`)`
  display: inline-block;
  flex-shrink: 0;
  line-height: ${lineHeights.dense};
  padding-bottom: ${spacing['2xs']}px;
  text-align: center;

  @media (min-width: ${breakpoints.desktop}px) {
    /* padding-bottom: 0; */
  }
`;

const Spacer = styled(`span`)`
  display: none;

  @media (min-width: ${breakpoints.desktop}px) {
    display: inline-block;
    padding: 0 ${spacing.sm}px;
  }
`;

const Footer = () => (
  <FooterRoot>
    <Row>
      <b>Got questions?&nbsp;</b>
    </Row>
    <Row>
      Take a look at our{' '}
      <a href="https://github.com/gatsbyjs/store.gatsbyjs.org#frequently-asked-questions">
        FAQs
      </a>
      , talk to us on Twitter{' '}
      <a href="https://twitter.com/gatsbyjs">@gatsbyjs</a>
    </Row>
    <Row>
      &nbsp;or send an email to{' '}
      <a href="mailto:team@gatsbyjs.com">team@gatsbyjs.com</a>
    </Row>
    <Spacer>•</Spacer>
    <Row>
      Built with 💜 by the <a href="https://www.gatsbyjs.com/">Gatsby Team</a>{' '}
      and the Gatsby community
    </Row>
    <Spacer>•</Spacer>
    <Row>
      See the source code on{' '}
      <a href="https://github.com/gatsbyjs/store.gatsbyjs.org">GitHub</a>
    </Row>
  </FooterRoot>
);

export default Footer;
