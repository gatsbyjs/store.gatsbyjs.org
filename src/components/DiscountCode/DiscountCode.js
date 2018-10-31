import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import UserContext from '../../context/UserContext';
import Form from './Form';
import Loading from './Loading';
import Display from './Display';
import Error from './Error';
import { Heading, Lede, Text } from '../shared/Typography';
import { GitHubIssueFragment } from '../Dashboard/IssueList';

const GET_CONTRIBUTOR_INFO = gql`
  query($user: String!) {
    contributorInformation(githubUsername: $user) {
      totalContributions
      pullRequests {
        ...GitHubIssueFragment
      }
    }
  }
  ${GitHubIssueFragment}
`;

const CREATE_DISCOUNT_CODE = gql`
  mutation(
    $githubUsername: String!
    $email: String!
    $firstName: String!
    $subscribe: Boolean!
  ) {
    discountCode(
      githubUsername: $githubUsername
      email: $email
      firstName: $firstName
      subscribe: $subscribe
    ) {
      discountCode
    }
  }
`;

export default () => (
  <UserContext.Consumer>
    {({ profile }) => {
      if (!profile || !profile.nickname) {
        return <Loading />;
      }

      return (
        <Query
          query={GET_CONTRIBUTOR_INFO}
          variables={{ user: profile.nickname }}
        >
          {({
            loading,
            error,
            data: { contributorInformation: info = {} } = {}
          }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error.message} />;

            // Show nothing if the user isn’t a contributor yet.
            if (info.totalContributions <= 0) return null;

            return (
              <React.Fragment>
                <Mutation mutation={CREATE_DISCOUNT_CODE}>
                  {(
                    createDiscountCode,
                    { loading: formSubmitting, error, data }
                  ) => {
                    if (error) return <Error error={error.message} />;

                    if (data && data.discountCode)
                      return (
                        <Display
                          discount_code={data.discountCode.discountCode}
                        />
                      );

                    return (
                      <React.Fragment>
                        <Heading className={loading && 'loading'}>
                          You're the best, @{profile.nickname}!
                        </Heading>
                        <Lede className={loading && 'loading'}>
                          You’ve made {info.totalContributions} contributions to
                          Gatsby. 💪💜
                        </Lede>
                        <Text className={loading && 'loading'}>
                          Thanks for making Gatsby great! As a token of our
                          appreciation, click the button below to get a discount
                          code good for one free item in the swag store.
                        </Text>
                        <Form
                          className={loading && 'loading'}
                          profile={profile}
                          onSubmit={userData => async e => {
                            e.preventDefault();
                            createDiscountCode({
                              variables: {
                                githubUsername: userData.username,
                                email: userData.email,
                                firstName: userData.first_name,
                                subscribe: userData.subscribe
                              }
                            });
                          }}
                          isDiscountRequestActive={formSubmitting}
                        />
                      </React.Fragment>
                    );
                  }}
                </Mutation>
              </React.Fragment>
            );
          }}
        </Query>
      );
    }}
  </UserContext.Consumer>
);
