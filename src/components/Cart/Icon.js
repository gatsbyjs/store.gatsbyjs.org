import React from 'react';
import { css } from 'react-emotion';
import { colors } from '../../utils/styles';

const iconStyles = css`
  display: inline-block;
  height: 20px;
  width: 20px;
`;

const iconStrokeStyles = css`
  fill: none;
  stroke: ${colors.brand};
  stroke-width: 1.4173;
  stroke-miterlimit: 140;
`;

const iconGradientStyles = css`
  fill: url(#gatsby-cart-icon-gradient);
`;

export default () => (
  <svg
    className={iconStyles}
    viewBox="0 0 20 20"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={colors.brand}
      d="M7.2,18.6c-0.8,0-1.5-0.7-1.5-1.5c0-0.7,0.6-1.5,1.5-1.5c0.8,0,1.5,0.7,1.5,1.5S8.1,18.6,7.2,18.6z"
    />
    <path
      fill={colors.brand}
      d="M7.2,16.1C7.2,16.1,7.2,16.1,7.2,16.1c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1
      C6.3,16.6,6.6,16.1,7.2,16.1 M7.2,15.1c-1.1,0-2,1-2,2c0,1.1,0.9,2,2,2s2-0.9,2-2C9.2,16,8.4,15.1,7.2,15.1L7.2,15.1L7.2,15.1z"
    />
    <path
      fill={colors.brand}
      d="M16.2,18.6c-0.8,0-1.5-0.7-1.5-1.5c0-0.7,0.6-1.5,1.5-1.5s1.5,0.7,1.5,1.5S17.1,18.6,16.2,18.6z"
    />
    <path
      fill={colors.brand}
      d="M16.2,16.1C16.2,16.1,16.2,16.1,16.2,16.1c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1
      C15.3,16.6,15.6,16.1,16.2,16.1 M16.2,15.1c-1.1,0-2,1-2,2c0,1.1,0.9,2,2,2s2-0.9,2-2C18.2,16,17.4,15.1,16.2,15.1L16.2,15.1
      L16.2,15.1z"
    />
    <path className={iconStrokeStyles} d="M18,13.5H7c-1,0-2-1-2-2s1-2,2-2" />
    <linearGradient
      id="gatsby-cart-icon-gradient"
      gradientUnits="userSpaceOnUse"
      x1="11"
      y1="3"
      x2="11"
      y2="10"
    >
      <stop offset="0" style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
      <stop offset="0.75" style={{ stopColor: '#FFB238' }} />
    </linearGradient>
    <path
      className={`${iconStrokeStyles} ${iconGradientStyles}`}
      d="M16.7,9.5L18.2,3H3.8l1.5,6.5C5.4,9.8,5.7,10,6.1,10h9.9C16.3,10,16.6,9.8,16.7,9.5z"
    />
    <path
      className={iconStrokeStyles}
      d="M0,1h2.7c0.4,0,0.7,0.2,0.8,0.6L3.8,3"
    />
  </svg>
);
