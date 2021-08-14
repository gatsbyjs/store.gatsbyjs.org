import React from "react"
import styled from "@emotion/styled"

import { isAuthenticated } from "../utils/auth"
import {
  TextContainer,
  Text as BaseText,
} from "../components/shared/Typography"

const Text = styled(BaseText)`
  text-align: center;
`

const login = () => {
  if (!isAuthenticated()) {
    return (
      <TextContainer>
        <Text>Redirecting you to the login screen...</Text>
      </TextContainer>
    )
  }
}

export default login
