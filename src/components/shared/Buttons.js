import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { colors, fonts, radius } from '../../utils/styles';

export const ButtonBase = styled(`button`)`
  align-items: center;
  background: ${props => (props.inverse ? colors.brandDark : colors.lightest)};
  border: 1px solid
    ${props => (props.inverse ? colors.brandLight : colors.brand)};
  border-radius: ${radius.default}px;
  color: ${props => (props.inverse ? colors.brandLight : colors.brand)};
  cursor: pointer;
  display: inline-flex;
  font-family: ${fonts.heading};
  font-size: 1.1rem;
  justify-content: center;
  padding: 0.5em 0.75rem;
  transition: 0.5s;

  :focus {
    box-shadow: 0 0 0 3px ${colors.accent};
    outline: 0;
    transition: box-shadow 0.15s ease-in-out;
  }

  svg {
    height: 1.1em;
    margin-left: ${props => (props.iconOnLeft ? 0 : '0.5em')};
    margin-right: ${props => (props.iconOnLeft ? '0.5em' : 0)};
    width: 1.1em;
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: 0 0 0 1px ${colors.accent};
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

    // automatic recognition of icon placement, works properly only for [text + <Icon>] childrens
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
  background: ${colors.brand};
  color: ${colors.lightest};
  display: flex;
  font-size: 1.25rem;
  justify-content: center;

  @media (hover: hover) {
    &:hover {
      background: ${colors.brandDark};
    }
  }
`;
