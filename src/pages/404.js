import React from 'react';
import { Heading, Text, TextContainer } from '../components/shared/Typography';

const NotFoundPage = () => (
  <TextContainer>
    <Heading>Whoops - That Page Doesn’t Exist (404)</Heading>
    <Text>
      Looks like the page you requested either doesn’t exist or has been moved.
      If you think this is an error or ended up at this page by following a
      link, please{' '}
      <a href="https://github.com/gatsbyjs/gatsby/issues/new">open an issue</a>{' '}
      to let us know.
    </Text>
  </TextContainer>
);

export default NotFoundPage;
