import React from 'react';
import styled from 'react-emotion';
import { colors } from '../../utils/styles';

const IssueList = styled('ul')`
  border-top: 1px solid ${colors.brandLight};
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
`;

const Issue = styled('li')`
  border-bottom: 1px solid ${colors.brandLight};
  margin: 0;
  padding: 0.5rem 0;
`;

const IssueLink = styled('a')`
  background-color: ${colors.lightest};
  color: ${colors.darkest};
  display: block;
  margin: 0 -0.5rem;
  padding: 0.5rem;
  text-decoration: none;
  transition: 200ms background-color linear;

  :active,
  :focus,
  :hover {
    background-color: ${colors.brandLight};
  }
`;

const Label = styled('a')`
  background-color: ${colors.brandLight};
  border: 1px solid ${colors.brand}20;
  border-radius: 1rem;
  box-sizing: border-box;
  color: ${colors.textLight};
  display: inline-block;
  font-size: 0.75rem;
  line-height: 1;
  margin: 0 0.5rem 0.5rem 0;
  padding: 0.25rem 1rem;
  text-decoration: none;
  transition: 200ms all linear;

  :active,
  :focus,
  :hover {
    background-color: ${colors.brand};
    color: ${colors.lightest};
  }
`;

export default ({ issues }) => (
  <IssueList>
    {issues.map(issue => (
      <Issue key={issue.id}>
        <IssueLink href={issue.html_url}>{issue.title}</IssueLink>
        {issue.labels.map(label => (
          <Label href={label.url} key={`${issue.id}-${label.id}`}>
            {label.name}
          </Label>
        ))}
      </Issue>
    ))}
  </IssueList>
);
