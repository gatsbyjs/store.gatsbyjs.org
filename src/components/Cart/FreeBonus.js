import React from 'react';
import styled from '@emotion/styled';

import { MdSentimentSatisfied } from 'react-icons/md';

import { colors, radius, spacing } from '../../utils/styles';
import gift from '../../assets/gift.png';

const FreeBonusRoot = styled(`div`)`
  align-items: center;
  background: ${colors.brandBright};
  border-radius: ${radius.default}px;
  display: flex;
  margin: ${spacing.sm}px 0;
  padding: ${spacing.sm}px ${spacing.md}px;

  p {
    color: ${colors.brandDark};
    font-size: 0.95rem;
    margin: 0;
  }

  img {
    height: auto;
    margin-left: ${spacing.xs}px;
    width: 90px;
  }
`;

const SmileIcon = styled(MdSentimentSatisfied)`
  color: ${colors.lilac};
  margin-right: ${spacing['2xs']}px;
  vertical-align: middle;
`;

const FreeBonus = () => (
  <FreeBonusRoot>
    <p>
      <SmileIcon />
      We will add the <strong>Gatsby Sticker Pack</strong> as a FREE bonus to
      your order!
    </p>

    <img src={gift} alt="Gift Icon" />
  </FreeBonusRoot>
);

export default FreeBonus;
