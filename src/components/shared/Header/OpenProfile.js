import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'react-emotion';
import UserContext from '../../../context/UserContext';
import { colors, dropdown } from '../../../utils/styles';

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
  ${dropdown.heading};
`;

const LinkItem = ({ to, onClick, children }) => (
  <Item to={to} onClick={onClick}>
    {children}
  </Item>
);

export default () => (
  <UserContext.Consumer>
    {({ isProfileOpen, handleLogout, profile, hideProfile }) =>
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
          <LinkItem onClick={hideProfile} to="/account/dashboard">
            My Profile
          </LinkItem>
          <Divider />
          <LinkItem
            to="/"
            onClick={event => {
              event.preventDefault();
              handleLogout();
            }}
          >
            Log out
          </LinkItem>
        </OpenProfile>
      )
    }
  </UserContext.Consumer>
);
