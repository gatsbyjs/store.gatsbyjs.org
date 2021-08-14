import React from "react"
import styled from "@emotion/styled"

import { colors, spacing } from "../../utils/styles"

const EmptyCartRoot = styled(`div`)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`

const SadCartCopy = styled(`div`)`
  color: ${colors.text};
  padding: ${spacing.lg};
  max-width: 16rem;
  text-align: center;

  p {
    margin: 0;
  }
`

const EmptyCart = () => (
  <EmptyCartRoot>
    <SadCartCopy>
      <p>
        Your Cart is sad{` `}
        <span role="img" aria-label="sad face">
          😔
        </span>
      </p>
      <p>Turn that frown upside down with swag!</p>
    </SadCartCopy>
  </EmptyCartRoot>
)

export default EmptyCart
