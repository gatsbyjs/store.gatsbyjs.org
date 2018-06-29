import React from 'react';
import styled from 'react-emotion';
import { button, colors, fonts } from '../../utils/styles';

const Form = styled('form')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 3rem;
  margin-top: 1rem;
`;

const Label = styled('label')`
  color: ${colors.textLight};
  font-family: ${fonts.heading};
  margin-top: 1rem;
  width: 100%;
`;

const InputLabel = styled(Label)`
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 0.2em;
  text-transform: uppercase;

  @media (min-width: 600px) {
    flex: 1 calc(50% - 0.5rem);
    max-width: calc(50% - 0.5rem);
  }
`;

const Input = styled('input')`
  border: 1px solid ${colors.textLight};
  border-radius: 3px;
  box-sizing: border-box;
  color: ${colors.text};
  display: block;
  font-size: 16px;
  padding: 0.5rem;
  width: 100%;
`;

const Checkbox = styled('input')`
  display: inline-block;
  margin-right: 0.25rem;
`;

const Button = styled('button')`
  ${button.default};
  ${button.big};
  ${button.purple};
  flex: 2 100%;
`;

const PrivacyNotice = styled('p')`
  color: ${colors.textLight};
  font-size: 0.875rem;
  text-align: center;
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
    return (
      <Form method="post" onSubmit={this.props.onSubmit(this.state)}>
        <InputLabel>
          First Name
          <Input
            type="text"
            name="first_name"
            value={this.state.first_name}
            onChange={this.onChange}
          />
        </InputLabel>
        <InputLabel>
          Email Address
          <Input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
        </InputLabel>
        <Label>
          <Checkbox
            type="checkbox"
            name="subscribe"
            checked={this.state.subscribe}
            onChange={this.onToggle}
          />
          Email me Gatsby updates and ideas for contributing.
        </Label>
        <Button type="submit">Claim Your Discount Code</Button>
        <PrivacyNotice>
          <strong>Privacy Notice:</strong> We will never contact you without
          your permission or share any of your personal information with third
          parties, because that would make us jerks.
        </PrivacyNotice>
      </Form>
    );
  }
}
