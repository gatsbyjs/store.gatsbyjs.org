import React from 'react';
import styled from 'react-emotion';
import { Link } from 'gatsby';
import UserContext from '../../../context/UserContext';
import { login } from '../../../utils/auth';
import { colors, button, fonts } from '../../../utils/styles';

const Profile = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 5px 8px;
`;

const AvatarLink = styled(Link)`
  display: block;
  text-decoration: none;
`;

const Avatar = styled('img')`
  border: 1px solid ${colors.brand}22;
  border-radius: 3px;
  box-sizing: border-box;
  display: block;
  height: 60px;
  width: 60px;
`;

const UserInfo = styled('div')`
  color: ${colors.textLight};
  font-family: ${fonts.heading};
  font-size: 0.75rem;
  margin-left: 8px;
`;

const Name = styled('strong')`
  color: ${colors.darkest};
  display: block;
`;

const NameLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Logout = styled('a')`
  ${button.default};
  margin-top: 5px;
`;

const Login = styled('a')`
  ${button.default};
  ${button.big};
`;

export default () => (
  <UserContext.Consumer>
    {({ profile, handleLogout }) => (
      <Profile>
        {profile.name ? (
          <>
            <AvatarLink to="/account/dashboard">
              <Avatar src={profile.picture} alt={profile.name} />
            </AvatarLink>
            <UserInfo>
              <Name>
                <NameLink to="/account/dashboard">{profile.name}</NameLink>
              </Name>
              @{profile.nickname}
              <Logout
                href="/"
                onClick={event => {
                  event.preventDefault();
                  handleLogout();
                }}
              >
                log out
              </Logout>
            </UserInfo>
          </>
        ) : (
          <UserInfo>
            <Login
              href="/login"
              onClick={event => {
                event.preventDefault();
                login();
              }}
            >
              log in
            </Login>
          </UserInfo>
        )}
      </Profile>
    )}
  </UserContext.Consumer>
);
