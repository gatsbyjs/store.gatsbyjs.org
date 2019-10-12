import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import UserContext from '../../context/UserContext';
import Butler from '../../assets/Butler';
import ContentForNotLoggedIn from './ContentForNotLoggedIn';
import ContentForLoggedIn from './ContentForLoggedIn';

import { breakpoints, colors, spacing, dimensions } from '../../utils/styles';

const ContentContainerRoot = styled(`div`)`
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  padding: ${spacing.lg}px;
  padding-bottom: calc(
    ${spacing.lg}px + ${dimensions.contributorAreaBarHeight}
  );

  @media (min-width: ${breakpoints.desktop}px) {
    padding: ${spacing.xl}px;
    padding-bottom: calc(
      ${spacing.xl}px + ${dimensions.contributorAreaBarHeight}
    );

    ::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${colors.brandDarker};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.lilac};
    }
    ::-webkit-scrollbar-track {
      background: ${colors.brand};
    }
  }
`;
const entry = keyframes`
   from {
     opacity: 0;
     transform: scale(0.5);
   }
   to {
     opacity: 1;
     transform:  scale(1);
   }
 `;

const ButlerBox = styled(`div`)`
  animation: ${entry} 0.25s ease forwards;
  display: none;
  opacity: 0;
  position: absolute;
  right: 15px;
  top: 35px;
  transform: scale(0.5);
  transition: 0.2s;

  @media (min-width: ${breakpoints.desktop}px) {
    right: -10px;
  }

  svg {
    transform: scale(-1.8, 1.8);
  }

  .open & {
    display: block;
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
            <ButlerBox>
              <Butler />
            </ButlerBox>
          </>
        )
      }
    </UserContext.Consumer>
  </ContentContainerRoot>
);

export default ContentContainer;
