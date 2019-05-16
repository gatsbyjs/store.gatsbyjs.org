import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

import { MdShoppingCart, MdArrowForward } from 'react-icons/md';
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
  animations
} from '../../utils/styles';

const DESCRIPTION_LIMIT = 90;
const TRANSITION_DURATION = '250ms';

const ProductListingItemLink = styled(Link)`
  background: ${colors.lightest};
  border-radius: ${radius.large}px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
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
    margin: ${spacing.md * 1.25}px;
  }

  @media (hover: hover) {
    :hover {
      background: ${colors.brandLighter};
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
  border-bottom: 1px solid ${colors.brandLight};
  border-radius: ${radius.large}px ${radius.large}px 0 0;
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
  align-items: stretch;
  animation: ${animations.simpleEntry};
  border-radius: ${radius.default}px;
  bottom: 0;
  color: ${colors.lightest};
  display: flex;
  left: ${spacing.lg}px;
  overflow: hidden;
  position: absolute;
  right: ${spacing.lg}px;

  span {
    align-items: center;
    display: flex;
    height: 30px;
    justify-content: center;
  }

  span:first-of-type {
    background: #999;
    flex-basis: 35%;
    font-size: 0.9rem;
  }

  span:last-child {
    background: ${props =>
      props.freeWith === 'HOLYBUCKETS' ? colors.lemon : colors.brand};
    color: ${props =>
      props.freeWith === 'HOLYBUCKETS' ? colors.brand : colors.lemon};
    flex-basis: 65%;
    font-family: ${fonts.heading};
    font-size: 1rem;
  }
`;

const Name = styled(`h1`)`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 1.6rem;
  line-height: 1.2;
  margin: 0;
`;

const Description = styled(`p`)`
  color: ${colors.text};
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1.5;
`;

const PriceRow = styled(`div`)`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.xs}px;
`;

const Price = styled(`div`)`
  color: ${colors.brand};
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.02em;

  span {
    color: ${colors.textLight};
  }
`;

const Incentive = styled('div')`
  align-items: center;
  color: ${colors.lilac};
  display: flex;
  font-size: 0.9rem;
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
  background: ${colors.lilac};
  border-radius: ${radius.default}px 0 0 ${radius.default}px;
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
    color: ${colors.accent};
    height: 22px;
    position: relative;
    width: 22px;
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
      images: [firstImage]
    }
  } = props;

  const { price } = firstVariant;
  const {
    localFile: {
      childImageSharp: { fluid }
    }
  } = firstImage;

  const freeWith =
    price >= 20 ? 'HOLYBUCKETS' : price >= 10 ? 'BUILDWITHGATSBY' : null;

  return (
    <UserContext.Consumer>
      {({ contributor }) => {
        return (
          <ProductListingItemLink to={`/product/${handle}`}>
            <Item>
              <Preview>
                <Image fluid={fluid} />
                {checkEligibility({
                  freeWith,
                  contributor
                }) && (
                  <CodeEligibility freeWith={freeWith}>
                    <span>free with </span>
                    <span>
                      Code Swag Level
                      {freeWith === 'HOLYBUCKETS' ? '2' : '1'}
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
                    view details
                    <br />& buy <MdArrowForward />
                  </span>
                  <CartIcon>
                    <MdShoppingCart />
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
