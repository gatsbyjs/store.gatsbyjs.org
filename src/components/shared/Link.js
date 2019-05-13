import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link as GatsbyLink } from 'gatsby';

import { colors, radius, spacing } from '../../utils/styles';

const LinkRoot = styled(GatsbyLink)`
  align-items: center;
  border-radius: ${radius.default}px;
  color: ${colors.brand};
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  margin: -${spacing['3xs']}px -${spacing['2xs']}px;
  padding: ${spacing['3xs']}px ${spacing['2xs']}px;
  text-decoration: none;
  transition: 0.5s;

  :focus {
    box-shadow: 0 0 0 2px ${colors.accent};
    outline: 0;
    transition: box-shadow 0.15s ease-in-out;
  }

  span {
    border-bottom: 1px solid ${colors.brandBright};
    display: block;
    transition: inherit;
  }

  svg {
    fill: ${colors.brandBright};
    margin-right: ${spacing['2xs']}px;
  }

  :hover {
    span {
      border-bottom: 1px solid ${colors.brand};
    }

    svg {
      fill: ${colors.brand};
      transition: inherit;
    }
  }
`;

const Link = props => {
  const { children } = props;

  return <LinkRoot {...props}>{children}</LinkRoot>;
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool
};

export default Link;
