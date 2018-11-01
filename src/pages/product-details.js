import React from 'react';
import Layout from '../components/shared/Layout';
import ProductDetails from '../components/ProductDetails/ProductDetails';

const ProductPage = ({ location }) => (
  <Layout location={location}>
    <ProductDetails />
  </Layout>
);

export default ProductPage;
