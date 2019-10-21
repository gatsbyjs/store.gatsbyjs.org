import React from 'react';
import { Heading, Text, TextContainer } from '../components/shared/Typography';

const NotFoundPage = () => (
  <TextContainer>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Heading>Whoops - That Page Doesn’t Exist (404)</Heading>
      <Text>
        Looks like the page you requested either doesn’t exist or has been
        moved. If you think this is an error or ended up at this page by
        following a link, please{' '}
        <a href="https://github.com/gatsbyjs/gatsby/issues/new">
          open an issue
        </a>{' '}
        to let us know.
      </Text>
      <Text>
        {' '}
        <a href="https://store.gatsbyjs.org/">Gatsby Store Home page</a>{' '}
        <a href="https://www.gatsbyjs.org/">Gatsby Home</a>{' '}
        <a href="https://github.com/gatsbyjs/store.gatsbyjs.org">
          Gatsby Github Page
        </a>{' '}
      </Text>
    </div>
  </TextContainer>
);

export default NotFoundPage;
