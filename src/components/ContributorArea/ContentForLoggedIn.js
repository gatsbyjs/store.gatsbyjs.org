import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentForNotContributor from './ContentForNotContributor';
import ContentForContributorWithNoAccount from './ContentForContributorWithNoAccount';
import ContentForContributor from './ContentForContributor';
import Loading from './Loading';
import LogoutBar from './LogoutBar';
import Error from './Error';

const ContentFor = ({ contributor, error, loading, profile }) => {
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
    return <ContentForNotContributor profile={profile} />;
  }
};

const ContentForLoggedIn = ({
  contributor,
  error,
  handleLogout,
  loading,
  profile
}) => (
  <>
    <LogoutBar
      error={error}
      handleLogout={handleLogout}
      loading={loading}
      profile={profile}
    />
    <ContentFor
      error={error}
      contributor={contributor}
      handleLogout={handleLogout}
      loading={loading}
      profile={profile}
    />
  </>
);

ContentForLoggedIn.propTypes = {
  contributor: PropTypes.object,
  error: PropTypes.any,
  handleLogout: PropTypes.func,
  loading: PropTypes.bool,
  profile: PropTypes.object
};

export default ContentForLoggedIn;
