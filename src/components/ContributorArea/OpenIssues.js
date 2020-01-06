import React from 'react';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import { Query } from 'react-apollo';
import { GoMarkGithub } from 'react-icons/go';

import { Subheading } from './AreaTypography';
import OpenIssuesList from './OpenIssuesList';
import { Button as BaseButton } from '../shared/Buttons';
import { spacing } from '../../utils/styles';

const OpenIssuesRoot = styled(`div`)`
  margin-top: ${spacing['2xl']}px;
`;

const Button = styled(BaseButton)`
  margin: ${spacing.lg}px 0 ${spacing.xl}px 0;
`;

const GitHubIssueFragment = gql`
  fragment GitHubIssueFragment on GitHubIssue {
    id
    title
    url
    number
    labels {
      name
      url
    }
  }
`;

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

const OpenIssues = () => (
  <Query query={GET_OPEN_ISSUES} variables={{ label: GITHUB_LABEL }}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      const issues = data.openIssues.issues
        .filter(filterClaimedIssues)
        .slice(0, 5);

      return (
        <OpenIssuesRoot>
          <Subheading>Issues We Could Use Your Help With</Subheading>
          <OpenIssuesList issues={issues} />
          <Button
            inverse
            href={`https://github.com/search?o=desc&q=org%3Agatsbyjs+type%3Aissue+label%3A%22${GITHUB_LABEL}%22+is%3Aopen&s=updated&type=Issues`}
          >
            See more issues on <GoMarkGithub />
          </Button>
        </OpenIssuesRoot>
      );
    }}
  </Query>
);

export default OpenIssues;
