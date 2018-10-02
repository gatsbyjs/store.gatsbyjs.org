import React from 'react';
import styled, { css } from 'react-emotion';
import { MdArrowDropDown } from 'react-icons/md';
import { MdArrowDropUp } from 'react-icons/md';
import UserContext from '../../../context/UserContext';
import { button } from '../../../utils/styles';

const Button = styled('button')`
  ${button.default};
  ${button.ghost};
  ${button.small};
  width: 36px;
  padding-left: 0;
  padding-right: 0;

  &:hover,
  &:focus {
    // border-color: transparent;
  }
`;

const icon = css`
  font-size: 1rem;
`;

export default () => (
  <UserContext.Consumer>
    {({ toggleProfile, isProfileOpen }) => (
      <Button onClick={toggleProfile}>
        {isProfileOpen ? (
          <MdArrowDropUp className={icon} />
        ) : (
          <MdArrowDropDown className={icon} />
        )}
      </Button>
    )}
  </UserContext.Consumer>
);
