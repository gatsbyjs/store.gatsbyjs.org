import ApolloClient from 'apollo-boost';
import { getAccessToken } from '../utils/auth';

export const client = new ApolloClient({
  uri: `${process.env.GATSBY_API}/graphql`,
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${getAccessToken()}`
      }
    });
  }
});

export default {
  client
};
