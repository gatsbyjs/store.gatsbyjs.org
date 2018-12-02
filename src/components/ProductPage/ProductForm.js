import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { fonts, spacing, colors } from '../../utils/styles';

const ProductFormRoot = styled(`form`)`
  padding: 0 ${spacing.lg}px;
  display: flex;
  justify-content: space-between;
`;

const Fieldset = styled(`fieldset`)`
  display: flex;
  flex-direction: column;
  padding: 0;
  border: none;
  flex-grow: 1;

  :first-child {
    flex-basis: 50px;
    flex-shrink: 0;
    margin-right: 20px;
    flex-grow: 0;
  }
`;

const Input = styled(`input`)`
  width: 100%;
  border: 1px solid red;
  padding: 0.5em 1em;
`;

const ProductForm = props => {
  const {
    product: {
      title,
      description,
      variants,
      variants: [variant]
    }
  } = props;

  return (
    <ProductFormRoot>
      <Fieldset>
        <label>Qty.</label>
        <Input type="text" name="quantity" value="1" />
      </Fieldset>
      <Fieldset>
        <label>Size.</label>
        <Input type="text" name="size" value="1" />
      </Fieldset>
    </ProductFormRoot>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductForm;
