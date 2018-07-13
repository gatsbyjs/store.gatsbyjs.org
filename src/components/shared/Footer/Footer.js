import React from 'react';
import styled from 'react-emotion';
import About from './About';
import metaball from './metaball.svg';
import { colors, spacing } from '../../../utils/styles';

const FooterContainer = styled('footer')`
  background: url(${metaball});
  background-position: 50% 0;
  background-repeat: no-repeat;
  padding: ${spacing.sm}px;
`;

const Footer = styled('div')`
  max-width: 600px;
  margin: 0 auto;
`;

const LegalInfo = styled('p')`
  color: ${colors.lilac};
  font-size: 0.875rem;
  margin-top: ${spacing['2xl'] * 3}px;
  margin-bottom: ${spacing['2xl'] * 2}px;
`;

export default ({ displayAbout }) => (
  <FooterContainer>
    <Footer>
      {displayAbout && <About />}
      <LegalInfo>
        Built with{' '}
        <span role="img" aria-label="love">
          💜
        </span>{' '}
        by the <a href="https://www.gatsbyjs.com">Gatsby Inkteam</a> ·{' '}
        <a href="https://github.com/gatsbyjs/store.gatsbyjs.org">
          See the source code on GitHub
        </a>
      </LegalInfo>
    </Footer>
  </FooterContainer>
);
