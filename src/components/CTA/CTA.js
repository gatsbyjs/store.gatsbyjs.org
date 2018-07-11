import React from 'react';
import styled from 'react-emotion';
import Butler from './Butler';
import ButlerHand from './ButlerHand';
import { colors, radius, spacing, breakpoints } from '../../utils/styles';

const CtaContainer = styled('div')`
  background: ${colors.brandLighter};
  border: 1px solid ${colors.brandLight};
  border-radius: ${radius.default};
  color: ${colors.brand};
  font-size: 0.875rem;
  position: relative;
  padding: ${spacing.md}px ${spacing.md}px ${spacing.md}px ${spacing.lg}px;
  margin: ${spacing.xl}px ${spacing.lg}px;
  max-width: 640px;

  @media (min-width: ${breakpoints.desktop}px) {
    margin-left: auto;
    margin-right: 94px;
    padding-right: 60px;
  }
`;

const ButlerContainer = styled('div')`
  left: -${spacing.md}px;
  position: absolute;
  top: -${spacing.lg}px;
`;

const ButlerHandContainer = styled('div')`
  left: 50%;
  position: absolute;
  top: -${spacing.lg}px;
  transform: translate(-50%);

  @media (min-width: ${breakpoints.mobile}px) {
    left: 65%;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    left: 95%;
    bottom: 0;

    :after {
      background: ${colors.brand};
      bottom: ${spacing.md}px;
      content: ' ';
      position: absolute;
      left: 4px;
      top: 20px;
      height: calc(100% - ${spacing.md}px - 3px);
      width: 8px;
      z-index: -1;
    }
  }
`;

export default () => (
  <CtaContainer>
    <ButlerContainer>
      <Butler />
    </ButlerContainer>
    <strong>Already contributed to Gatsby?</strong> Claim your personal coupon
    code and get <strong>free swag</strong> by logging in with your GitHub
    account above!
    <ButlerHandContainer>
      <ButlerHand />
    </ButlerHandContainer>
  </CtaContainer>
);
