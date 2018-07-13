import React from 'react';
import styled from 'react-emotion';
import { Subheading, Text } from '../../shared/Typography';
import { colors, fonts, breakpoints, link } from '../../../utils/styles';

const About = styled('div')`
  position: relative;
`;

const Content = styled('div')`
  @media (min-width: ${breakpoints.hd}px) {
    padding-top: 4rem;
  }
`;

const Headline = styled('h1')`
  color: ${colors.brand};
  font-family: ${fonts.heading};

  @media (min-width: ${breakpoints.hd}px) {
    position: absolute;
    left: -240px;
    top: 0;
    width: 180px;
    font-size: 3rem;
    line-height: 1;
    margin-top: 0;
  }
`;

const Link = styled(`a`)`
  ${link};
`;

export default () => (
  <About>
    <Headline>About the Gatsby Store</Headline>
    <Content>
      <Text>
        The money we charge for swag helps to cover production and shipping
        costs. In the unlikely event that Gatsby swag ends up turning a profit,
        we'll reinvest that money into the open source community.
      </Text>
      <Subheading>Got more Questions?</Subheading>
      <Text>
        Talk to us on Twitter{' '}
        <Link href="https://twitter.com/gatsbyjs">@gatsbyjs</Link> or send an
        email to <Link href="mailto:team@gatsbyjs.com">team@gatsbyjs.com</Link>.
      </Text>
    </Content>
  </About>
);
