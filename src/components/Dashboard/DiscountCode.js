import React from 'react';
import styled from 'react-emotion';
import UserContext from '../../context/UserContext';
import { Heading, Lede, Text } from '../shared/Typography';
import { button, colors } from '../../utils/styles';

const Button = styled('button')`
  ${button.default};
  ${button.big};
  ${button.purple};
`;

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

const Description = styled('p')`
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
              <Button
                onClick={handleGetDiscountCode(profile.nickname, profile.email)}
              >
                Claim Your Discount Code
              </Button>
            </>
          ) : (
            <DiscountCodeBox>
              <Heading>Your Discount Code:</Heading>
              <DiscountCode>
                <strong>{discount.discount_code}</strong>
              </DiscountCode>
              <Description>
                <p>
                  Enter this discount code during checkout to receive your free
                  swag!
                </p>
                <p>
                  <strong>NOTE:</strong> This discount code is only valid if you
                  check out using the email address{' '}
                  <strong>{profile.email}</strong>.
                </p>
              </Description>
            </DiscountCodeBox>
          )}
        </>
      )
    }
  </UserContext.Consumer>
);
