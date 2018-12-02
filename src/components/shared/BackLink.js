import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'gatsby';

import { MdArrowBack } from 'react-icons/md';

import InterfaceContext from '../../context/InterfaceContext';
import { Button } from './Buttons';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const BackLinkRoot = styled(`div`)`
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 76%,
    rgba(255, 255, 255, 0.75) 76%,
    rgba(255, 255, 255, 0.75) 82%,
    rgba(255, 255, 255, 0.5) 82%,
    rgba(255, 255, 255, 0.5) 88%,
    rgba(255, 255, 255, 0.25) 88%,
    rgba(255, 255, 255, 0.25) 94%,
    rgba(255, 255, 255, 0) 94%,
    rgba(255, 255, 255, 0) 100%
  );
  bottom: 0;
  left: 0;
  padding: ${spacing.md}px;
  padding-top: ${spacing.lg}px;
  width: 100%;

  @media (min-width: ${breakpoints.desktop}px) {
    padding: 0 ${spacing.xl}px;
    position: relative;
  }
`;

const BackLink = props => {
  const { children, className, to, callback } = props;

  return (
    <BackLinkRoot className={className}>
      <Button to="/">
        <MdArrowBack /> {children}
      </Button>
    </BackLinkRoot>
  );
};

BackLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default BackLink;
