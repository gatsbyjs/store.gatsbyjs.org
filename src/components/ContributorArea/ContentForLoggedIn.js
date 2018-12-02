import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import styled from 'react-emotion';
import gql from 'graphql-tag';

import { GoMarkGithub } from 'react-icons/go';

import UserContext from '../../context/UserContext';
import ContentForNotContributor from './ContentForNotContributor';
import ContentForContributorWithNoAccount from './ContentForContributorWithNoAccount';
import ContentForContributor from './ContentForContributor';
import Loading from './Loading';
import LogoutBar from './LogoutBar';
import Error from './Error';
import { Button } from '../shared/Buttons';
import { Heading, SectionHeading, SubHeading, Text } from './AreaTypography';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing,
  dimensions
} from '../../utils/styles';

const ContentFor = ({ error, loading, contributor }) => {
  const { shopify, github } = contributor;

  if (error) {
    return <Error error={error} />;
  } else if (loading) {
    return <Loading />;
  } else if (github && github.contributionCount) {
    if (shopify && shopify.id) {
      return <ContentForContributor />;
    } else {
      return <ContentForContributorWithNoAccount />;
    }
  } else {
    return <ContentForNotContributor />;
  }
};

const ContentForLoggedIn = props => {
  return (
    <UserContext.Consumer>
      {({ error, loading, contributor }) => (
        <>
          <LogoutBar />
          <ContentFor
            contributor={contributor}
            error={error}
            loading={loading}
          />
        </>
      )}
    </UserContext.Consumer>
  );
};

export default ContentForLoggedIn;
