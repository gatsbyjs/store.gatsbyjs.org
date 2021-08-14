import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { MdArrowForward } from "react-icons/md"
import { RiShoppingCartLine } from "react-icons/ri"
import UserContext from "../../context/UserContext"

import {
  removeCareInstructions,
  cutDescriptionShort,
} from "../../utils/helpers"

import {
  animations,
  badgeThemes,
  borders,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  radius,
  spacing,
  transitions,
} from "../../utils/styles"

const DESCRIPTION_LIMIT = 90
const TRANSITION_DURATION = transitions.speed.default

const ProductListingItemLink = styled(Link)`
  background: ${colors.lightest};
  border: ${borders.grid};
  color: ${colors.text};
  flex-grow: 1;

  margin-top: -1px;
  text-decoration: none;
  transition: all ${TRANSITION_DURATION};

  @media (min-width: ${breakpoints.phablet}px) {
    flex-basis: 20rem;
    justify-content: center;
    border-right: 0;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    flex-basis: 23rem;
  }

  @media (hover: hover) {
    :hover {
      color: ${colors.brand};
    }
  }
`

const Item = styled(`article`)`
  display: flex;
  flex-direction: column;
  height: 100%;
  // padding: ${spacing.lg};
`

const Preview = styled(`div`)`
  border-radius: ${radius.lg}px ${radius.lg}px 0 0;
  // margin: -${spacing.lg};
  // margin-bottom: ${spacing.lg};
  padding: ${spacing[`2xl`]};
  position: relative;

  .gatsby-image-wrapper {
    transform: scale(0.75);
    transition: all ${TRANSITION_DURATION};
  }

  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      .gatsby-image-wrapper {
        transform: scale(0.9);
      }
    }
  }
`

const CodeEligibility = styled(`div`)`
  animation: ${animations.simpleEntry};
  background: ${(props) =>
    badgeThemes[props.freeWith]
      ? badgeThemes[props.freeWith].backgroundTheme
      : colors.brand};
  border-radius: ${radius.round}px;
  color: ${(props) =>
    badgeThemes[props.freeWith]
      ? badgeThemes[props.freeWith].textTheme
      : colors.lightest};
  background: ${colors.brand};
  color: ${colors.lightest};
  text-align: center;
  position: absolute;
  bottom: 0;
  top: auto;
  transform: translate3d(0, 50%, 0);
  z-index: 1;
  white-space: nowrap;
  padding: ${spacing[`2xs`]} ${spacing.md};
  font-size: ${fontSizes.sm};
`

const Name = styled(`h1`)`
  font-family: ${fonts.heading};
  font-size: ${fontSizes.lg};
  line-height: ${lineHeights.dense};
  margin: 0;
  border-top: ${borders.grid};
  padding: ${spacing.xl} ${spacing[`2xl`]} 0;
  font-weight: ${fontWeights.semibold};
`

const Description = styled(`p`)`
  display: none;
  flex-grow: 1;
  font-size: ${fontSizes.sm};
  line-height: ${lineHeights.default};
  padding: 0 ${spacing.lg} 0;
`

const PriceRow = styled(`div`)`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing[`2xs`]};
  padding: 0 ${spacing[`2xl`]} ${spacing.xl};
`

const Price = styled(`div`)`
  font-family: ${fonts.serif};
  font-size: ${fontSizes.lg};
  line-height: ${lineHeights.solid};
`

const Incentive = styled(`div`)`
  align-items: center;
  display: flex;
  display: none;
  font-size: ${fontSizes.sm};
  line-height: 1.3;
  margin-bottom: ${spacing[`2xs`]};
  margin-right: calc(-${spacing.lg} - 40px);
  text-align: right;
  transition: all ${TRANSITION_DURATION};

  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      color: ${colors.brand};
      transform: translateX(-40px);
    }
  }

  > span {
    svg {
      display: inline;
      margin-right: -${spacing[`3xs`]};
      vertical-align: middle;
    }
  }
`

const CartIcon = styled(`span`)`
  align-items: center;
  background: ${colors.brand};
  border-radius: ${radius.md}px 0 0 ${radius.md}px;
  display: flex;
  height: 40px;
  justify-content: center;
  margin-left: ${spacing.lg};
  position: relative;
  transition: all ${TRANSITION_DURATION};
  vertical-align: middle;
  width: 40px;

  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      margin-left: ${spacing.xs};
    }
  }

  svg {
    position: relative;
    width: 24px;
    height: 24px;
    color: ${colors.lightest};
  }
`

const checkEligibility = ({ contributor, freeWith }) => {
  const { shopify } = contributor

  let eligibleCodes = []

  if (shopify && shopify.codes) {
    eligibleCodes = shopify.codes.filter(
      (code) => code.code === freeWith && code.used === false,
    )
  }

  return eligibleCodes.length ? true : false
}

const ProductListingItem = (props) => {
  const {
    product: {
      title,
      handle,
      description,
      variants: [firstVariant],
      featuredImage,
    },
  } = props

  const { price } = firstVariant

  const freeWith =
    price >= 20 ? `HOLYBUCKETS` : price >= 10 ? `BUILDWITHGATSBY` : null

  return (
    <UserContext.Consumer>
      {({ contributor }) => (
        <ProductListingItemLink to={`/product/${handle}`} aria-label={title}>
          <Item>
            <Preview>
              <GatsbyImage
                image={featuredImage.gatsbyImageData}
                alt={featuredImage.altText}
              />
              {checkEligibility({
                freeWith,
                contributor,
              }) && (
                <CodeEligibility freeWith={freeWith}>
                  <span>Free with </span>
                  <span>
                    Code{` `}
                    <strong>
                      Swag Level {freeWith === `HOLYBUCKETS` ? `2` : `1`}
                    </strong>
                  </span>
                </CodeEligibility>
              )}
            </Preview>
            <Name>{title}</Name>
            <Description>
              {cutDescriptionShort(
                removeCareInstructions(description),
                DESCRIPTION_LIMIT,
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
      )}
    </UserContext.Consumer>
  )
}

ProductListingItem.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductListingItem
