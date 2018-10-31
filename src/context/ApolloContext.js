import ApolloClient from 'apollo-boost';
import { getAccessToken } from '../utils/auth';

export const isBrowser = typeof window !== 'undefined';

export const client = isBrowser
  ? new ApolloClient({
      uri: `${process.env.GATSBY_API}/graphql`,
      request: operation => {
        operation.setContext({
          headers: {
            authorization: `Bearer ${getAccessToken()}`
          }
        });
      }
    })
  : {};
