import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import StoreContext from '../../context/StoreContext';
import {
  button,
  visuallyHidden,
  input,
  select,
  spacing
} from '../../utils/styles';

const Form = styled('form')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const labelStyles = css`
  ${visuallyHidden};
`;

const HiddenLabel = styled('label')`
  ${labelStyles};
`;

const VisibleLabel = styled('label')`
  margin-top: ${spacing.sm}px;
  font-size: 0.75rem;
`;

const inputStyles = css`
  ${input.default};
  margin-top: ${spacing.sm}px;
  width: 100%;

  :focus {
    ${input.focus};
  }

  @media (min-width: 650px) {
    ${input.small};
  }
`;

const Size = styled('select')`
  ${inputStyles};
  ${select.default};

  flex: 2 70%;
  max-width: 70%;

  @media (min-width: 650px) {
    ${select.small};
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
  constructor(props) {
    super(props);

    this.state = {
      variant: props.variants.length === 1 ? props.variants[0].shopifyId : '',
      quantity: 1
    };
  }

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
    const id = this.props.productId.substring(58, 64)

    return (
      <StoreContext.Consumer>
        {({ addVariantToCart }) => (
          <Form onSubmit={this.handleSubmit(addVariantToCart)}>
            {variants.length > 1 && (
              <>
                <HiddenLabel htmlFor={`variant_${id}`}>Choose a size:</HiddenLabel>
                <Size
                  id={`variant_${id}`}
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
                <HiddenLabel htmlFor="quantity">Quantity:</HiddenLabel>
              </>
            )}
            {variants.length <= 1 && (
              <VisibleLabel htmlFor={`quantity_${id}`}>Quantity:</VisibleLabel>
            )}
            <Quantity
              type="number"
              id={`quantity_${id}`}
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
