import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import UserContext from '../../context/UserContext';
import { Button } from '../shared/Buttons';

import { colors, spacing, animations } from '../../utils/styles';

const LogoutBarRoot = styled(`div`)`
  align-items: flex-start;
  animation: ${animations.simpleEntry};
  display: flex;
  justify-content: space-between;
  margin-bottom: ${spacing.lg}px;
`;

const Info = styled(`div`)`
  color: ${colors.brandBright};
  font-size: 0.9rem;

  b {
    color: ${colors.lightest};
    display: block;
    font-size: 1.05rem;
  }
`;

const Logout = styled(Button)`
  flex-grow: 0;
  padding: ${spacing.xs}px ${spacing.sm}px;
`;

const LogoutBar = () => {
  return (
    <UserContext.Consumer>
      {({ error, loading, profile, handleLogout }) => {
        return !loading && !error ? (
          <LogoutBarRoot>
            <Info>
              Logged in as <b>@{profile.nickname}</b>
            </Info>
            <Logout onClick={handleLogout} inverse>
              Log out
            </Logout>
          </LogoutBarRoot>
        ) : null;
      }}
    </UserContext.Consumer>
  );
};

export default LogoutBar;
