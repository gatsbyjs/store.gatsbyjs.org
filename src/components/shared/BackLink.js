import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'gatsby';

import { SecondaryButtonLink } from '../shared/ButtonLink';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const BackLinkRoot = styled(`div`)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${spacing.lg}px;

  @media (min-width: ${breakpoints.desktop}px) {
    position: absolute;
    top: 0;
    bottom: auto;
  }
`;

const BackLink = ({ to, children }) => {
  return (
    <BackLinkRoot>
      <SecondaryButtonLink to={to}>{children}</SecondaryButtonLink>
    </BackLinkRoot>
  );
};

BackLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default BackLink;
