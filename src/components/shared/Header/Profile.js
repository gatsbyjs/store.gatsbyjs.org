import React from 'react';
import styled, { css } from 'react-emotion';
import { Link } from 'gatsby';
import GithubIcon from 'react-icons/lib/go/mark-github';
import UserContext from '../../../context/UserContext';
import { login } from '../../../utils/auth';
import { colors, button, fonts, radius, spacing } from '../../../utils/styles';

const Profile = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: 0;
`;

const AvatarLink = styled(Link)`
  display: block;
  text-decoration: none;
`;

const Avatar = styled('img')`
  border: 2px solid ${colors.brandBright};
  border-radius: ${radius.default}px;
  box-sizing: border-box;
  display: block;
  height: 32px;
  width: 32px;
`;

const UserInfo = styled('div')`
  color: ${colors.textLight};
  font-family: ${fonts.heading};
  font-size: 0.75rem;
  margin-left: ${spacing.sm}px;
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
  ${button.small};
`;

const icon = css`
  font-size: 1rem;
  margin-right: ${spacing.xs}px;
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
              <GithubIcon className={icon} />
              Log in with GitHub
            </Login>
          </UserInfo>
        )}
      </Profile>
    )}
  </UserContext.Consumer>
);
