import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'gatsby';

import { colors, fonts, radius, spacing } from '../../utils/styles';

export const Button = styled(`button`)`
  align-items: center;
  background: white;
  border-radius: ${radius.default}px;
  border: 1px solid ${colors.brand};
  color: ${colors.brand};
  cursor: pointer;
  font-family: ${fonts.heading};
  font-size: 1.1rem;
  justify-content: center;
  padding: 0.5em 1.2em;
  text-decoration: none;
  transition: 200ms background linear, 100ms border-color linear;

  span {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    transform: translateX(-${spacing['3xs']}px);
  }
`;

export const ButtonLink = Button.withComponent(Link);

export const PrimaryButton = styled(Button)`
  background: ${colors.brand};
  color: white;
`;
