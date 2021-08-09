import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Button } from '../shared/Buttons';

import {
  colors,
  spacing,
  animations,
  fontSizes,
  radius
} from '../../utils/styles';

const LogoutBarRoot = styled(`div`)`
  align-items: flex-start;
  animation: ${animations.simpleEntry};
  display: flex;
  justify-content: space-between;
  margin-bottom: ${spacing.lg};
`;

const User = styled(`div`)`
  align-items: flex-start;
  display: flex;
`;

const Info = styled(`div`)`
  font-size: ${fontSizes.sm};

  b {
    display: block;
    font-size: ${fontSizes.md};
  }
`;

const Logout = styled(Button)`
  background: ${colors.lightest};
  color: ${colors.text};
  flex-grow: 0;
  padding: ${spacing.xs} ${spacing.sm};
`;

const AvatarContainer = styled('span')`
  display: block;
  margin-right: ${spacing.md};
  position: relative;

  :before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: ${radius.md}px;
    content: ' ';
  }
`;

const LogoutBar = ({ error, loading, profile, handleLogout }) =>
  !loading && !error ? (
    <LogoutBarRoot>
      <User>
        <AvatarContainer>
          <img
            css={{ display: 'block' }}
            src={profile.picture}
            height={spacing['3xl']}
            width={spacing['3xl']}
          />
        </AvatarContainer>
        <Info>
          Logged in as <b>@{profile.nickname}</b>
        </Info>
      </User>
      <Logout onClick={handleLogout}>Log out</Logout>
    </LogoutBarRoot>
  ) : null;

LogoutBar.propTypes = {
  error: PropTypes.any.isRequired,
  handleLogout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired
};

export default LogoutBar;
