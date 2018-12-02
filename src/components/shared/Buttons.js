import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'gatsby';

import { radius, colors, fonts } from '../../utils/styles';

export const BaseButton = styled(Link)`
  align-items: center;
  background: white;
  border-radius: ${radius.default}px;
  border: 1px solid ${colors.brand};
  color: ${colors.brand};
  cursor: pointer;
  display: flex;
  font-family: ${fonts.heading};
  font-size: 1.1rem;
  justify-content: center;
  padding: 0.5em 1.2em;
  text-decoration: none;
  transition: 200ms background linear, 100ms border-color linear;
`;

export const PrimaryButton = styled(BaseButton)`
  background: ${colors.brand};
  color: white;
`;

export const SecondaryButton = styled(BaseButton)``;
