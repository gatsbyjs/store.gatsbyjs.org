import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';

import { MdDoNotDisturbAlt } from 'react-icons/md';

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

const ContentForContributor = props => {
  return (
    <UserContext.Consumer>
      {({ contributor }) => {
        const {
          shopify: { codes }
        } = contributor;

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
              Thanks for going the extra mile to help build Gatsby! 💪
            </Text>
            <Text>{text}</Text>
            {codes.map(code => (
              <CodeBadgeBox key={code.code}>
                <CodeBadge>
                  <Name code={code.code}>
                    {`LEVEL ${badgeThemes[code.code].level} SWAG CODE`}
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
          </ContentForContributorRoot>
        );
      }}
    </UserContext.Consumer>
  );
};

export default ContentForContributor;
