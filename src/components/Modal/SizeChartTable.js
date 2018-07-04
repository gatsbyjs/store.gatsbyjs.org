import React from 'react';
import styled from 'react-emotion';
import withProps from 'recompose/withProps';
import { colors } from '../../utils/styles';

const ResponsiveTable = styled('div')`
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
`;

const ThBrand = styled('th')`
  background: ${colors.brand};
  color: ${colors.lightest};
  border-left: 1px solid #9d7cbf;
  -webkit-font-smoothing: antialiased;
  padding: 8px 0;
`;

const Tr = styled('tr')`
  border-bottom: ${props => (props.last ? 0 : '1px solid #e0d6eb')};
`;

const Td = styled('td')`
  border-left: 1px solid #f5f3f7;
  padding: 8px 4px;
  vertical-align: top;
`;

const TdLeft = withProps({
  colSpan: '2'
})(styled('td')`
  padding: 4px 8px 4px 0;
`);

const SizeChartTable = () => (
  <ResponsiveTable>
    <table
      css={`
        border-collapse: collapse;
        width: 100%;
        max-width: 100%;
        min-width: 600px;
      `}
    >
      <tbody>
        <tr>
          <th
            class="sizechart_column_heading_grey"
            style={{
              textAlign: 'left',
              padding: '4px 8px 4px 0'
            }}
          >
            Gender
          </th>
          <ThBrand>Sizes</ThBrand>
          <ThBrand>S</ThBrand>
          <ThBrand>M</ThBrand>
          <ThBrand>L</ThBrand>
          <ThBrand>XL</ThBrand>
          <ThBrand>2XL</ThBrand>
        </tr>
        <Tr>
          <TdLeft>Unisex Body Length</TdLeft>
          <Td>27.5 - 28</Td>
          <Td>28.5 - 29</Td>
          <Td>29.5 - 30</Td>
          <Td>30.5 - 31</Td>
          <Td>31.5 - 32</Td>
        </Tr>
        <Tr>
          <TdLeft>Unisex Chest</TdLeft>
          <Td>36 - 36</Td>
          <Td>39 - 41</Td>
          <Td>42 - 44</Td>
          <Td>45 - 48</Td>
          <Td>49 - 52</Td>
        </Tr>
        <Tr>
          <TdLeft>Women Body Length</TdLeft>
          <Td>25.375 - 26.5</Td>
          <Td>26 - 27</Td>
          <Td>-</Td>
          <Td>-</Td>
          <Td>-</Td>
        </Tr>
        <Tr last>
          <TdLeft>Women Chest</TdLeft>
          <Td>29.5 - 32.5</Td>
          <Td>31.5 - 34.5</Td>
          <Td>-</Td>
          <Td>-</Td>
          <Td>-</Td>
        </Tr>
      </tbody>
    </table>
  </ResponsiveTable>
);

export default SizeChartTable;
