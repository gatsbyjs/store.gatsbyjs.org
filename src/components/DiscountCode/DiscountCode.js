import React from 'react';
import UserContext from '../../context/UserContext';
import Form from './Form';
import Loading from './Loading';
import Display from './Display';
import Error from './Error';
import { Heading, Lede, Text } from '../shared/Typography';

export default () => (
  <UserContext.Consumer>
    {({
      contributions = { count: 0 },
      discount,
      loading,
      profile,
      isDiscountRequestActive,
      handleGetDiscountCode
    }) => {
      if (loading) {
        return <Loading />;
      }

      if (contributions && contributions.count <= 0) {
        return null;
      }

      if (discount && discount.error) {
        return <Error error={discount.error} />;
      }

      if (discount && discount.discount_code) {
        return <Display discount_code={discount.discount_code} />;
      }

      // If we get here there are contributions, but no code has been requested.
      return (
        <>
          <Heading className={loading && 'loading'}>
            You're the best, @{profile.nickname}!
          </Heading>
          <Lede className={loading && 'loading'}>
            You’ve made {contributions.count} contributions to Gatsby. 💪💜
          </Lede>
          <Text className={loading && 'loading'}>
            Thanks for making Gatsby great! As a token of our appreciation,
            click the button below to get a discount code good for one free item
            in the swag store.
          </Text>
          <Form
            className={loading && 'loading'}
            profile={profile}
            onSubmit={handleGetDiscountCode}
            isDiscountRequestActive={isDiscountRequestActive}
          />
        </>
      );
    }}
  </UserContext.Consumer>
);
