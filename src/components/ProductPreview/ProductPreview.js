import React from 'react';
import styled from 'react-emotion';
import ProductImages from './ProductImages';
import AddToCart from './AddToCart';
import { fonts, colors } from '../../utils/styles';

const Preview = styled('div')`
  display: inline-block;
  margin-bottom: 3rem;
  width: 100%;

  @media (min-width: 480px) {
    margin-left: 6%;
    width: 47%;

    :nth-child(2n + 1) {
      margin-left: 0;
    }
  }

  @media (min-width: 650px) {
    margin-left: 5%;
    width: 30%;

    :nth-child(2n + 1) {
      margin-left: 5%;
    }

    :nth-child(3n + 1) {
      margin-left: 0;
    }
  }
`;

const Name = styled('h3')`
  color: ${colors.darkest};
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1rem 0 0;

  @media (min-width: 650px) {
    font-size: 1.25rem;
  }
`;

const Description = styled('p')`
  margin-top: 0.25rem;

  @media (min-width: 650px) {
    font-size: 0.875rem;
    min-height: 110px;
  }
`;

const Price = styled('p')`
  color: ${colors.darkest};
  font-family: ${fonts.heading};
  font-weight: 700;
  margin-bottom: 0;
`;

const removeCareInstructions = desc =>
  desc.split(/Care Instructions/).slice(0, 1);

export default ({ product }) => (
  <Preview>
    <ProductImages images={product.images} alt={product.title} />
    <Name>{product.title}</Name>
    <Description>{removeCareInstructions(product.description)}</Description>
    <Price>Price: ${product.variants[0].price}</Price>
    <AddToCart variants={product.variants} />
  </Preview>
);
