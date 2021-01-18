import styled from '@emotion/styled';

import { Text } from '../ContributorArea/AreaTypography';

import { colors, radius, spacing } from '../../utils/styles';

const NoticeRoot = styled(`div`)`
  background: ${colors.brandLight};
  border-radius: ${radius.lg};
  padding: ${spacing.sm}px ${spacing.md}px;
`;

const Notice = () => (
  <NoticeRoot>
    <Text css={{ marginTop: 0 }}>
      Due to COVID-19 related international mail service disruptions, your order
      may be delayed or suspended. Please view{' '}
      <a href="https://about.usps.com/newsroom/service-alerts/international/welcome.htm">
        the list of affected countries
      </a>{' '}
      to see if your order is affected.
    </Text>
  </NoticeRoot>
);

export default Notice;
