import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'gatsby';

import { SecondaryButton } from './Buttons';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const BackLinkRoot = styled(`div`)`
  background: linear-gradient(to top, #fff, #fff 80%, transparent);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${spacing.md}px;
  padding-top: ${spacing.lg}px;

  @media (min-width: ${breakpoints.desktop}px) {
    padding: 0 ${spacing.md}px;
    position: relative;

    ${SecondaryButton} {
      display: inline-flex;
    }
  }
`;

const BackLink = props => {
  const { to, children, relative = false } = props;

  return (
    <BackLinkRoot>
      <SecondaryButton to={to}>{children}</SecondaryButton>
    </BackLinkRoot>
  );
};

BackLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default BackLink;
