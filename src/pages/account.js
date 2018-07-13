import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import Dashboard from '../components/Dashboard/Dashboard';
import PrivateRoute from '../components/shared/PrivateRoute';

export default ({ location }) => (
  <Layout location={location}>
    <PrivateRoute path="/account/dashboard" component={Dashboard} />
    <Route
      exact
      path="/account"
      render={() => <Redirect to={{ pathname: '/account/dashboard' }} />}
    />
  </Layout>
);
