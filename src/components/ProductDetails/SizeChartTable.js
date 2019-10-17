import React from 'react';
import styled from '@emotion/styled';
import withProps from 'recompose/withProps';
import { colors } from '../../utils/styles';

const ResponsiveTable = styled('div')`
  display: block;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  overflow-x: auto;
  width: 100%;
`;

const Table = styled('table')`
  border-collapse: collapse;
  max-width: 100%;
  min-width: 600px;
  width: 100%;
`;

const ThLeft = styled('th')`
  padding: 4px 8px 4px 0;
  text-align: left;
`;

const ThBrand = styled('th')`
  background: ${colors.brand};
  border-left: 1px solid #9d7cbf;
  color: ${colors.lightest};
  -webkit-font-smoothing: antialiased;
  padding: 8px 0;
`;

const Tr = styled('tr')`
  border-bottom: ${props => (props.last ? 0 : '1px solid #e0d6eb')};
`;

const Td = styled('td')`
  border-left: 1px solid #f5f3f7;
  padding: 8px 4px;
  text-align: center;
  vertical-align: top;
`;

const TdLeft = withProps({
  colSpan: '2'
})(styled('td')`
  padding: 4px 8px 4px 0;
`);

const SizeChartTable = ({ unit }) => {
  const multiplier = unit === 'cm' ? 2.54 : 1;
  const Size = ({ children: value }) => (
    <span>{Math.round(value * multiplier * 10) / 10}</span>
  );

  return (
    <ResponsiveTable>
      <Table>
        <tbody>
          <tr>
            <ThLeft>Style</ThLeft>
            <ThBrand>Sizes</ThBrand>
            <ThBrand>S</ThBrand>
            <ThBrand>M</ThBrand>
            <ThBrand>L</ThBrand>
            <ThBrand>XL</ThBrand>
            <ThBrand>2XL</ThBrand>
          </tr>
          <Tr>
            <TdLeft>Unisex Pants</TdLeft>
            <Td>
              <Size>38</Size>L–<Size>26</Size>W
            </Td>
            <Td>
              <Size>38</Size>L–<Size>28</Size>W
            </Td>
            <Td>
              <Size>38</Size>L–<Size>28</Size>W
            </Td>
            <Td>
              <Size>39</Size>L–<Size>30</Size>W
            </Td>
            <Td>
              <Size>40</Size>L–<Size>24</Size>W
            </Td>
          </Tr>
          <Tr>
            <TdLeft>Unisex Body Length</TdLeft>
            <Td>
              <Size>27.5</Size>–<Size>28</Size>
            </Td>
            <Td>
              <Size>28.5</Size>–<Size>29</Size>
            </Td>
            <Td>
              <Size>29.5</Size>–<Size>30</Size>
            </Td>
            <Td>
              <Size>30.5</Size>–<Size>31</Size>
            </Td>
            <Td>
              <Size>31.5</Size>–<Size>32</Size>
            </Td>
          </Tr>
          <Tr>
            <TdLeft>Unisex Chest</TdLeft>
            <Td>
              <Size>36</Size>–<Size>38</Size>
            </Td>
            <Td>
              <Size>39</Size>–<Size>41</Size>
            </Td>
            <Td>
              <Size>42</Size>–<Size>44</Size>
            </Td>
            <Td>
              <Size>45</Size>–<Size>48</Size>
            </Td>
            <Td>
              <Size>49</Size>–<Size>52</Size>
            </Td>
          </Tr>
          <Tr>
            <TdLeft>Women Body Length</TdLeft>
            <Td>
              <Size>25.375</Size>–<Size>26.5</Size>
            </Td>
            <Td>
              <Size>26</Size>–<Size>27</Size>
            </Td>
            <Td>—</Td>
            <Td>—</Td>
            <Td>—</Td>
          </Tr>
          <Tr last>
            <TdLeft>Women Chest</TdLeft>
            <Td>
              <Size>29.5</Size>–<Size>32.5</Size>
            </Td>
            <Td>
              <Size>31.5</Size>–<Size>34.5</Size>
            </Td>
            <Td>—</Td>
            <Td>—</Td>
            <Td>—</Td>
          </Tr>
        </tbody>
      </Table>
    </ResponsiveTable>
  );
};

export default SizeChartTable;
