import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'gatsby';

import { radius, colors, fonts } from '../../utils/styles';

export const BaseButtonLink = styled(Link)`
  align-items: center;
  border-radius: ${radius.default}px;
  display: flex;
  font-family: ${fonts.heading};
  font-size: 1.1rem;
  justify-content: center;
  padding: 0.6em 1.2em;
  text-decoration: none;
`;

export const PrimaryButtonLink = styled(BaseButtonLink)`
  background: blue;
`;

export const SecondaryButtonLink = styled(BaseButtonLink)`
  background: white;
  border: 1px solid ${colors.brand};
`;
