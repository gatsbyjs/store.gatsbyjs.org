import React from 'react';
import { navigateTo } from 'gatsby';
import { isAuthenticated, login } from '../utils/auth';

export default () => {
  if (!isAuthenticated()) {
    login();

    return <p>Redirecting you to the login screen...</p>;
  }

  navigateTo('/account/dashboard');
  return <p>Redirecting you to the dashboard...</p>;
};
