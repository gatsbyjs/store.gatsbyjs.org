import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link as GatsbyLink } from 'gatsby';

import { colors, radius, spacing, transitions } from '../../utils/styles';

const LinkRoot = styled(GatsbyLink)`
  align-items: center;
  border-radius: ${radius.md}px;
  color: ${colors.text};
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  margin: -${spacing['3xs']} -${spacing['2xs']};
  padding: ${spacing['3xs']} ${spacing['2xs']};
  text-decoration: none;
  transition: ${transitions.speed.default};

  :focus {
    transition: box-shadow 0.15s ease-in-out;
  }

  span {
    display: block;
    border-bottom: 1px solid ${colors.border};
    transition: inherit;
  }

  svg {
    margin-right: ${spacing['2xs']};
    fill: ${colors.textLight};
  }

  :hover {
    span {
      border-bottom: 1px solid transparent;
    }

    svg {
      transition: inherit;
      fill: ${colors.brand};
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
