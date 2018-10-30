import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import UserContext from '../../context/UserContext';
import DiscountCode from '../DiscountCode/DiscountCode';
import IssueList from './IssueList';
import { Heading, Subheading, Lede, Text } from '../shared/Typography';

const GET_CONTRIBUTIONS = gql`
  {
    contributorInformation(githubUsername: "jlengstorf") {
      totalContributions
      pullRequests {
        title
        url
        number
      }
    }
  }
`;

export default () => (
  <UserContext.Consumer>
    {({ contributions, loading, profile }) =>
      loading || contributions.count > 0 ? (
        <>
          <DiscountCode />
          <Subheading className={loading && 'loading'}>
            Your Most Recent Contribution
          </Subheading>
          <IssueList issues={contributions.issues.slice(0, 1)} />
          <Query query={GET_CONTRIBUTIONS}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              return (
                <ul>
                  {data.contributorInformation.pullRequests.map(pr => (
                    <li key={pr.url}>
                      <a href={pr.url}>
                        #{pr.number}: {pr.title}
                      </a>
                    </li>
                  ))}
                </ul>
              );
            }}
          </Query>
        </>
      ) : (
        <>
          <Heading>Hi, @{profile.nickname}!</Heading>
          <Lede>
            Let’s get you started with your first contribution to Gatsby!
          </Lede>
          <Text>
            This is your Gatsby Maintainer Dashboard. Once you’ve had your first
            pull request merged into Gatsby, you can come back here to{' '}
            <strong>claim free swag.</strong>
          </Text>
          <Text>
            If you have questions, ask on any issue (you can tag{' '}
            <a href="https://github.com/jlengstorf">@jlengstorf</a> if you’d
            like) or hit us up{' '}
            <a href="https://twitter.com">on Twitter at @gatsbyjs</a>.
          </Text>
          <Text>
            Check the list below for issues that we could use help with.
          </Text>
        </>
      )
    }
  </UserContext.Consumer>
);
