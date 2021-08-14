import React from "react"
import styled from "@emotion/styled"

import { animations, colors, fontSizes, spacing } from "../../utils/styles"
import Spinner from "../shared/Spinner"

const LoadingRoot = styled(`div`)`
  align-items: center;
  animation: ${animations.simpleEntry};
  color: ${colors.textLight};
  display: flex;
  flex-direction: column;
  font-size: ${fontSizes.sm};
  height: 70vh;
  justify-content: center;
`

const SpinnerContainer = styled(`span`)`
  font-size: ${fontSizes.lg};
  margin-bottom: ${spacing.lg};
`

const Loading = () => (
  <LoadingRoot>
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
    Loading
  </LoadingRoot>
)

export default Loading
