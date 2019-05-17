import React from 'react';
import styled from '@emotion/styled';

import { PrimaryButton } from '../shared/Buttons';
import {
  Fieldset as BaseFieldset,
  Input as BaseInput,
  Label as BaseLabel
} from '../shared/FormElements';
import { breakpoints, colors, spacing, radius } from '../../utils/styles';

const CreateAccountFormRoot = styled('form')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: ${spacing.lg}px 0;
`;

const Fieldset = styled(BaseFieldset)`
  margin-bottom: ${spacing.sm}px;

  @media (min-width: ${breakpoints.hd}px) {
    flex-basis: 65%;

    &:first-of-type {
      flex-basis: 35%;
      padding-right: ${spacing.sm}px;
    }
  }
`;

const Label = styled(BaseLabel)`
  color: ${colors.lightest};
`;

const Input = styled(BaseInput)`
  padding: ${spacing.xs}px ${spacing.sm}px;
`;

const CheckboxContainer = styled(Fieldset)`
  flex-basis: 100%;
  padding-left: 2rem;
  padding-top: ${spacing.sm}px;
`;

const CheckboxLabel = styled(BaseLabel)`
  color: ${colors.lightest};
  font-size: 0.9rem;
  padding: 0;
  position: relative;

  :before,
  :after {
    background-color: ${colors.lightest};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 50% 50%;
    border-radius: ${radius.default}px;
    content: '';
    display: block;
    height: 1.3rem;
    left: -2rem;
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: box-shadow 0.15s ease-in-out;
    user-select: none;
    width: 1.3rem;
  }
`;

const Checkbox = styled('input')`
  display: inline-block;
  margin-right: 0.25rem;
  opacity: 0;
  position: absolute;
  z-index: -1;

  &:focus ~ ${CheckboxLabel}:before {
    box-shadow: 0 0 0 3px ${colors.accent};
    outline: 0;
    outline-offset: 0px;
  }

  &:active ~ ${CheckboxLabel}:before {
    color: ${colors.brand};
  }

  &:checked ~ ${CheckboxLabel}:after {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23000' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E");
  }
`;

const Submit = styled(PrimaryButton)`
  margin-top: ${spacing.sm}px;
  width: 100%;
`;

const PrivacyNotice = styled('p')`
  color: ${colors.brandBright};
  font-size: 0.75rem;
`;

class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);

    const { name, email, nickname } = props.profile;

    this.state = {
      subscribe: true,
      first_name: name.split(' ')[0],
      username: nickname,
      email
    };
  }

  onChange = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onToggle = () => {
    this.setState(state => ({
      subscribe: !state.subscribe
    }));
  };

  render() {
    const { onSubmit } = this.props;

    return (
      <CreateAccountFormRoot method="post" onSubmit={onSubmit(this.state)}>
        <Fieldset>
          <Label htmlFor="first-name-input">First Name</Label>
          <Input
            id="first-name-input"
            type="text"
            name="first_name"
            value={this.state.first_name}
            onChange={this.onChange}
          />
        </Fieldset>

        <Fieldset>
          <Label htmlFor="email-input">Email Address</Label>
          <Input
            id="email-input"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
        </Fieldset>

        <CheckboxContainer onClick={this.onToggle}>
          <Checkbox
            type="checkbox"
            name="subscribe"
            checked={this.state.subscribe}
            onChange={this.onToggle}
            id="checkbox-newsletter"
          />
          <CheckboxLabel htmlFor="checkbox-newsletter">
            Email me Gatsby updates and ideas for contributing.
          </CheckboxLabel>
        </CheckboxContainer>
        <Submit type="submit">Claim Your Discount Code</Submit>
        <PrivacyNotice>
          <strong>Privacy Notice:</strong> We will never contact you without
          your permission or share any of your personal information with third
          parties, because that would make us jerks.
        </PrivacyNotice>
      </CreateAccountFormRoot>
    );
  }
}

export default CreateAccountForm;
