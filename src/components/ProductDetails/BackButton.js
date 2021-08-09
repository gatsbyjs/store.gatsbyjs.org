import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { MdClose } from 'react-icons/md';

import { Button } from '../shared/Buttons';
import { visuallyHidden, dimensions } from '../../utils/styles';

const BackLinkRoot = styled(`div`)`
  padding: 0;
  position: sticky;
  float: right;
  margin-right: -80px;
  top: calc(${dimensions.headerHeight} + 40px);
`;

const BackToProduct = styled(Button)`
  background: transparent;
  border: 0;
  padding: 0;
  width: auto;
`;

const BackButton = ({ children, className }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const fromProduct = urlParams.has('fromProduct');

  if (!fromProduct) return null;

  return (
    <BackLinkRoot className={className}>
      <BackToProduct onClick={() => history.back()}>
        <MdClose style={{ height: '2rem', width: '2rem' }} />{' '}
        <span css={visuallyHidden}>{children}</span>
      </BackToProduct>
    </BackLinkRoot>
  );
};

BackButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default BackButton;
