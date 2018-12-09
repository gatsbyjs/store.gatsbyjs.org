import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { MdInfoOutline, MdErrorOutline } from 'react-icons/md';

import { Fieldset, Input, Label, Select, Submit } from '../shared/FormElements';
import { PrimaryButton } from '../shared/Buttons';

import {
  breakpoints,
  colors,
  fonts,
  spacing,
  radius
} from '../../utils/styles';

import StoreContext from '../../context/StoreContext';
import Link from '../shared/Link';

const Form = styled(`form`)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: ${spacing['2xl']}px ${spacing.md}px 0;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: ${spacing['2xl']}px ${spacing.xl}px 0;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    justify-content: flex-start;
  }
`;

const Errors = styled(`div`)`
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: row;
  margin-bottom: ${spacing.xs}px;
  width: 100%;
`;

const ErrorSign = styled(`div`)`
  align-items: center;
  background: ${colors.error};
  border-radius: ${radius.default}px 0 0 ${radius.default}px;
  color: ${colors.lightest};
  display: flex;
  flex-basis: 40px;
  justify-content: center;

  svg {
    height: 20px;
    width: 20px;
  }
`;

const ErrorMsgs = styled(`ul`)`
  border: 1px dashed ${colors.error};
  border-left: none;
  border-radius: 0 ${radius.default}px ${radius.default}px 0;
  color: ${colors.error};
  flex-grow: 1;
  padding: ${spacing.xs}px;
  padding-left: ${spacing.xl}px;
  margin: 0;
`;

const QtyFieldset = styled(Fieldset)`
  flex-basis: 20%;
  flex-grow: 0;
  margin-right: ${spacing.md}px;

  ${Label} {
    text-align: center;
  }

  ${Input} {
    text-align: center;
  }
`;

const SizeFieldset = styled(Fieldset)`
  flex-basis: calc(80% - ${spacing.md}px);

  ${Label} {
    justify-content: space-between;
  }
`;

const CareLink = styled(Link)`
  margin-top: ${spacing.xl}px;
  float: right;
`;

const RestyledSubmit = styled(Submit)`
  align-self: flex-end;
  flex-grow: 1;
  height: ${props => (props.fullWidth ? 'auto' : '')};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

class ProductForm extends Component {
  state = {
    variant:
      this.props.variants.length === 1 ? this.props.variants[0].shopifyId : '',
    quantity: 1,
    errors: []
  };

  handleChange = event => {
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

    if (this.state.variant === '') {
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
    const { id: rawId, variants } = this.props;
    const { errors } = this.state;

    const id = rawId.substring(58, 64);
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
          <Form onSubmit={this.handleSubmit(addVariantToCart)}>
            <Errors show={errors.length}>
              <ErrorSign>
                <MdErrorOutline />
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
              <Label>Qty.</Label>
              <Input
                type="number"
                id={`quantity_${id}`}
                name="quantity"
                min="1"
                step="1"
                onChange={this.handleChange}
                value={this.state.quantity}
              />
            </QtyFieldset>
            {hasVariants && (
              <SizeFieldset>
                <Label>
                  Size{' '}
                  <Link to="/product-details">
                    <MdInfoOutline />
                    <span>Size Chart</span>
                  </Link>
                </Label>
                <Select
                  id={`variant_${id}`}
                  value={this.state.variant}
                  name="variant"
                  onChange={this.handleChange}
                >
                  <option disabled value="">
                    Choose Size
                  </option>
                  {variants.map(variant => (
                    <option
                      disabled={!variant.availableForSale}
                      value={variant.shopifyId}
                      key={variant.shopifyId}
                    >
                      {variant.title}
                    </option>
                  ))}
                </Select>
              </SizeFieldset>
            )}
            <RestyledSubmit
              type="submit"
              disabled={isOutOfStock}
              fullWidth={hasVariants}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </RestyledSubmit>
            <CareLink to="/product-details">
              <MdInfoOutline /> <span>Care instructions</span>
            </CareLink>
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