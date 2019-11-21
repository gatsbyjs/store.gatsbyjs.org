import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Subheading, Text } from '../shared/Typography';
import IssueList, { GitHubIssueFragment } from './IssueList';

const GITHUB_LABEL = 'help wanted';
const GET_OPEN_ISSUES = gql`
  query($label: String!) {
    openIssues(label: $label) {
      totalIssues
      issues {
        ...GitHubIssueFragment
      }
    }
  }
  ${GitHubIssueFragment}
`;

const filterClaimedIssues = issue =>
  !issue.labels.map(label => label.name).includes('Hacktoberfest - Claimed');

export default () => (
  <Query query={GET_OPEN_ISSUES} variables={{ label: GITHUB_LABEL }}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      const issues = data.openIssues.issues
        .filter(filterClaimedIssues)
        .slice(0, 5);

      return (
        <React.Fragment>
          <Subheading>Issues We Could Use Your Help With</Subheading>
          <IssueList issues={issues} />
          <Text>
            <a
              href={`https://github.com/search?o=desc&q=org%3Agatsbyjs+type%3Aissue+label%3A%22${GITHUB_LABEL}%22+is%3Aopen&s=updated&type=Issues`}
            >
              See more issues tagged with “{GITHUB_LABEL}”
            </a>
          </Text>
        </React.Fragment>
      );
    }}
  </Query>
);
