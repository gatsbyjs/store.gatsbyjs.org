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
  margin-top: ${spacing['2xl'] * 3}px;
  margin-bottom: ${spacing['2xl'] * 2}px;
`;

export default ({ displayAbout }) => (
  <FooterContainer>
    <Footer>
      {displayAbout && <About />}
      <LegalInfo>
        TKTK GDPR disclosure, credits, source, any other legal info
      </LegalInfo>
    </Footer>
  </FooterContainer>
);
