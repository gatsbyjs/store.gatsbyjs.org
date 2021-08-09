import React from 'react';
import styled from '@emotion/styled';

import { colors, radius, spacing, fontSizes } from '../../utils/styles';
import gift from '../../assets/gift.png';

const FreeBonusRoot = styled(`div`)`
  align-items: center;
  background: ${colors.brandLight};
  border-radius: ${radius.lg}px;
  display: flex;
  margin: ${spacing.sm} 0;
  padding: ${spacing.sm} ${spacing.md};

  p {
    margin: 0;
    color: ${colors.brand};
    font-size: ${fontSizes.sm};
  }

  img {
    width: 90px;
    height: auto;
    margin-left: ${spacing.xs};
  }
`;

const FreeBonus = () => (
  <FreeBonusRoot>
    <p>
      We will add the <strong>Gatsby Sticker Pack</strong> as a FREE bonus to
      your order!
    </p>

    <img src={gift} alt="Gift Icon" />
  </FreeBonusRoot>
);

export default FreeBonus;
