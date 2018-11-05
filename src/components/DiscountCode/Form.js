import React from 'react';
import styled, { keyframes } from 'react-emotion';
import { button, colors, spacing, radius, input } from '../../utils/styles';

const loading = keyframes`
  from { transform: scale(0.001); opacity: 1; }
  to { transform: scale(1); opacity: 0; }
`;

const Form = styled('form')`
  background: ${colors.brandLighter};
  border-bottom: 1px solid ${colors.brandBright};
  border-top: 1px solid ${colors.brandBright};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: ${spacing.xl}px;
  margin-left: -${spacing.sm}px;
  margin-right: -${spacing.sm}px;
  margin-top: ${spacing.md}px;
  padding: ${spacing.sm}px;
  position: relative;

  @media (min-width: ${600 + spacing.sm * 2}px) {
    border: 1px solid ${colors.brandBright};
    border-radius: ${radius.default}px;
    margin-left: -${spacing.sm}px;
    margin-right: -${spacing.sm}px;
    margin-top: ${spacing.xl}px;
    padding-left: ${spacing.sm}px;
    padding-right: ${spacing.sm}px;
  }

  @media (min-width: ${600 + spacing.lg * 4}px) {
    margin-left: -${spacing.lg}px;
    margin-right: -${spacing.lg}px;
    padding-left: ${spacing.lg}px;
    padding-right: ${spacing.lg}px;
  }

  &.submitting {
    ::before {
      animation: ${loading} 1s linear infinite;
      border: 3px solid ${colors.lightest};
      border-radius: 50%;
      content: ' ';
      display: block;
      height: 5rem;
      left: calc(50% - 2.5rem);
      position: absolute;
      top: calc(50% - 2.5rem);
      width: 5rem;
      z-index: 10;
    }

    ::after {
      background-color: ${colors.textLight}80;
      border-radius: 3px;
      bottom: -0.5rem;
      content: ' ';
      cursor: default;
      left: -1rem;
      position: absolute;
      right: -1rem;
      top: -0.5rem;
      z-index: 1;
    }
  }
`;

const Label = styled('label')`
  color: ${colors.brand};
  display: block;
  font-size: 0.875rem;
  margin-top: 1rem;
  width: 100%;
`;

const InputLabel = styled(Label)`
  @media (min-width: 600px) {
    flex: 1 calc(50% - 0.5rem);
    max-width: calc(50% - 0.5rem);
  }
`;

const Input = styled('input')`
  ${input.default};
  margin-top: ${spacing.xs}px;
  width: 100%;

  :focus {
    ${input.focus};
  }
`;

const CheckboxContainer = styled('div')`
  position: relative;
  padding-left: 1.5rem;
`;

const CheckboxLabel = styled(Label)`
  position: relative;

  :before,
  :after {
    content: '';
    display: block;
    height: 1rem;
    left: -1.5rem;
    position: absolute;
    top: 0;
    transition: box-shadow 0.15s ease-in-out;
    width: 1rem;
  }

  :before {
    pointer-events: none;
    user-select: none;
    background-color: ${colors.brandBright};
    border-radius: ${radius.default}px;
  }

  :after {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
    border-radius: ${radius.default}px;
  }
`;

const Checkbox = styled('input')`
  display: inline-block;
  margin-right: 0.25rem;
  opacity: 0;
  position: absolute;
  z-index: -1;

  &:focus ~ ${CheckboxLabel}:before {
    box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem ${colors.brandBright};
    outline: 0;
    outline-offset: 0px;
  }

  &:active ~ ${CheckboxLabel}:before {
    color: ${colors.brand};
    background-color: ${colors.brand};
  }

  &:checked ~ ${CheckboxLabel}:after {
    background-color: ${colors.brand};
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E");
  }
`;

const Button = styled('button')`
  ${button.default};
  ${button.big};
  ${button.purple};
  margin-top: ${spacing.lg}px;
  margin-bottom: ${spacing.md}px;
  flex: 2 100%;

  :focus {
    ${input.focus};
  }
`;

const PrivacyNotice = styled('p')`
  color: ${colors.lilac};
  font-size: 0.75rem;
`;

export default class ContributorForm extends React.Component {
  constructor(props) {
    super(props);

    const { name, email, nickname } = props.profile;

    this.state = {
      subscribe: true,
      first_name: name.split(' ')[0],
      username: nickname,
      email
    };

    this.onChange = this.onChange.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onChange(event) {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onToggle() {
    this.setState(state => ({
      subscribe: !state.subscribe
    }));
  }

  render() {
    const { isDiscountRequestActive, onSubmit } = this.props;

    return (
      <Form
        method="post"
        className={isDiscountRequestActive && 'submitting'}
        onSubmit={onSubmit(this.state)}
      >
        <InputLabel>
          First Name
          <Input
            type="text"
            name="first_name"
            value={this.state.first_name}
            onChange={this.onChange}
            disabled={isDiscountRequestActive}
          />
        </InputLabel>
        <InputLabel>
          Email Address
          <Input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            disabled={isDiscountRequestActive}
          />
        </InputLabel>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            name="subscribe"
            checked={this.state.subscribe}
            onChange={this.onToggle}
            disabled={isDiscountRequestActive}
            id="checkbox-newsletter"
          />
          <CheckboxLabel htmlFor="checkbox-newsletter">
            Email me Gatsby updates and ideas for contributing.
          </CheckboxLabel>
        </CheckboxContainer>
        <Button type="submit" disabled={isDiscountRequestActive}>
          Claim Your Discount Code
        </Button>
        <PrivacyNotice>
          <strong>Privacy Notice:</strong> We will never contact you without
          your permission or share any of your personal information with third
          parties, because that would make us jerks.
        </PrivacyNotice>
      </Form>
    );
  }
}
