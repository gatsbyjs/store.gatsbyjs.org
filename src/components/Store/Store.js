import React from 'react';
import styled from 'react-emotion';
// import CallOut from './CallOut';
import ProductListings from './ProductListings';
import Modal from '../Modal/Modal';
import { pullHeadline, breakpoints } from '../../utils/styles';

const Headline = styled('h1')`
  ${pullHeadline};

  @media (min-width: ${breakpoints.hd}px) {
    padding-top: 80px;
  }
`;

export default () => (
  <>
    <Headline>Get Gatsby Swag!</Headline>
    {/* <CallOut /> */}
    <ProductListings />
    <Modal />
  </>
);
