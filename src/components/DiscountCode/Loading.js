import React from 'react';
import styled from 'react-emotion';
import { Heading, Lede, Text } from '../shared/Typography';
import { colors } from '../../utils/styles';

const FormLoading = styled('div')`
  background-color: ${colors.brandLighter};
  border-radius: 3px;
  display: block;
  height: 200px;
  margin-bottom: 3rem;
`;

// TODO add a real loading state
export default () => (
  <>
    <Heading className="loading" />
    <Lede className="loading" />
    <Text className="loading" />
    <FormLoading />
  </>
);
