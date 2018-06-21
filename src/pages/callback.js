import React from 'react';
import { push } from 'gatsby';
import { handleAuthentication } from '../utils/auth';

export default () => {
  handleAuthentication(() => push('/account/dashboard'));

  return <p>Logging you in...</p>;
};
