import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';

import { MdLock } from 'react-icons/md';

import UserContext from '../../context/UserContext';
import { Heading, SectionHeading, SubHeading, Text } from './AreaTypography';

import {
  breakpoints,
  colors,
  badgeThemes,
  fonts,
  radius,
  spacing,
  dimensions,
  animations
} from '../../utils/styles';

const ContentForContributorRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
`;

const CodeBadgeBox = styled(`div`)`
  margin: ${spacing.xl}px 0;
  text-align: center;
`;

const CodeBadge = styled(`div`)`
  border-radius: ${radius.large}px;
  display: flex;
  flex-direction: column;
  font-family: ${fonts.heading};
  overflow: hidden;
`;

const Name = styled(`span`)`
  background: ${props =>
    badgeThemes[props.code]
      ? badgeThemes[props.code].backgroundTheme
      : colors.brand};
  color: ${props =>
    badgeThemes[props.code] ? badgeThemes[props.code].textTheme : colors.brand};
  font-size: 1.1rem;
  padding: ${spacing.xs}px;
`;

const Code = styled(`span`)`
  background: ${colors.lightest};
  color: ${colors.brand};
  font-size: 1.5rem;
  padding: ${spacing['2xs']}px;
`;

const Used = styled(`span`)`
  align-items: center;
  background: ${colors.brandDarker};
  color: ${colors.brandBright};
  display: flex;
  font-size: 1.1rem;
  justify-content: center;
  padding: ${spacing.xs}px;

  svg {
    color: red;
    margin-left: ${spacing.xs}px;
  }
`;

const Tip = styled(`p`)`
  color: ${colors.brandBright};
  font-size: 0.85rem;
  line-height: 1.2;
  margin: 0;
  padding-top: ${spacing.xs}px;
`;

const ProgressBarContainer = `
  border: 0;
  width: 100%;
  border-radius: 1rem;
  background-color: ${colors.brandDarker};
  height: 1.6rem;
`;

const ProgressIndicator = `
  border: 0;
  width: 100%;
  border-radius: 1rem 0 0 1rem;
  background-color: ${colors.lemon};
  transition: width 1s;
  background-image: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.1) 25%,
    transparent 25%,
    transparent 50%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.1) 75%,
    transparent 75%,
    transparent,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.1) 75%,
    transparent 75%,
    transparent
  );
`;

const ProgressBar = styled(`progress`)`
  ${ProgressBarContainer}

  ::-webkit-progress-bar {
    ${ProgressBarContainer}
  }

  ::-webkit-progress-value {
    ${ProgressIndicator}
  }

  ::-ms-fill {
    ${ProgressIndicator}
  }
  ::-moz-progress-bar {
    ${ProgressIndicator}
  }
  ::-webkit-progress-value {
    ${ProgressIndicator}
  }
`;

const LockIcon = styled(MdLock)`
  font-size: 2rem;
  padding-top: 0.4rem;
`;

const ContentForContributor = props => {
  return (
    <UserContext.Consumer>
      {({ contributor }) => {
        const {
          shopify: { codes },
          github: { contributionCount }
        } = contributor;

        const showLevelTwoIncentive =
          contributionCount >= 1 && contributionCount < 5;
        let contributionsToGo, percentToGo;
        if (showLevelTwoIncentive) {
          contributionsToGo = 5 - contributionCount;
          percentToGo = ((5 - contributionsToGo) / 5) * 100;
        }

        const numberOfCodes = codes.filter(code => code.used === false).length;
        let text;
        if (numberOfCodes > 1) {
          text = `Use these discount codes during checkout to claim some free swag!`;
        } else if (numberOfCodes == 1) {
          text = `Enter this discount code during checkout to claim your free swag!`;
        } else {
          text = `Looks like you've claimed your swag! Thanks again, and keep being awesome.`;
        }

        return (
          <ContentForContributorRoot>
            <Heading>Here you go!</Heading>
            <Text>
              Thanks for going the extra mile to help build Gatsby! 💪 You have
              made <strong>{contributionCount}</strong>{' '}
              {`contribution${contributionCount > 1 ? `s` : ``}`}!
            </Text>
            <Text>{text}</Text>
            {codes.map(code => (
              <CodeBadgeBox key={code.code}>
                <CodeBadge>
                  <Name code={code.code}>
                    {`Level ${badgeThemes[code.code].level} Swag Code`}
                  </Name>
                  {!code.used ? (
                    <Code>{code.code}</Code>
                  ) : (
                    <Used>Claimed! 🎉</Used>
                  )}
                </CodeBadge>
                {/* {!code.used && (
                  <Tip>
                    Click the badge to shop only items you can claim for free
                    using this code.
                  </Tip>
                )} */}
              </CodeBadgeBox>
            ))}
            {/* Show progress bar when Level 1 is earned, but Level 2 is not */}
            {showLevelTwoIncentive && (
              <>
                <CodeBadgeBox key={`HOLYBUCKETS`}>
                  <CodeBadge>
                    <Name code={`HOLYBUCKETS`}>{`Level 2 Swag Code`}</Name>
                    <Code>
                      <LockIcon />
                    </Code>
                  </CodeBadge>
                </CodeBadgeBox>
                <ProgressBar value={percentToGo} max="100" />
                <Text>{`Make ${contributionsToGo} more contribution${
                  contributionsToGo > 1 ? `s` : ``
                } to earn level 2 swag!`}</Text>
              </>
            )}
          </ContentForContributorRoot>
        );
      }}
    </UserContext.Consumer>
  );
};

export default ContentForContributor;
