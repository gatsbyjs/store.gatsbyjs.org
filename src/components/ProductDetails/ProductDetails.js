import React from 'react';
import styled from 'react-emotion';
import SizeChartTable from './SizeChartTable';
import { Heading, Subheading, UnorderedList } from '../shared/Typography';
import { colors, fonts, button, spacing, pullHeadline, breakpoints } from '../../utils/styles';

const Headline = styled('h1')`
  ${pullHeadline};

  @media (min-width: ${breakpoints.hd}px) {
    padding-top: 32px;
    margin-top: 1.5rem;
  }
`;

const LargerSubheading = styled(Subheading)`
  font-size: 1.4rem;
`

const SubSubheading = styled('h4')`
  font-family: ${fonts.heading};
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 0;
  color: #333;
`;

const NestedUnorderedList = styled('ul')`
  list-style-type: disc;
`

const UnitWrapper = styled('div')`
  float: right;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  margin: ${-1 * spacing.lg}px 0 ${spacing.md}px 0;
`

const UnitOption = styled('div')`
  padding: 0.2em 0.5em;
  margin-right: 0.5em;
  background: ${props => props.active && colors.brand};
  color: ${props => props.active && colors.lightest};
  cursor: pointer;
  border-radius: 1em;

  &:hover {
    background: ${props => !props.active && colors.brandLight }
  }
`

const UnitsLabel = styled('div')`
  margin-right: 1em;
`

const UnitSelector = ({ setUnits, unit }) => {
  const handleClick = (event) => {
    setUnits(event.target.getAttribute('value'))
  }

  return(
    <UnitWrapper>
      <UnitsLabel>Units:</UnitsLabel>
      <UnitOption value="in" active={unit === "in"} onClick={handleClick}>in</UnitOption>
      <UnitOption value="cm" active={unit === "cm"} onClick={handleClick}>cm</UnitOption>
    </UnitWrapper>
  )
}

export default class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      units: "in"
    };
    this.changeUnits = this.changeUnits.bind(this);
  }

  changeUnits(units) {
    this.setState({ units })
  }

  render() {
    return (
      <>
        <Headline>Product Details</Headline>
        <LargerSubheading>Size Chart</LargerSubheading>
        <UnitSelector unit={this.state.units} setUnits={this.changeUnits} />
        <SizeChartTable unit={this.state.units} />
        <p>
          <strong style={{ color: colors.brand }}>
            Don’t see your size?
          </strong>{' '}
          Send us an email team@gatsbyjs.com and we’ll see if we can help!
        </p>
        <LargerSubheading>T-Shirt Materials & Fit</LargerSubheading>
        <p>
          To help you find the right size and fit, here are some additional details about our t-shirts.
        </p>
        <SubSubheading>Dark Deploy Tee</SubSubheading>
        <UnorderedList>
          <li>Material: 50% polyester, 25% cotton, 25% rayon</li>
          <li>Fit:</li>
            <NestedUnorderedList>
              <li>Unisex sizes: regular/retail fit</li>
              <li>Women’s sizes: semi-relaxed fit</li>
            </NestedUnorderedList>
        </UnorderedList>
        <SubSubheading>Purple Logo Tee</SubSubheading>
        <UnorderedList>
          <li>Material: 100% cotton</li>
          <li>Fit:</li>
            <NestedUnorderedList>
              <li>All sizes: regular/retail fit</li>
            </NestedUnorderedList>
        </UnorderedList>
        <LargerSubheading>Care Instructions</LargerSubheading>
        <SubSubheading>Socks</SubSubheading>
        <p>
          Keep those socks comfy on your feet and looking bright by washing
          them in cold water with darker colors. Tumble dry on low so they
          don’t shrink!
        </p>
        <SubSubheading>T-Shirts</SubSubheading>
        <p>
          Machine wash cold and tumble dry only. These shirts can’t take the
          heat (literally)! We want to make sure you’re happy with our shirts,
          but they require a little TLC.
        </p>
      </>
    );
  }
}
