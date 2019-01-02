import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';

import { GoMarkGithub } from 'react-icons/go';

import { login } from '../../utils/auth';
import { Button as BaseButton } from '../shared/Buttons';
import OpenIssues from './OpenIssues';
import LogoutBar from './LogoutBar';
import {
  Heading,
  Lede,
  SectionHeading,
  SubHeading,
  Text
} from './AreaTypography';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing,
  dimensions,
  animations
} from '../../utils/styles';

const ContentForNotContributorRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
`;

const Button = styled(BaseButton)`
  margin: ${spacing.lg}px 0 ${spacing.xl}px 0;
`;

class ContentForNotContributor extends Component {
  state = {
    issuesVisible: false
  };

  showIssuesList = () => {
    this.setState({
      issuesVisible: true
    });
  };

  render() {
    const { issuesVisible } = this.state;
    const {
      profile: { nickname }
    } = this.props;

    return (
      <ContentForNotContributorRoot>
        <Heading>Hi, @{nickname}!</Heading>
        <Lede>
          Let’s get you started with your first contribution to Gatsby!
        </Lede>
        <Text>
          Once you’ve had your first pull request merged into Gatsby, you can
          come back here to claim free swag.
        </Text>
        <Text>
          If you have questions, ask on any issue (you can tag{' '}
          <a href="https://github.com/jlengstorf">@jlengstorf</a> if you’d like)
          or hit us up{' '}
          <a href="https://twitter.com/gatsbyjs">on Twitter at @gatsbyjs</a>.
        </Text>

        {!issuesVisible ? (
          <>
            <Text>
              Click the button below for issues that we could use help with.
            </Text>
            <Button onClick={this.showIssuesList} inverse>
              Explore Open Issues
            </Button>
          </>
        ) : (
          <OpenIssues />
        )}
      </ContentForNotContributorRoot>
    );
  }
}

ContentForNotContributor.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ContentForNotContributor;
