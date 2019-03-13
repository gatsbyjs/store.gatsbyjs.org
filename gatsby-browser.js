import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { client } from './src/context/ApolloContext';

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.object,
};
