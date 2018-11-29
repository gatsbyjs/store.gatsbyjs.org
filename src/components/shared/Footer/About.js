import React from 'react';
import styled from 'react-emotion';
import { Subheading, Text } from '../../shared/Typography';
import { colors, breakpoints, link, pullHeadline } from '../../../utils/styles';

const About = styled('div')`
  position: relative;
`;

const Content = styled('div')`
  @media (min-width: ${breakpoints.hd}px) {
    padding-top: 4rem;
  }
`;

const Headline = styled('h1')`
  ${pullHeadline};
  color: ${colors.brand};
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
        we’ll reinvest that money into the open source community.
      </Text>
      <Subheading>International Shipping</Subheading>
      <Text>
        International shipments can take 6 weeks or more to be delivered.
        Tracking updates may not always show up in real time on your tracking link.
        If you still have not received your order at the end of 6 weeks, please let us know
        by sending an email to <Link href="mailto:team@gatsbyjs.com">team@gatsbyjs.com</Link> and we will see how we can help!
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
