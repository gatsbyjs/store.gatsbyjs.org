import React from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { MdArrowBack } from 'react-icons/md';

import { Button } from '../shared/Buttons';

import { breakpoints, spacing } from '../../utils/styles';

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
  padding-top: ${spacing.xl}px;
  padding-left: 0px;
  position: sticky;
  top: 40px;
  width: 100%;
`;

const BackToProduct = styled(Button)`
  width: 100%;

  @media (min-width: ${breakpoints.desktop}px) {
    width: auto;
  }
`;

const goBack = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const fromProduct = urlParams.has('fromProduct');
  fromProduct ? history.back() : navigate('/');
};

const BackButton = ({ children, className }) => (
  <BackLinkRoot className={className}>
    <BackToProduct onClick={goBack}>
      <MdArrowBack /> {children}
    </BackToProduct>
  </BackLinkRoot>
);

BackButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default BackButton;
