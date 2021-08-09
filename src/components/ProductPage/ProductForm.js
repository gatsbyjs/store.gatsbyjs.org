import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { MdSentimentDissatisfied } from 'react-icons/md';
import {
  RiErrorWarningLine,
  RiShoppingCartFill,
  RiRulerLine
} from 'react-icons/ri';

import { Fieldset, Input, Label, Select, Submit } from '../shared/FormElements';
import {
  breakpoints,
  colors,
  dimensions,
  fontSizes,
  radius,
  spacing
} from '../../utils/styles';
import StoreContext from '../../context/StoreContext';
import Link from '../shared/Link';

const Form = styled(`form`)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spacing['2xl']} ${dimensions.gutter.default} 0;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: 0 ${dimensions.gutter.desktop} ${spacing['2xl']};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    justify-content: flex-start;
    padding-right: 0;
    padding-left: 0;
  }
`;

const Errors = styled(`div`)`
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: row;
  margin-bottom: ${spacing.xs};
  width: 100%;
`;

const ErrorSign = styled(`div`)`
  align-items: center;
  background: ${colors.error};
  border-radius: ${radius.lg}px 0 0 ${radius.lg}px;
  color: ${colors.lightest};
  display: flex;
  flex-basis: 40px;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ErrorMsgs = styled(`ul`)`
  border: 1px solid ${colors.error};
  border-left: none;
  border-radius: 0 ${radius.lg}px ${radius.lg}px 0;
  color: ${colors.error};
  flex-grow: 1;
  margin: 0;
  padding: ${spacing.xs};
  padding-left: ${spacing.xl};
`;

const QtyFieldset = styled(Fieldset)`
  flex-basis: 64px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: ${spacing.md};

  ${Label} {
    text-align: center;
  }

  ${Input} {
    text-align: center;
  }
`;

const SizeFieldset = styled(Fieldset)`
  flex-basis: calc(100% - ${spacing.md} - 70px);

  ${Label} {
    justify-content: space-between;
  }
`;

const InfoLinks = styled(`div`)`
  align-items: center;
  color: ${colors.textLight};
  display: flex;
  margin-top: ${spacing.lg};
  width: 100%;
  font-size: ${fontSizes.sm};
`;

const AddToCartButton = styled(Submit)`
  align-self: flex-end;
  flex-grow: 1;
  width: auto;
`;

class ProductForm extends Component {
  state = {
    variant:
      this.props.variants.length === 1
        ? this.props.variants[0].storefrontId
        : '',
    quantity: 1,
    errors: []
  };

  handleChange = event => {
    event.preventDefault();

    if (event.target.value) {
      const errors = this.state.errors;

      const errorIdx = errors.findIndex(
        error => error.field === event.target.name
      );

      errors.splice(errorIdx, 1);

      if (~errorIdx) {
        this.setState({ errors: errors });
      }
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = callback => event => {
    event.preventDefault();

    const errors = [];

    if (this.state.quantity < 1) {
      errors.push({
        field: 'quantity',
        msg: 'Choose a <b>quantity</b> of 1 or more.'
      });
    }

    if (this.state.variant === '' || this.state.variant === '.') {
      errors.push({
        field: 'variant',
        msg: 'Please select a <b>size</b>.'
      });
    }

    if (errors.length) {
      this.setState({ errors: errors });
      return;
    }

    callback(this.state.variant, this.state.quantity);
  };

  render() {
    const { variants } = this.props;
    const { errors } = this.state;

    const hasVariants = variants.length > 1;

    /*
     * For products without variants, we disable the whole Add to Cart button
     * and change the text. This flag prevents us from duplicating the logic in
     * multiple places.
     */
    const isOutOfStock = !hasVariants && !variants[0].availableForSale;

    return (
      <StoreContext.Consumer>
        {({ addVariantToCart }) => (
          <Form onSubmit={this.handleSubmit(addVariantToCart)} noValidate>
            <Errors show={errors.length}>
              <ErrorSign>
                <RiErrorWarningLine />
              </ErrorSign>
              <ErrorMsgs>
                {errors.map(error => (
                  <li
                    key={error.field}
                    dangerouslySetInnerHTML={{ __html: error.msg }}
                  />
                ))}
              </ErrorMsgs>
            </Errors>
            <QtyFieldset>
              <Label htmlFor="quantity">Qty.</Label>
              <Input
                type="number"
                inputmode="numeric"
                id="quantity"
                name="quantity"
                min="1"
                step="1"
                onChange={this.handleChange}
                value={this.state.quantity}
              />
            </QtyFieldset>
            {hasVariants && (
              <SizeFieldset>
                <Label htmlFor="variant">
                  Size/Color{' '}
                  <Link to="/product-details?fromProduct#size-chart">
                    <RiRulerLine />
                    <span>Size chart</span>
                  </Link>
                </Label>
                <Select
                  id="variant"
                  value={this.state.variant}
                  name="variant"
                  onChange={this.handleChange}
                >
                  <option disabled value="">
                    Choose Size/Color
                  </option>
                  {variants.map(variant => (
                    <option
                      disabled={!variant.availableForSale}
                      value={variant.storefrontId}
                      key={variant.storefrontId}
                    >
                      {variant.title}
                    </option>
                  ))}
                </Select>
              </SizeFieldset>
            )}
            <AddToCartButton
              type="submit"
              disabled={isOutOfStock}
              fullWidth={hasVariants}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              {isOutOfStock ? (
                <MdSentimentDissatisfied />
              ) : (
                <RiShoppingCartFill />
              )}
            </AddToCartButton>
            <InfoLinks>
              <Link to="/product-details?fromProduct#materials-fit">
                <span>Materials &amp; Fit</span>
              </Link>
              &nbsp; • &nbsp;
              <Link to="/product-details?fromProduct#care-instructions">
                <span>Care instructions</span>
              </Link>
            </InfoLinks>
          </Form>
        )}
      </StoreContext.Consumer>
    );
  }
}

ProductForm.propTypes = {
  id: PropTypes.string.isRequired,
  variants: PropTypes.array.isRequired
};

export default ProductForm;
