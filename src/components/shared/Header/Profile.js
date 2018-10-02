import React from 'react';
import styled, { css } from 'react-emotion';
import { Link } from 'gatsby';
import { GoMarkGithub } from 'react-icons/go';
import ProfileToggle from './ProfileToggle';
import OpenProfile from './OpenProfile';
import UserContext from '../../../context/UserContext';
import { login } from '../../../utils/auth';
import { colors, button, fonts, radius, spacing } from '../../../utils/styles';

const Profile = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0;
  margin-left: ${spacing.md}px;
  min-width: 0;
  position: relative;
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
  height: 36px;
  width: 36px;
`;

const UserInfo = styled('div')`
  color: ${colors.textLight};
  font-family: ${fonts.heading};
  font-size: 0.75rem;
  margin-left: ${spacing.sm}px;
`;

const Name = styled('strong')`
  color: ${colors.brandDark};
  display: block;
  font-size: 0.875rem;
  margin-right: ${spacing.sm}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NameLink = styled(Link)`
  color: inherit;
  position: relative;
  text-decoration: none;

  &::focus {
    z-index: 1;
  }
`;

const Login = styled('a')`
  ${button.default};
  ${button.small};
`;

const Icon = styled(GoMarkGithub)`
  font-size: 1rem;
  margin-right: ${spacing.xs}px;
`;

export default () => (
  <UserContext.Consumer>
    {({ profile }) => (
      <Profile>
        {profile.name ? (
          <>
            <Name>
              <NameLink to="/account/dashboard"> @{profile.nickname}</NameLink>
            </Name>
            <AvatarLink to="/account/dashboard">
              <Avatar src={profile.picture} alt={profile.name} />
            </AvatarLink>
            <ProfileToggle />
            <OpenProfile />
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
              <Icon />
              Log in{' '}
              <span
                className={css`
                  display: none;
                  @media (min-width: 400px) {
                    display: inline;
                  }
                `}
              >
                with GitHub
              </span>
            </Login>
          </UserInfo>
        )}
      </Profile>
    )}
  </UserContext.Consumer>
);
