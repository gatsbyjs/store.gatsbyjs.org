import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'gatsby';

import { MdArrowBack } from 'react-icons/md';

import InterfaceContext from '../../context/InterfaceContext';
import { Button, ButtonLink } from './Buttons';

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
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: ${spacing.md}px;
  padding-top: ${spacing.lg}px;

  ${ButtonLink} {
    display: flex;
    width: 100%;
  }

  ${Button} {
    display: block;
    width: 100%;

    span {
      display: flex;
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    padding: 0 ${spacing.xl}px;
    position: relative;

    ${ButtonLink} {
      display: inline-flex;
      width: auto;
    }
  }
`;

const BackLink = props => {
  const { children, className, to, callback } = props;

  return (
    <InterfaceContext.Consumer>
      {({ productImagesBrowserIsOpen }) => (
        <BackLinkRoot className={className}>
          {to && (
            <ButtonLink
              to={to}
              tabIndex={productImagesBrowserIsOpen ? '-1' : '0'}
            >
              <MdArrowBack /> {children}
            </ButtonLink>
          )}
          {callback && (
            <Button
              onClick={callback}
              tabIndex={productImagesBrowserIsOpen ? '-1' : '0'}
            >
              <span>{children}</span>
            </Button>
          )}
        </BackLinkRoot>
      )}
    </InterfaceContext.Consumer>
  );
};

BackLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string,
  callback: PropTypes.func
};

export default BackLink;
