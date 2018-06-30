import React from 'react';
import styled from 'react-emotion';
import UserContext from '../../context/UserContext';
import Form from './Form';
import { Heading, Lede, Text } from '../shared/Typography';
import { colors } from '../../utils/styles';

const DiscountCodeBox = styled('div')`
  background-color: ${colors.brand}20;
  border: 1px solid ${colors.brand}40;
  border-radius: 0.5rem;
  color: ${colors.darkest};
  padding: 1.5rem 1rem 1rem;
  text-align: center;
`;

const DiscountCode = styled('pre')`
  background-color: ${colors.lightest};
  border: 1px solid ${colors.brand}40;
  border-radius: 3px;
  box-shadow: inset 1px 1px 4px ${colors.textLight}40;
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

export default () => (
  <UserContext.Consumer>
    {({ contributions, discount, profile, handleGetDiscountCode }) =>
      contributions.count > 0 && (
        <>
          {!discount ? (
            <>
              <Heading>You're the best, @{profile.nickname}!</Heading>
              <Lede>
                You’ve made {contributions.count} contributions to Gatsby. 💪💜
              </Lede>
              <Text>
                Can we just say, “Thanks for making Gatsby great”? As a token of
                our appreciation, click the button below to get a discount code
                good for one free item in the swag store.
              </Text>
              <Form profile={profile} onSubmit={handleGetDiscountCode} />
            </>
          ) : (
            <DiscountCodeBox>
              <Heading>It’s time to claim your free Gatsby swag!</Heading>
              <DiscountCode>
                <strong>{discount.discount_code}</strong>
              </DiscountCode>
              <Description>
                <p>
                  Enter this discount code during checkout to receive one free
                  swag item.
                </p>
                <p>
                  <strong>NOTE:</strong> This discount code is only valid if you
                  check out using the email address you entered in the form.
                </p>
              </Description>
            </DiscountCodeBox>
          )}
        </>
      )
    }
  </UserContext.Consumer>
);
