import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';

import { GoMarkGithub } from 'react-icons/go';

import UserContext from '../../context/UserContext';
import Butler from '../../assets/Butler';
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

const ButtlerBox = styled(`div`)`
  position: absolute;
  right: -12px;
  top: 30px;
  transform: scale(1.5, 1.5);
  transition: 0.2s;

  .closed & {
    display: none;
  }
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

    return (
      <UserContext.Consumer>
        {({ profile, handleLogout }) => (
          <ContentForNotContributorRoot>
            <Heading>Hi, @{profile.nickname}!</Heading>
            <Lede>
              Let’s get you started with your first contribution to Gatsby!
            </Lede>
            <Text>
              Once you’ve had your first pull request merged into Gatsby, you
              can come back here to claim free swag.
            </Text>
            <Text>
              If you have questions, ask on any issue (you can tag{' '}
              <a href="https://github.com/jlengstorf">@jlengstorf</a> if you’d
              like) or hit us up{' '}
              <a href="https://twitter.com/gatsbyjs">on Twitter at @gatsbyjs</a>
              .
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
        )}
      </UserContext.Consumer>
    );
  }
}

export default ContentForNotContributor;
