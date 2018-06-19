import React from 'react';
import styled from 'react-emotion';

const Footer = styled('footer')`
  color: #7e718a;
  font-size: 0.75rem;
  padding: 5px calc(50vw - 35ch);
  text-align: center;
`;

export default () => (
  <Footer>
    <p>TKTK GDPR disclosure, credits, source, any other legal info</p>
  </Footer>
);
