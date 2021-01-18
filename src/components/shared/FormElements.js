import styled from '@emotion/styled';

import { PrimaryButton } from './Buttons';
import {
  colors,
  radius,
  spacing,
  fontSizes,
  lineHeights
} from '../../utils/styles';

export const Input = styled(`input`)`
  background-color: ${colors.lightest};
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg}px;
  color: ${colors.text};
  display: block;
  font-size: ${fontSizes.md};
  line-height: ${lineHeights.solid};
  padding: ${spacing.md}px ${spacing.md}px;
  width: 100%;
  height: 52px; // hacky

  :focus {
    box-shadow: 0 0 0 3px ${colors.accent};
    outline: 0;
    transition: box-shadow 0.15s ease-in-out;
  }
`;

export const Select = styled(Input.withComponent('select'))`
  appearance: none;
  /* stylelint-disable */
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23${colors.text.substr(
    1
  )}' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
  /* stylelint-enable */
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 8px 10px;
  padding-right: ${spacing['2xl']}px !important;
`;

export const Fieldset = styled(`fieldset`)`
  border: none;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0;
  padding: 0;
`;

export const Label = styled(`label`)`
  color: ${colors.textLight};
  display: flex;
  font-size: ${fontSizes.md};
  padding: ${spacing.xs}px 0;
`;

export const Submit = styled(PrimaryButton)`
  font-size: 1.25rem;
  margin-top: ${spacing.md}px;
  width: 100%;
`;
