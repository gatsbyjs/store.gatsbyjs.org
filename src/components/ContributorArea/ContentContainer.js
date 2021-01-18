import React from 'react';
import styled from '@emotion/styled';

import UserContext from '../../context/UserContext';
import ContentForNotLoggedIn from './ContentForNotLoggedIn';
import ContentForLoggedIn from './ContentForLoggedIn';

import { breakpoints, spacing, dimensions } from '../../utils/styles';

const ContentContainerRoot = styled(`div`)`
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  padding: ${spacing.lg}px;

  @media (min-width: ${breakpoints.desktop}px) {
    padding: ${spacing.xl}px;
  }
`;

const ContentContainer = () => (
  <ContentContainerRoot>
    <UserContext.Consumer>
      {({
        contributor,
        error,
        handleLogout,
        loading,
        profile,
        profile: { nickname }
      }) =>
        nickname || loading ? (
          <ContentForLoggedIn
            contributor={contributor}
            error={error}
            handleLogout={handleLogout}
            loading={loading}
            profile={profile}
          />
        ) : (
          <>
            <ContentForNotLoggedIn />
          </>
        )
      }
    </UserContext.Consumer>
  </ContentContainerRoot>
);

export default ContentContainer;
