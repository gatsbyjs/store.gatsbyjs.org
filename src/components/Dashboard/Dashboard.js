import React from 'react';
import Helmet from 'react-helmet';
import Contributions from './Contributions';
import OpenIssues from './OpenIssues';

export default () => (
  <>
    <Helmet title="Maintainer Dashboard" />
    <Contributions />
    <OpenIssues />
  </>
);
