import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import PropTypes from 'prop-types';
import { MdArrowForward } from 'react-icons/md';

import { colors, radius, spacing, transitions } from '../../utils/styles';

const OpenIssuesListRoot = styled('ul')`
  list-style: none;
  margin: 0;
  margin-top: ${spacing.lg};
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
  border-radius: ${radius.lg}px;
  color: ${colors.text};
  display: block;
  margin: 0 -${spacing.sm} ${spacing.xs};
  padding: ${spacing.xs} ${spacing.sm};
  text-decoration: none;
  transition: ${transitions.speed.slow};

  span {
    color: ${colors.accent};
  }

  svg {
    margin-right: ${spacing['2xs']};
    color: ${colors.accent};
    vertical-align: middle;
  }

  @media (hover: hover) {
    :hover {
      color: ${colors.lightest};
      background: ${colors.accent};

      svg {
        color: ${colors.lightest};
        animation: ${swing} ${transitions.speed.slow} ease infinite;
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
