import React from 'react';
import styled from 'react-emotion';
import background from './bg.svg';
import { HeadingInverted } from '../shared/Typography';
import {
  colors,
  fonts,
  radius,
  spacing,
  breakpoints
} from '../../utils/styles';
import ButlerHand from '../../components/CTA/ButlerHand';

const DiscountCodeBox = styled('div')`
  background-color: ${colors.brandDarker};
  background-image: url(${background});
  background-position: 50% 90%;
  background-repeat: no-repeat;
  border: 1px solid ${colors.brand};
  border-radius: ${radius.large}px;
  padding: 2rem 1rem 1rem;
  text-align: center;
`;

const DiscountCode = styled('pre')`
  background-color: ${colors.lightest};
  border: 3px solid ${colors.accent};
  border-radius: 3px;
  box-shadow: inset 1px 1px 5px ${colors.textLight}40, 0 0 20px ${colors.accent};
  color: ${colors.text};
  font-family: ${fonts.monospace};
  letter-spacing: 0.075rem;
  line-height: 1;
  margin: ${spacing.lg}px 0;
  padding: ${spacing.sm}px;

  strong {
    font-weight: normal;
  }

  @media (min-width: ${breakpoints.phablet}px) {
    font-size: 1.5rem;
  }
`;

const DiscountCodeContainer = styled('div')`
  position: relative;
`;

const Description = styled('div')`
  color: ${colors.accent};
  font-weight: bold;
`;

const Note = styled('p')`
  color: ${colors.brandBright};
  display: block;
  font-size: 0.75rem;
  font-weight: normal;
  margin-left: auto !important;
  margin-right: auto !important;
  max-width: 400px;
`;

const ButlerHandContainer = styled('div')`
  position: absolute;
  left: -${spacing.sm - 1}px;
  top: 16%;
  transform: rotate(90deg);
`;

const ButlerHandContainerRight = styled(ButlerHandContainer)`
  left: auto;
  right: -${spacing.sm - 1}px;
  transform: rotate(-90deg) scale(-1, 1);
`;

export default ({ discount_code }) => (
  <DiscountCodeBox>
    <HeadingInverted>It’s time to claim your free Gatsby swag!</HeadingInverted>
    <DiscountCodeContainer>
      <ButlerHandContainer>
        <ButlerHand purple={colors.brandDark} />
      </ButlerHandContainer>
      <ButlerHandContainerRight>
        <ButlerHand purple={colors.brandDark} />
      </ButlerHandContainerRight>
      <DiscountCode>
        <strong>{discount_code}</strong>
      </DiscountCode>
    </DiscountCodeContainer>
    <Description>
      <p>Enter this discount code during checkout to receive your free swag!</p>
      <Note>
        <strong>NOTE:</strong> This discount code is only valid if you check out
        using the email address you entered in the form.
      </Note>
    </Description>
  </DiscountCodeBox>
);
