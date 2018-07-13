import React from 'react';
import Layout from '../components/shared/Layout';
import Store from '../components/Store/Store';

const IndexPage = ({ pageContext, location }) => (
  <Layout location={location}>
    <Store />
  </Layout>
);

export default IndexPage;
