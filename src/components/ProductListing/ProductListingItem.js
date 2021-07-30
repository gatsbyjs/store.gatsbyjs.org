import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { MdArrowForward } from 'react-icons/md';
import { RiShoppingCartLine } from 'react-icons/ri';
import UserContext from '../../context/UserContext';

import {
  removeCareInstructions,
  cutDescriptionShort
} from '../../utils/helpers';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing,
  animations,
  fontSizes,
  lineHeights,
  badgeThemes
} from '../../utils/styles';

const DESCRIPTION_LIMIT = 90;
const TRANSITION_DURATION = '250ms';

const ProductListingItemLink = styled(Link)`
  background: ${colors.lightest};
  border: 1px solid transparent;
  border-radius: ${radius.lg}px;
  margin-bottom: ${spacing.lg}px;
  overflow: hidden;
  text-decoration: none;
  transition: all ${TRANSITION_DURATION};
  @media (min-width: ${breakpoints.tablet}px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    flex-basis: 300px;
    justify-content: center;
    margin: ${spacing.lg}px;
  }
  @media (hover: hover) {
    :hover {
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
      z-index: 1;
    }
  }
`;

const Item = styled(`article`)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${spacing.lg}px;
`;

const Preview = styled(`div`)`
  border-radius: ${radius.lg}px ${radius.lg}px 0 0;
  margin: -${spacing.lg}px;
  margin-bottom: ${spacing.lg}px;
  overflow: hidden;
  position: relative;
  .gatsby-image-wrapper {
    transition: all ${TRANSITION_DURATION};
  }
  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      .gatsby-image-wrapper {
        transform: scale(1.1);
      }
    }
  }
`;

const CodeEligibility = styled(`div`)`
  animation: ${animations.simpleEntry};
  color: ${props =>
    badgeThemes[props.freeWith]
      ? badgeThemes[props.freeWith].textTheme
      : colors.lightest};
  text-align: center;

  > span {
    background: ${props =>
      badgeThemes[props.freeWith]
        ? badgeThemes[props.freeWith].backgroundTheme
        : colors.brand};
    padding: ${spacing['3xs']}px ${spacing.xs}px;
    border-radius: ${radius.md}px;
    display: inline-flex;
    font-size: ${fontSizes.sm};
    justify-content: center;
  }

  > span > span:last-child {
    font-weight: 600;
  }
`;

const Name = styled(`h1`)`
  color: ${colors.text};
  font-family: ${fonts.heading};
  font-size: 20px;
  line-height: ${lineHeights.dense};
  margin: 0;
`;

const Description = styled(`p`)`
  color: ${colors.textLight};
  display: none;
  flex-grow: 1;
  font-size: ${fontSizes.sm};
  line-height: ${lineHeights.default};
`;

const PriceRow = styled(`div`)`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing['2xs']}px;
`;

const Price = styled(`div`)`
  color: ${colors.text};
  font-size: 18px;
  font-weight: 400;
  line-height: ${lineHeights.solid};

  span {
    color: ${colors.textLight};
  }
`;

const Incentive = styled('div')`
  align-items: center;
  color: ${colors.textLight};
  display: flex;
  font-size: ${fontSizes.sm};
  line-height: 1.3;
  margin-bottom: ${spacing['2xs']}px;
  margin-right: calc(-${spacing.lg}px - 40px);
  text-align: right;
  transition: all ${TRANSITION_DURATION};
  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      transform: translateX(-40px);
    }
  }
  > span {
    svg {
      display: inline;
      margin-right: -${spacing['3xs']}px;
      vertical-align: middle;
    }
  }
`;

const CartIcon = styled(`span`)`
  align-items: center;
  background: ${colors.brand};
  border-radius: ${radius.md}px 0 0 ${radius.md}px;
  display: flex;
  height: 40px;
  justify-content: center;
  margin-left: ${spacing.lg}px;
  position: relative;
  transition: all ${TRANSITION_DURATION};
  vertical-align: middle;
  width: 40px;
  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      margin-left: ${spacing.xs}px;
    }
  }
  svg {
    color: ${colors.lightest};
    height: 24px;
    position: relative;
    width: 24px;
  }
`;

const checkEligibility = ({ contributor, freeWith }) => {
  const { shopify } = contributor;

  let eligibleCodes = [];

  if (shopify && shopify.codes) {
    eligibleCodes = shopify.codes.filter(
      code => code.code === freeWith && code.used === false
    );
  }

  return eligibleCodes.length ? true : false;
};

const ProductListingItem = props => {
  const {
    product: {
      title,
      handle,
      description,
      variants: [firstVariant],
      featuredImage
    }
  } = props;

  const { price } = firstVariant;

  const freeWith =
    price >= 20 ? 'HOLYBUCKETS' : price >= 10 ? 'BUILDWITHGATSBY' : null;

  return (
    <UserContext.Consumer>
      {({ contributor }) => {
        return (
          <ProductListingItemLink to={`/product/${handle}`} aria-label={title}>
            <Item>
              <Preview>
                <GatsbyImage
                  image={featuredImage.gatsbyImageData}
                  alt={featuredImage.altText}
                  placeholder="blurred"
                />
                {checkEligibility({
                  freeWith,
                  contributor
                }) && (
                  <CodeEligibility freeWith={freeWith}>
                    <span>free with </span>
                    <span>
                      Code Swag Level {freeWith === 'HOLYBUCKETS' ? '2' : '1'}
                    </span>
                  </CodeEligibility>
                )}
              </Preview>
              <Name>{title}</Name>
              <Description>
                {cutDescriptionShort(
                  removeCareInstructions(description),
                  DESCRIPTION_LIMIT
                )}
              </Description>
              <PriceRow>
                <Price>
                  <span>USD</span> ${price}
                </Price>
                <Incentive>
                  <span>
                    View details
                    <br />& buy <MdArrowForward />
                  </span>
                  <CartIcon>
                    <RiShoppingCartLine />
                  </CartIcon>
                </Incentive>
              </PriceRow>
            </Item>
          </ProductListingItemLink>
        );
      }}
    </UserContext.Consumer>
  );
};

ProductListingItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductListingItem;
