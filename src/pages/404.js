import React from 'react';
import Layout from '../components/shared/Layout';
import { Heading, Text } from '../components/shared/Typography';

const NotFoundPage = () => (
  <Layout>
    <Heading>Whoops — That Page Doesn’t Exist (404)</Heading>
    <Text>
      Looks like the page you requested either doesn’t exist or has been moved.
      If you think this is an error or ended up at this page by following a
      link, please{' '}
      <a href="https://github.com/gatsbyjs/gatsby/issues/new">open an issue</a>{' '}
      to let us know.
    </Text>
  </Layout>
);

export default NotFoundPage;
