import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';

import UserContext from '../../context/UserContext';
import Loading from './Loading';
import Error from './Error';
import CreateAccountForm from './CreateAccountForm';
import { Heading, Lede, Text } from './AreaTypography';
import { animations } from '../../utils/styles';

const CREATE_CONTRIBUTOR = gql`
  mutation($input: CreateContributorInput!) {
    createContributor(input: $input) {
      email
      github {
        username
        contributionCount
        pullRequests {
          id
        }
      }
      shopify {
        id
        codes {
          code
          used
        }
      }
    }
  }
`;

const ContentForContributorWithNoAccountRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
`;

const ContentForContributorWithNoAccount = () => (
  <UserContext.Consumer>
    {({ contributor, profile, updateContributor }) => (
      <ContentForContributorWithNoAccountRoot>
        <Mutation
          mutation={CREATE_CONTRIBUTOR}
          onCompleted={data => updateContributor(data.createContributor)}
        >
          {(createContributor, { loading, error, data }) => {
            if (error) return <Error error={error.message} />;
            if (loading) return <Loading />;

            return (
              <>
                <Heading>
                  You’re the best <strong>@{profile.nickname}</strong>!
                </Heading>
                <Lede>
                  You’ve made{' '}
                  <strong>{contributor.github.contributionCount}</strong>{' '}
                  contributions to Gatsby. 💪💜
                </Lede>
                <Text>
                  Thanks for making Gatsby great! As a token of our
                  appreciation, you are eligible to claim some free Gatsby swag!
                </Text>
                <CreateAccountForm
                  profile={profile}
                  onSubmit={userData => async e => {
                    e.preventDefault();
                    createContributor({
                      variables: {
                        input: {
                          githubUsername: userData.username,
                          email: userData.email,
                          firstName: userData.first_name,
                          acceptsMarketing: userData.subscribe
                        }
                      }
                    });
                  }}
                />
              </>
            );
          }}
        </Mutation>
      </ContentForContributorWithNoAccountRoot>
    )}
  </UserContext.Consumer>
);

export default ContentForContributorWithNoAccount;
