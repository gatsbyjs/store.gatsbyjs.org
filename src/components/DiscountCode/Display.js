import React from 'react';
import styled from 'react-emotion';
import { Heading } from '../shared/Typography';
import { colors } from '../../utils/styles';

const DiscountCodeBox = styled('div')`
  background-color: ${colors.brand}20;
  border: 1px solid ${colors.brand};
  border-radius: 0.5rem;
  color: ${colors.darkest};
  padding: 1.5rem 1rem 1rem;
  text-align: center;
`;

const DiscountCode = styled('pre')`
  background-color: ${colors.lightest};
  font-size: 1.75rem;
  margin: 0.75rem 0 0;
  padding: 1rem;
`;

const Description = styled('div')`
  color: ${colors.darkest};

  p {
    margin: 0.5rem 0 0;
  }
`;

export default ({ discount_code }) => (
  <DiscountCodeBox>
    <Heading>It’s time to claim your free Gatsby swag!</Heading>
    <DiscountCode>
      <strong>{discount_code}</strong>
    </DiscountCode>
    <Description>
      <p>Enter this discount code during checkout to receive your free swag!</p>
      <p>
        <strong>NOTE:</strong> This discount code is only valid if you check out
        using the email address you entered in the form.
      </p>
    </Description>
  </DiscountCodeBox>
);
