import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { PrimaryButton } from './Buttons';

import { colors, fonts, radius, spacing } from '../../utils/styles';

export const Input = styled(`input`)`
  background-color: ${colors.lightest};
  border: 1px solid ${colors.brandBright};
  border-radius: ${radius.default}px;
  color: ${colors.text};
  display: block;
  font-size: 1.1rem;
  padding: ${spacing.sm}px ${spacing.md}px;
  width: 100%;

  :focus {
    border-color: ${colors.lilac};
    box-shadow: 0 0 0 3px ${colors.brandBright};
    outline: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;

export const Select = styled(Input.withComponent('select'))`
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23${colors.lilac.substr(
    1
  )}' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 8px 10px;
  padding-right: ${spacing.xl}px !important;
`;

export const Fieldset = styled(`fieldset`)`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  border: none;
  flex-grow: 1;
`;

export const Label = styled(`label`)`
  color: ${colors.textLight};
  font-size: 1rem;
  padding: ${spacing.xs}px;
`;

export const Submit = styled(PrimaryButton.withComponent('button'))`
  width: 100%;
  margin-top: ${spacing.md}px;
`;
