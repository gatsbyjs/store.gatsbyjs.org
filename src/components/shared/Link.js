import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link as GatsbyLink } from 'gatsby';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const LinkRoot = styled(GatsbyLink)`
  color: ${colors.brand};
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: 0.5s;

  span {
    border-bottom: 1px solid ${colors.brandBright};
    display: block;
    transition: inherit;
  }

  svg {
    margin-right: ${spacing['2xs']}px;
    fill: ${colors.brandBright};
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
  const { children, className = '' } = props;

  return <LinkRoot {...props}>{children}</LinkRoot>;
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Link;