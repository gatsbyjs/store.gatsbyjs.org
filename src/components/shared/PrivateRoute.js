import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

// More info at https://reacttraining.com/react-router/web/example/auth-workflow
export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated() ? (
        // If we’re not logged in, redirect to the home page.
        <Redirect to={{ pathname: '/login' }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);
