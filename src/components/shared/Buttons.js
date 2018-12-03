import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'gatsby';

import { radius, colors, fonts } from '../../utils/styles';

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
`;

export const ButtonLink = Button.withComponent(Link);

export const PrimaryButton = styled(Button)`
  background: ${colors.brand};
  color: white;
`;
