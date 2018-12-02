import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';

import UserContext from '../../context/UserContext';

import { Button } from '../shared/Buttons';
import ContentForNotLoggedIn from './ContentForNotLoggedIn';
import ContentForLoggedIn from './ContentForLoggedIn';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing,
  dimensions
} from '../../utils/styles';

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

const ContentContainer = props => {
  return (
    <ContentContainerRoot>
      <UserContext.Consumer>
        {({ loading, profile: { nickname } }) =>
          nickname || loading ? (
            <ContentForLoggedIn />
          ) : (
            <ContentForNotLoggedIn />
          )
        }
      </UserContext.Consumer>
    </ContentContainerRoot>
  );
};

export default ContentContainer;
