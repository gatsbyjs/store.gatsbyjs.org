import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
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

const OpenIssuesList = ({ issues }) => (
  <OpenIssuesListRoot>
    {issues.map(issue => (
      <Issue key={issue.id}>
        <Link href={issue.url}>
          <MdArrowForward />
          {issue.title} <span>#{issue.url.split('/').pop()}</span>
        </Link>
      </Issue>
    ))}
  </OpenIssuesListRoot>
);

OpenIssuesList.propTypes = {
  issues: PropTypes.array.isRequired
};

export default OpenIssuesList;
