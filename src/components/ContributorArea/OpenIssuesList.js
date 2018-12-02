import React from 'react';
import styled, { keyframes } from 'react-emotion';
import PropTypes from 'prop-types';

import { MdArrowForward } from 'react-icons/md';

import { colors, radius, spacing } from '../../utils/styles';

const OpenIssuesListRoot = styled('ul')`
  list-style: none;
  margin: 0;
  margin-top: ${spacing.lg}px;
  padding: 0;
`;

const Issue = styled('li')`
  margin: 0;
`;

const swing = keyframes`
  25% {
    transform: translateX(10%);
  }
  75% {
    transform: translateX(-10%);
  }
`;

const Link = styled('a')`
  border-radius: ${radius.large}px;
  color: ${colors.lightest};
  display: block;
  margin: 0 -${spacing.sm}px ${spacing.xs}px;
  padding: ${spacing.xs}px ${spacing.sm}px;
  text-decoration: none;
  transition: 1s;

  span {
    color: ${colors.lemon};
  }

  svg {
    color: ${colors.lemon};
    margin-right: ${spacing['2xs']}px;
    vertical-align: middle;
  }

  @media (hover: hover) {
    :hover {
      background: ${colors.brandDarker};

      svg {
        animation: ${swing} 0.5s ease infinite;
      }
    }
  }
`;

/*
const Label = styled('a')`
  border: 1px solid ${colors.brand};
  border-radius: ${radius.default}px;
  color: ${colors.brandLight};
  display: inline-block;
  font-size: 0.9rem;
  line-height: 1;
  margin: 0 ${spacing.xs}px ${spacing.xs}px 0;
  padding: ${spacing.xs}px;
  text-decoration: none;
  transition: 0.5s;

  @media (hover: hover) {
    :hover {
      border: 1px solid ${colors.brandBright};
      color: ${colors.lightest};
    }
  }
`;
*/

const formatLabelUrl = url => {
  const urlParts = url.split('/');
  const organization = urlParts[4];
  const repository = urlParts[5];
  const label = urlParts.slice(-1)[0];

  return `https://github.com/${organization}/${repository}/issues?q=is%3Aissue+is%3Aopen+label%3A%22${label}%22`;
};

const OpenIssuesList = ({ issues, isDesktopViewport }) => (
  <OpenIssuesListRoot>
    {issues.map(issue => (
      <Issue key={issue.id}>
        <Link href={issue.url}>
          <MdArrowForward />
          {issue.title} <span>#{issue.url.split('/').pop()}</span>
        </Link>
        {/* {issue.labels.map(({ url, name }) => (
          <Label href={formatLabelUrl(url)} key={`${issue.id}-${name}`}>
            {name}
          </Label>
        ))} */}
      </Issue>
    ))}
  </OpenIssuesListRoot>
);

OpenIssuesList.propTypes = {
  issues: PropTypes.array.isRequired
};

export default OpenIssuesList;
