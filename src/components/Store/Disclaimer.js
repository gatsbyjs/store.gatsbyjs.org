import React from 'react';
import { Heading, Lede, Text } from '../shared/Typography';

export default () => (
  <>
    <Heading>Get Gatsby Swag</Heading>
    <Lede>
      <strong>
        <span role="img" aria-label="alert">
          🚨
        </span>{' '}
        NOTE{' '}
        <span role="img" aria-label="alert">
          🚨
        </span>
      </strong>{' '}
      This store is not quite ready for prime time.
    </Lede>
    <Text>
      We’re still waiting on orders to arrive and haven’t worked all the bugs
      out yet. Technically, you <em>can</em> buy things, but they won’t ship
      until mid-July.
    </Text>
    <Text>
      P.S. — We{' '}
      <span role="img" aria-label="purple heart">
        💜
      </span>{' '}
      you for paying close enough attention to our GitHub org to know that this
      store exists.
    </Text>
  </>
);
