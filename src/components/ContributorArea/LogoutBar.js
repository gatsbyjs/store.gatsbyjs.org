import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

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

const LogoutBar = ({ error, loading, profile, handleLogout }) =>
  !loading && !error ? (
    <LogoutBarRoot>
      <Info>
        Logged in as <b>@{profile.nickname}</b>
      </Info>
      <Logout onClick={handleLogout} inverse>
        Log out
      </Logout>
    </LogoutBarRoot>
  ) : null;

LogoutBar.propTypes = {
  error: PropTypes.any.isRequired,
  handleLogout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired
};

export default LogoutBar;
