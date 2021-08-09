import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import {
  colors,
  dimensions,
  fonts,
  radius,
  gradients,
  fontSizes,
  fontWeights,
  lineHeights,
  transitions
} from '../../utils/styles';

export const ButtonBase = styled(`button`)`
  align-items: center;
  background-color: ${props =>
    props.inverse ? colors.brand : colors.brandLight};
  border: 1px solid
    ${props => (props.inverse ? colors.brand : colors.brandLight)};
  border-radius: ${radius.lg}px;
  color: ${props => (props.inverse ? colors.brandLight : colors.brand)};
  cursor: pointer;
  display: inline-flex;
  font-family: ${fonts.body};
  font-size: ${fontSizes.md};
  justify-content: center;
  line-height: ${lineHeights.solid};
  padding: 0.5rem 1.5rem;
  min-height: ${dimensions.interactiveMinHeight};
  transition: ${transitions.speed.default};

  svg {
    width: 1.1em;
    height: 1.1em;
    margin: 0;
    margin-right: ${props => (props.iconOnLeft ? '0.5em' : 0)};
    margin-left: ${props => (props.iconOnLeft ? 0 : '0.5em')};
  }

  @media (hover: hover) {
    &:hover {
    }
  }
`;

const ButtonAsExternalLink = styled(ButtonBase.withComponent(`a`))`
  display: inline-flex;
  text-decoration: none;
`;

const ButtonAsInternalLink = ButtonAsExternalLink.withComponent(
  ({ iconOnLeft, inverse, ...rest }) => <Link {...rest} />
);

export class Button extends Component {
  render() {
    const { children, to, href, ref, inverse = false, ...rest } = this.props;

    // automtic recognition of icon placement, works properly only for [text + <Icon>] childrens
    const iconOnLeft = typeof children[0] !== 'string';

    if (to) {
      return (
        <ButtonAsInternalLink
          to={to}
          iconOnLeft={iconOnLeft}
          inverse={inverse}
          {...rest}
        >
          {children}
        </ButtonAsInternalLink>
      );
    } else if (href) {
      return (
        <ButtonAsExternalLink
          href={href}
          inverse={inverse}
          iconOnLeft={iconOnLeft}
          {...rest}
        >
          {children}
        </ButtonAsExternalLink>
      );
    } else {
      return (
        <ButtonBase inverse={inverse} iconOnLeft={iconOnLeft} {...rest}>
          {children}
        </ButtonBase>
      );
    }
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  inverse: PropTypes.bool,
  to: PropTypes.string,
  href: PropTypes.string
};

export const PrimaryButton = styled(Button)`
  background: ${gradients.button};
  background-color: ${colors.brand};
  background-position: 100% 0;
  background-size: 600% 100%;
  animation: rainbow 2s ease-in-out infinite;
  border: 0;
  color: ${colors.lightest};
  display: flex;
  // font-family: ${fonts.monospace};
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  height: ${props => (props.fullWidth ? 'auto' : '')};
  justify-content: center;
  letter-spacing: 0.025em;
  position: relative;
  // text-transform: uppercase;
  transition: 8s;
  width: ${props => (props.fullWidth ? '100%' : 'auto')};

  &::after {
    border-radius: inherit;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    // transition: background 8s, transform 0.25s;
    background: inherit;
    background-color: inherit;
    background-position: inherit
    background-size: inherit;
    animation: inherit;  
  }

  @media (hover: hover) {
    &:hover {
      background-position: 0 0;

      &::after {
        // background-position: inherit;
        // transform: scale(1.05);
      }
    }
  }
`;
