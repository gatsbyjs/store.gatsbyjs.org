import React from "react"
import styled from "@emotion/styled"
import {
  colors,
  radius,
  spacing,
  fontSizes,
  lineHeights,
} from "../../utils/styles"
import gql from "graphql-tag"

const IssueListRoot = styled(`ul`)`
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
`

const Issue = styled(`li`)`
  border-bottom: 1px solid ${colors.brandLight};
  margin: 0;
  padding: 0.5rem 0;

  :last-child:not(:first-of-type) {
    border-bottom: 0;
  }
`

const IssueTitle = styled(`span`)`
  border-bottom: 1px solid ${colors.lightest};
  transition: 200ms border-color linear;
`

const IssueId = styled(`span`)`
  color: ${colors.textLight};
  transition: 200ms color linear;
`

const IssueLink = styled(`a`)`
  background-color: ${colors.lightest};
  color: ${colors.text};
  display: block;
  padding: ${spacing.xs} 0 ${spacing.sm};
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
      color: ${colors.brand};
    }
  }
`

const Label = styled(`a`)`
  background-color: ${colors.brandLight};
  border: 1px solid ${colors.brandLight};
  border-radius: ${radius.md}px;
  box-sizing: border-box;
  color: ${colors.textLight};
  display: inline-block;
  font-size: ${fontSizes.xs};
  line-height: ${lineHeights.solid};
  margin: 0 ${spacing.xs} ${spacing.xs} 0;
  padding: ${spacing[`2xs`]} ${spacing.xs};
  text-decoration: none;
  transition: 200ms all linear;

  :active,
  :focus,
  :hover {
    color: ${colors.brand};
    border-color: ${colors.brand};
  }
`

const formatLabelUrl = (url) => {
  const urlParts = url.split(`/`)
  const organization = urlParts[4]
  const repository = urlParts[5]
  const label = urlParts.slice(-1)[0]

  return `https://github.com/${organization}/${repository}/issues?q=is%3Aissue+is%3Aopen+label%3A%22${label}%22`
}

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
`

const IssueList = ({ issues }) => (
  <IssueListRoot>
    {issues.map((issue) => (
      <Issue key={issue.id}>
        <IssueLink href={issue.url}>
          <IssueTitle>{issue.title}</IssueTitle>
          {` `}
          <IssueId>#{issue.url.split(`/`).pop()}</IssueId>
        </IssueLink>
        {issue.labels.map(({ url, name }) => (
          <Label href={formatLabelUrl(url)} key={`${issue.id}-${url}`}>
            {name}
          </Label>
        ))}
      </Issue>
    ))}
  </IssueListRoot>
)

export default IssueList
