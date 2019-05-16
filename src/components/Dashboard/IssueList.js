import React from 'react';
import styled from '@emotion/styled';
import { colors, radius, spacing } from '../../utils/styles';
import gql from 'graphql-tag';

const IssueList = styled('ul')`
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
`;

const Issue = styled('li')`
  border-bottom: 1px solid ${colors.brandLight};
  margin: 0;
  padding: 0.5rem 0;

  :last-child:not(:first-of-type) {
    border-bottom: 0;
  }
`;

const IssueTitle = styled('span')`
  border-bottom: 1px solid ${colors.lightest};
  transition: 200ms border-color linear;
`;

const IssueId = styled('span')`
  color: ${colors.textLighter};
  transition: 200ms color linear;
`;

const IssueLink = styled('a')`
  background-color: ${colors.lightest};
  color: ${colors.darkest};
  display: block;
  padding: ${spacing.xs}px 0 ${spacing.sm}px;
  text-decoration: none;
  transition: 200ms color linear;

  :active,
  :focus,
  :hover {
    color: ${colors.brand};

    ${IssueTitle} {
      border-bottom-color: ${colors.brand};
    }

    ${IssueId} {
      color: ${colors.lilac};
    }
  }
`;

const Label = styled('a')`
  background-color: ${colors.brandLight};
  border: 1px solid ${colors.brandLight};
  border-radius: ${radius.default}px;
  box-sizing: border-box;
  color: ${colors.textLight};
  display: inline-block;
  font-size: 0.75rem;
  line-height: 1;
  margin: 0 ${spacing.xs}px ${spacing.xs}px 0;
  padding: ${spacing['2xs']}px ${spacing.xs}px;
  text-decoration: none;
  transition: 200ms all linear;

  :active,
  :focus,
  :hover {
    border-color: ${colors.lilac};
    color: ${colors.brand};
  }
`;

const formatLabelUrl = url => {
  const urlParts = url.split('/');
  const organization = urlParts[4];
  const repository = urlParts[5];
  const label = urlParts.slice(-1)[0];

  return `https://github.com/${organization}/${repository}/issues?q=is%3Aissue+is%3Aopen+label%3A%22${label}%22`;
};

export const GitHubIssueFragment = gql`
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

export default ({ issues }) => (
  <IssueList>
    {issues.map(issue => (
      <Issue key={issue.id}>
        <IssueLink href={issue.url}>
          <IssueTitle>{issue.title}</IssueTitle>{' '}
          <IssueId>#{issue.url.split('/').pop()}</IssueId>
        </IssueLink>
        {issue.labels.map(({ url, name }) => (
          <Label href={formatLabelUrl(url)} key={`${issue.id}-${url}`}>
            {name}
          </Label>
        ))}
      </Issue>
    ))}
  </IssueList>
);
