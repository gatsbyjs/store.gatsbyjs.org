import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import StoreContext from '../../context/StoreContext';
import {
  button,
  visuallyHidden,
  input,
  inputSmall,
  inputFocus,
  select,
  selectSmall,
  spacing
} from '../../utils/styles';

const Form = styled('form')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const labelStyles = css`
  ${visuallyHidden};
`;

const SizeLabel = styled('label')`
  ${labelStyles};
`;

const QuantityLabel = styled('label')`
  ${labelStyles};
`;

const inputStyles = css`
  ${input};
  margin-top: ${spacing.sm}px;
  width: 100%;

  :focus {
    ${inputFocus};
  }

  @media (min-width: 650px) {
    ${inputSmall};
  }
`;

const Size = styled('select')`
  ${inputStyles};
  ${select};

  flex: 2 70%;
  max-width: 70%;

  @media (min-width: 650px) {
    ${selectSmall};
  }
`;

const Quantity = styled('input')`
  ${inputStyles};

  flex: 1 calc(30% - ${spacing.xs}px);
  max-width: calc(30% - ${spacing.xs}px);
`;

const Button = styled('button')`
  ${button.default};
  ${button.small};
  ${button.purple};
`;

export default class AddToCart extends Component {
  state = {
    variant: '',
    quantity: 1
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = callback => event => {
    event.preventDefault();
    if (this.state.variant === '') {
      // TODO design a better way to show errors.
      alert('Please select a size first.');
      return;
    }

    if (this.state.quantity < 1) {
      alert('Please choose a quantity of 1 or more.');
      return;
    }

    callback(this.state.variant, this.state.quantity);
  };

  render() {
    const { variants } = this.props;

    return (
      <StoreContext.Consumer>
        {({ addVariantToCart }) => (
          <Form onSubmit={this.handleSubmit(addVariantToCart)}>
            <SizeLabel htmlFor="variant">Choose a size:</SizeLabel>
            <Size
              id="variant"
              className={inputStyles}
              value={this.state.variant}
              name="variant"
              onChange={this.handleChange}
            >
              <option disabled value="">
                Choose Size
              </option>
              {variants.map(variant => (
                <option value={variant.shopifyId} key={variant.shopifyId}>
                  {variant.title}
                </option>
              ))}
            </Size>
            <QuantityLabel htmlFor="quantity">Quantity:</QuantityLabel>
            <Quantity
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              step="1"
              onChange={this.handleChange}
              value={this.state.quantity}
            />
            <Button type="submit">Add to Cart</Button>
          </Form>
        )}
      </StoreContext.Consumer>
    );
  }
}
