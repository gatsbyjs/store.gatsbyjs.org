import React from 'react';
import { navigateTo } from 'gatsby';
import { handleAuthentication } from '../utils/auth';

export default () => {
  handleAuthentication(() => navigateTo('/'));

  return <p>Logging you in...</p>;
};
