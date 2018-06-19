import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import StoreContext from '../../context/StoreContext';
import { fonts, button, colors } from '../../utils/styles';

const Form = styled('form')`
  @media (min-width: 650px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const labelStyles = css`
  display: block;
  font-family: ${fonts.heading};
  font-size: 0.875rem;
  margin-top: 0.5rem;

  @media (min-width: 650px) {
    margin-top: 0.25rem;
  }
`;

const SizeLabel = styled('label')`
  ${labelStyles};

  @media (min-width: 650px) {
    flex: 2 60%;
    max-width: 60%;
  }
`;

const QuantityLabel = styled('label')`
  ${labelStyles};

  @media (min-width: 650px) {
    flex: 1 calc(40% - 1rem);
    max-width: calc(40% - 1rem);
  }
`;

const inputStyles = css`
  border: 1px solid ${colors.textLight};
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
  font-family: ${fonts.heading};
  font-size: 16px;
`;

const Size = styled('select')`
  width: 100%;
`;

const Quantity = styled('input')`
  ${inputStyles};
  padding: 0.1rem 0.5rem;
  width: 100%;
`;

const Button = styled('button')`
  ${button.default};
  ${button.big};
  ${button.purple};
`;

export default class AddToCart extends Component {
  state = {
    variant: '',
    quantity: 0
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = callback => event => {
    event.preventDefault();
    if (this.state.value === '') {
      alert('Please select a size first.');
      return;
    }

    console.log(this.state);
    callback(this.state.variant, this.state.quantity);
  };

  render() {
    const { variants } = this.props;

    return (
      <StoreContext.Consumer>
        {({ addVariantToCart }) => (
          <Form onSubmit={this.handleSubmit(addVariantToCart)}>
            <SizeLabel htmlFor="variant">
              Choose a size:
              <Size
                id="variant"
                className={inputStyles}
                value={this.state.variant}
                name="variant"
                onChange={this.handleChange}
              >
                <option disabled value="">
                  choose a size
                </option>
                {variants.map(variant => (
                  <option value={variant.shopifyId} key={variant.shopifyId}>
                    {variant.title}
                  </option>
                ))}
              </Size>
            </SizeLabel>
            <QuantityLabel htmlFor="quantity">
              Quantity:
              <Quantity
                type="number"
                id="quantity"
                name="quantity"
                onChange={this.handleChange}
                value={this.state.quantity}
              />
            </QuantityLabel>
            <Button type="submit">Add to Cart</Button>
          </Form>
        )}
      </StoreContext.Consumer>
    );
  }
}
