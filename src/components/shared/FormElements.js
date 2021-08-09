import styled from '@emotion/styled';

import { PrimaryButton } from './Buttons';
import {
  colors,
  dimensions,
  fontSizes,
  lineHeights,
  radius,
  spacing
} from '../../utils/styles';

export const Input = styled(`input`)`
  background-color: ${colors.lightest};
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg}px;
  color: ${colors.text};
  display: block;
  font-size: ${fontSizes.md};
  line-height: ${lineHeights.solid};
  padding: ${spacing.sm} ${spacing.md};
  min-height: ${dimensions.interactiveMinHeight};
  width: 100%;

  :focus {
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
  background-position: right ${spacing['md']} center;
  background-repeat: no-repeat;
  background-size: 8px 10px;
  padding-right: ${spacing['2xl']};
`;

export const Fieldset = styled(`fieldset`)`
  border: none;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0;
  padding: 0;
  justify-content: space-between;
`;

export const Label = styled(`label`)`
  display: flex;
  font-size: ${fontSizes.sm};
  padding: ${spacing.xs} 0;
`;

export const Submit = styled(PrimaryButton)`
  margin-top: ${spacing.md};
  width: 100%;
`;
