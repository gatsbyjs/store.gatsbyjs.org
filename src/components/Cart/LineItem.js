import React from 'react';
import styled, { css } from 'react-emotion';
import _ from 'lodash';
import ProductImage from './ProductImage';
import {
  colors,
  spacing,
  radius,
  input,
  visuallyHidden
} from '../../utils/styles';

const Item = styled('li')`
  align-items: center;
  border-bottom: 1px solid ${colors.brandLight};
  display: flex;
  margin: 0;
  margin-left: -${spacing.sm}px;
  margin-right: -${spacing.sm}px;
  padding: ${spacing.sm}px;

  :nth-child(2n + 2) {
    background-color: ${colors.brandLighter};
  }
`;

const Thumb = styled(ProductImage)`
  border-radius: ${radius.default}px;
  box-sizing: border-box;
  display: inline-block;
  height: 40px;
  margin: 0 ${spacing.sm}px 0 0;
  width: 40px;
`;

const ItemInfo = styled('p')`
  flex: 2 40%;
  margin: 0;
`;

const Name = styled('strong')`
  display: block;
  font-size: 0.875rem;
`;

const MetaData = styled('em')`
  color: ${colors.lilac};
  display: block;
  font-size: 0.75rem;
  font-style: normal;
`;

const inputStyles = css`
  ${input.default};
  width: 100%;

  :focus {
    ${input.focus};
  }

  @media (min-width: 650px) {
    ${input.small};
  }
`;

const labelStyles = css`
  ${visuallyHidden};
`;

const HiddenLabel = styled('label')`
  ${labelStyles};
`;

const Quantity = styled('input')`
  ${inputStyles};
  margin-right: ${spacing.xs}px;
  max-width: calc(20% - ${spacing.xs}px);
`;

const Remove = styled('a')`
  border-radius: 50%;
  color: ${colors.lilac};
  height: 20px;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  transition: all 0.15s ease-in-out;
  width: 20px;

  :hover {
    background: ${colors.brand};
    color: ${colors.brandLighter};
  }
`;

class LineItem extends React.Component {
  state = {
    quantity: this.props.item.quantity || 1
  };

  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;

    this.setState({ quantity: value });
    this.props.setCartLoading(true);
    this.debouncedUpdateQuantity(value);
  };

  debouncedUpdateQuantity = _.debounce(
    quantity => this.props.updateQuantity(quantity),
    500
  );

  removeHandler = event => {
    this.props.setCartLoading(true);
    this.props.handleRemove(event);
  };

  componentWillUnmount() {
    this.props.setCartLoading(false);
  }

  render() {
    const { item } = this.props;
    return (
      <Item>
        <Thumb
          id={item.variant.image.id}
          fallback={item.variant.image.src}
          alt={item.variant.image.altText}
        />
        <ItemInfo>
          <Name>{item.title}</Name>
          <MetaData>
            {item.variant.title}, ${item.variant.price}
          </MetaData>
        </ItemInfo>
        <HiddenLabel htmlFor={`quantity_${item.id.substring(58, 64)}`}>
          Quantity:
        </HiddenLabel>
        <Quantity
          id={`quantity_${item.id.substring(58, 64)}`}
          type="number"
          name="quantity"
          min="1"
          step="1"
          onChange={event => this.inputChangeHandler(event)}
          value={this.state.quantity}
        />
        <Remove
          href="#remove"
          title="Remove this item from your cart."
          onClick={this.removeHandler}
        >
          &times;
        </Remove>
      </Item>
    );
  }
}

export default LineItem;
