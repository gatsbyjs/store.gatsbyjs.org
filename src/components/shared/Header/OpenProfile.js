import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'react-emotion';
import UserContext from '../../../context/UserContext';
import { colors, dropdown, spacing } from '../../../utils/styles';

const OpenProfile = styled('div')`
  ${dropdown.container};
  padding-bottom: 0;
  min-width: 200px;
`;

const Divider = styled('div')`
  ${dropdown.divider};
`;

const Item = styled(Link)`
  ${dropdown.item};
  text-decoration: none;
`;

const Heading = styled('h4')`
  color: ${colors.brand};
  font-size: 0.75rem;
  font-weight: normal;
  margin: 0 0 ${spacing.sm}px;
`;

export default () => (
  <UserContext.Consumer>
    {({ isProfileOpen, handleLogout, profile }) => {
      return (
        isProfileOpen && (
          <OpenProfile>
            <Heading>
              Logged in as <strong>@{profile.nickname}</strong>
              <br />
              <span
                className={css`
                  color: ${colors.lilac};
                `}
              >
                {profile.email}
              </span>
            </Heading>
            <Divider />
            <Item href="/account/dashboard">My Profile</Item>
            <Divider />
            <Item
              href="/"
              onClick={event => {
                event.preventDefault();
                handleLogout();
              }}
            >
              Log out
            </Item>
          </OpenProfile>
        )
      );
    }}
  </UserContext.Consumer>
);
