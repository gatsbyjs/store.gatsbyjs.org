import React from "react"
import styled from "@emotion/styled"
import { GoMarkGithub } from "react-icons/go"

import { login } from "../../utils/auth"
import { spacing, animations } from "../../utils/styles"
import { Button as BaseButton } from "../shared/Buttons"
import Notice from "../shared/Notice"
import { Heading, SectionHeading, Text } from "./AreaTypography"

const ContentForGuestRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
  position: relative;
`

const FirstHeading = styled(Heading)`
  margin-right: 15px;
  padding-right: ${spacing.lg};
`

const Button = styled(`a`)`
  margin: ${spacing.lg} 0 ${spacing.xl} 0;
`

const LoginButton = styled(BaseButton)`
  margin: ${spacing.lg} 0 ${spacing.xl} 0;
`

const ContentForGuest = () => (
  <ContentForGuestRoot>
    <SectionHeading>For existing contributors</SectionHeading>
    <FirstHeading>
      Get Gatsby swag for <strong>free!</strong>
    </FirstHeading>
    <Text>
      Already contributed to Gatsby? Claim your personal coupon code and get
      free swag by logging in with your GitHub account!
    </Text>
    <LoginButton onClick={(e) => login()}>
      Log in with GitHub <GoMarkGithub />
    </LoginButton>
    <SectionHeading>For future contributors</SectionHeading>
    <Heading>Never contributed to Gatsby?</Heading>
    <Text>
      Let’s get you started with your first contribution to Gatsby! Once you’ve
      had your first pull request merged into Gatsby, you can come back here to
      claim free swag.
    </Text>
    <Button href="https://github.com/search?o=desc&q=org%3Agatsbyjs+type%3Aissue+label%3A%22help%20wanted%22+is%3Aopen&s=updated&type=Issues">
      Explore open issues
    </Button>
    <Notice />
  </ContentForGuestRoot>
)

export default ContentForGuest
