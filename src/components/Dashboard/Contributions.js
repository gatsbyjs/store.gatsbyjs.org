import React from 'react';
import UserContext from '../../context/UserContext';
import DiscountCode from '../DiscountCode/DiscountCode';
import IssueList from './IssueList';
import { Heading, Subheading, Lede, Text } from '../shared/Typography';

export default () => (
  <UserContext.Consumer>
    {({ contributions, loading, profile }) =>
      loading || contributions.count > 0 ? (
        <>
          <DiscountCode />
          <Subheading className={loading && 'loading'}>
            Your Most Recent Contribution
          </Subheading>
          <IssueList issues={contributions.issues.slice(0, 1)} />
        </>
      ) : (
        <>
          <Heading>Hi, @{profile.nickname}!</Heading>
          <Lede>
            Let’s get you started with your first contribution to Gatsby!
          </Lede>
          <Text>
            This is your Gatsby Maintainer Dashboard. Once you’ve had your first
            pull request merged into Gatsby, you can come back here to{' '}
            <strong>claim free swag.</strong>
          </Text>
          <Text>
            If you have questions, ask on any issue (you can tag{' '}
            <a href="https://github.com/orgs/gatsbyjs/teams/learning">@gatsbyjs/learning</a> if you’d
            like) or hit us up{' '}
            <a href="https://twitter.com/gatsbyjs">on Twitter at @gatsbyjs</a>.
          </Text>
          <Text>
            Check the list below for issues that we could use help with.
          </Text>
        </>
      )
    }
  </UserContext.Consumer>
);
