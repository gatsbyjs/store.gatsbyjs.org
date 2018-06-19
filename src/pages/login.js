import React from 'react';
import { push } from 'gatsby';
import { isAuthenticated, login } from '../utils/auth';

export default () => {
  if (!isAuthenticated()) {
    login();

    return <p>Redirecting you to the login screen...</p>;
  }

  push('/account/dashboard');
  return <p>Redirecting you to the dashboard...</p>;
};
