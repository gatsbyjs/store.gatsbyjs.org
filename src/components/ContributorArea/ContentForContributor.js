import React, { useState } from "react"
import styled from "@emotion/styled"

import { MdLock } from "react-icons/md"

import UserContext from "../../context/UserContext"
import { Heading, Text } from "./AreaTypography"

import { Button } from "../shared/Buttons"
import Notice from "../shared/Notice"

import {
  animations,
  badgeThemes,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  radius,
  spacing,
  transitions,
} from "../../utils/styles"

const ContentForContributorRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
`

const CodeBadgeBox = styled(`div`)`
  background: ${(props) =>
    badgeThemes[props.code]
      ? badgeThemes[props.code].backgroundTheme
      : colors.brand};
  /* stylelint-disable */
  // background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.8" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23d68810"><circle cx="25" cy="25" r="12.5"/><circle cx="75" cy="75" r="12.5"/><circle cx="75" cy="25" r="12.5"/><circle cx="25" cy="75" r="12.5"/></g></svg>');
  /* stylelint-enable */
  background-size: auto, auto;
  background-size: 13px, 100%;
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg}px;
  color: ${(props) =>
    badgeThemes[props.code]
      ? badgeThemes[props.code].textTheme
      : colors.lightest};
  margin: ${spacing.md} 0;
  padding: ${spacing.sm} 0;
  position: relative;
  text-align: center;

  :before {
    position: absolute;
    top: 0.25rem;
    left: -0.25rem;
    z-index: -5;
    width: 100%;
    height: 100%;
    background-size: 12px, 100%;
    background-size: auto, auto;
    border: 0.4rem solid ${colors.brand};
    border-radius: ${radius.lg}px;
    content: "";
  }
`

const CodeBadge = styled(`div`)`
  display: flex;
  flex-direction: column;
  font-family: ${fonts.heading};
  overflow: hidden;
`

const Name = styled(`span`)`
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.semibold};
`

const Code = styled(`span`)`
  font-size: ${fontSizes.md};
  padding: ${spacing[`2xs`]};
  font-family: ${fonts.monospace};
  font-weight: ${fontWeights.bold};
  letter-spacing: 1px;
`

const Used = styled(`span`)`
  align-items: center;
  display: flex;
  font-size: ${fontSizes.md};
  justify-content: center;
  padding: ${spacing.xs};
`

const CopyButton = styled(Button)`
  margin-bottom: ${spacing.sm};
  width: auto;
  flex-grow: 0;
  flex-shrink: 1;
  background: transparent;
  padding: 0;
  border: 0;
  color: inherit;
  font-size: ${fontSizes.sm};

  :hover {
    box-shadow: none;
  }
`

const ProgressBarContainer = `
  border: 0;
  border-radius: ${radius.lg}px;
  background: ${colors.lightest}33;
  height: ${spacing.xs};
`

const ProgressIndicator = `
  border: 0;
  width: 100%;
  border-radius: ${radius.lg}px 0 0 ${radius.lg}px;
  background-color: ${colors.lightest}99;
  transition: width ${transitions.speed.slow};
  background-image: linear-gradient(
    135deg,
    currentColor 25%,
    transparent 25%,
    transparent 50%,
    currentColor 50%,
    currentColor 75%,
    transparent 75%,
    transparent,
    currentColor 50%,
    currentColor 75%,
    transparent 75%,
    transparent
  );
`

const ProgressBar = styled(`progress`)`
  ${ProgressBarContainer} ::-webkit-progress-bar {
    ${ProgressBarContainer}
    background: ${(props) => (props.theme ? `${props.theme}33` : null)};
  }

  ::-webkit-progress-value {
    ${ProgressIndicator}
    background-color: ${(props) => (props.theme ? `${props.theme}99` : null)};
  }

  ::-ms-fill {
    ${ProgressIndicator}
    background-color: ${(props) => (props.theme ? `${props.theme}99` : null)};
  }

  ::-moz-progress-bar {
    ${ProgressIndicator}
    background-color: ${(props) => (props.theme ? `${props.theme}99` : null)};
  }
`

const LockIcon = styled(MdLock)`
  font-size: ${fontSizes.xl};
  padding-top: ${spacing.sm};
`

const Copy = ({ code }) => {
  const [copied, setCopied] = useState(false)

  const copyClick = () => {
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const input = document.createElement(`input`)

  input.setAttribute(`type`, `text`)
  input.value = code
  document.body.appendChild(input)
  input.select()
  document.execCommand(`copy`)
  document.body.removeChild(input)

  return (
    <CopyButton inverse={!copied} onClick={() => copyClick()}>
      {copied ? `Copied! 🎉` : `Copy Code`}
    </CopyButton>
  )
}

const ContentForContributor = () => (
  <UserContext.Consumer>
    {({ contributor }) => {
      const {
        shopify: { codes },
        github: { contributionCount },
      } = contributor

      const showLevelTwoIncentive =
        contributionCount >= 1 && contributionCount < 5
      let contributionsToGo
      let percentToGo
      if (showLevelTwoIncentive) {
        contributionsToGo = 5 - contributionCount
        percentToGo = ((5 - contributionsToGo) / 5) * 100
      }

      const numberOfCodes = codes.filter((code) => code.used === false).length
      let text
      if (numberOfCodes > 1) {
        text = `Use these discount codes during checkout to claim some free swag:`
      } else if (numberOfCodes == 1) {
        text = `Enter this discount code during checkout to claim your free swag:`
      } else {
        text = `Looks like you've claimed your swag! Thanks again, and keep being awesome.`
      }

      return (
        <ContentForContributorRoot>
          <Heading>Here you go!</Heading>
          <Text>
            Thanks for going the extra mile to help build Gatsby. You have made
            {` `}
            <strong>{contributionCount}</strong>
            {` `}
            {`contribution${contributionCount > 1 ? `s` : ``}`}!
          </Text>
          <Text>{text}</Text>
          {codes.map((code) => (
            <CodeBadgeBox key={code.code} code={code.code}>
              <CodeBadge>
                <Name code={code.code}>
                  {`Level ${badgeThemes[code.code].level} Swag Code`}
                </Name>
                {!code.used ? (
                  <>
                    <Code id={`level-${badgeThemes[code.code].level}`}>
                      {code.code}
                    </Code>
                    <Copy code={code.code} />
                  </>
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
            <CodeBadgeBox key={`HOLYBUCKETS`}>
              <CodeBadge>
                <Name code={`HOLYBUCKETS`}>{`Level 2 Swag Code`}</Name>
                <Code>
                  <LockIcon />
                </Code>
              </CodeBadge>
              <ProgressBar
                value={percentToGo}
                max="100"
                theme={badgeThemes[`HOLYBUCKETS`].textTheme}
              />
              <Text
                css={{ color: colors.lightest }}
              >{`Make ${contributionsToGo} more contribution${
                contributionsToGo > 1 ? `s` : ``
              } to earn level 2 swag!`}</Text>
            </CodeBadgeBox>
          )}
          <Notice />
        </ContentForContributorRoot>
      )
    }}
  </UserContext.Consumer>
)

export default ContentForContributor
