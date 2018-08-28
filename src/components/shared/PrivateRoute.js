import React from 'react';
import PropTypes from 'prop-types';
import { Router, navigate } from '@reach/router';
import { isAuthenticated, isBrowser } from '../../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (
    !isAuthenticated() &&
    isBrowser &&
    window.location.pathname !== `/login`
  ) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/app/login`);
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
