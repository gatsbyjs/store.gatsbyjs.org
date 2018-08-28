import React from 'react';
import { Redirect } from '@reach/router';
import Layout from '../components/shared/Layout';
import Dashboard from '../components/Dashboard/Dashboard';
import PrivateRoute from '../components/shared/PrivateRoute';

export default ({ location }) => (
  <Layout location={location}>
    <Redirect from="/account" to="/account/dashboard" noThrow />
    <PrivateRoute path="/account/dashboard" component={Dashboard} />
  </Layout>
);
