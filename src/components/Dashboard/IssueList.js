import React from 'react';
import styled from 'react-emotion';
import { colors, radius, spacing } from '../../utils/styles';

const IssueList = styled('ul')`
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
`;

const Issue = styled('li')`
  border-bottom: 1px solid ${colors.brandLight};
  margin: 0;
  padding: 0.5rem 0;

  :last-child:not(:first-child) {
    border-bottom: 0;
  }
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
  transition: 200ms color linear;

  :active,
  :focus,
  :hover {
    color: ${colors.brand};

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

export default ({ issues }) => (
  <IssueList>
    {issues.map(issue => (
      <Issue key={issue.id}>
        <IssueLink href={issue.html_url}>
          {issue.title} <IssueId>#{issue.url.split('/').pop()}</IssueId>
        </IssueLink>
        {issue.labels.map(label => (
          <Label href={label.url} key={`${issue.id}-${label.id}`}>
            {label.name}
          </Label>
        ))}
      </Issue>
    ))}
  </IssueList>
);
