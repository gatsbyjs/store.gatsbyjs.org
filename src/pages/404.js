import React from 'react';
import { Heading, Text, TextContainer } from '../components/shared/Typography';

const NotFoundPage = () => (
  <TextContainer>
    <Heading>Whoops! - This Page Doesn’t Exist (404)</Heading>
    <Text>
      Looks like the page you requested either doesn’t exist or has been moved.
      If you think this is an error or ended up at this page by following a
      link, please{' '}
      <a href="https://github.com/gatsbyjs/gatsby/issues/new">open an issue</a>{' '}
      to let us know.
      {"\n"}
      <a href="https://store.gatsbyjs.org">Home - Swag store</a>{"\n"}
 {"\n"}
      <a href="https://www.gatsbyjs.org">Home - Gatsby JS</a>{"\n"}
 {"\n"}
    Contribute to Gatsby JS on {' '} <a href="https://www.gatsbyjs.org">Github</a>{"\n"}
    </Text>

  </TextContainer>
);

export default NotFoundPage;
