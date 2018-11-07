import React from 'react';
import PropTypes from 'prop-types';
import { Router, navigate } from '@reach/router';
import { isAuthenticated, isBrowser } from '../../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (isBrowser && !isAuthenticated()) {
    // If we’re not logged in, redirect to the login page.
    navigate(`/login`);
    return null;
  }

  return (
    <Router>
      <Component {...rest} />
    </Router>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired
};

export default PrivateRoute;
