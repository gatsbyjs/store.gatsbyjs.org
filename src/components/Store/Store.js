import React from 'react';
import Disclaimer from './Disclaimer';
import ProductListings from './ProductListings';
import Modal from '../Modal/Modal';
import { Heading } from '../shared/Typography';

export default () => (
  <>
    <Heading>Get Gatsby Swag!</Heading>
    <Disclaimer />
    <ProductListings />
    <Modal />
  </>
);
