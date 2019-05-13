import React from 'react';
import styled from '@emotion/styled';
import { colors, spacing } from '../../utils/styles';

const EmptyCartRoot = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 350px;
  justify-content: center;
`;

const SadCartCopy = styled('div')`
  color: ${colors.lilac};
  margin-top: ${spacing.lg}px;
  max-width: 200px;
  text-align: center;

  p {
    margin: 0;
  }
`;

const SadCart = () => (
  <svg
    width="57"
    height="57"
    viewBox="0 0 57 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.93634 0C2.48972 0 0.0839907 3.05666 0 5.91234C0 9.30197 2.6937 11.9927 5.99934 11.9927C9.30797 11.9927 11.9987 9.30197 11.9987 5.99634C11.9987 2.6877 9.30797 0 5.99934 0H5.93634ZM5.93634 2.99967H5.99934C7.65815 2.99967 8.999 4.34052 8.999 5.99634C8.999 7.65215 7.65815 8.993 5.99934 8.993C4.34352 8.993 2.99967 7.65215 2.99967 5.99634C3.03566 4.74247 4.17254 2.99967 5.93634 2.99967Z"
      transform="translate(15.7458 44.1877)"
      fill="#9D7CBF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.93634 0C2.48972 0 0.0839907 3.05666 0 5.91234C0 9.30197 2.6937 11.9927 5.99934 11.9927C9.30797 11.9927 11.9987 9.30197 11.9987 5.99634C11.9987 2.6877 9.30797 0 5.99934 0H5.93634ZM5.93634 2.99967H5.99934C7.65815 2.99967 8.999 4.34052 8.999 5.99634C8.999 7.65215 7.65815 8.993 5.99934 8.993C4.34352 8.993 2.99967 7.65215 2.99967 5.99634C3.03566 4.74247 4.17254 2.99967 5.93634 2.99967Z"
      transform="translate(42.7428 44.1877)"
      fill="#9D7CBF"
    />
    <path
      d="M38.9957 11.9987H5.99934C2.99967 11.9987 0 8.999 0 5.99934C0 2.99967 2.99967 0 5.99934 0"
      transform="translate(14.9983 27.4972)"
      stroke="#9D7CBF"
      strokeWidth="3.5"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M38.4947 19.3719L42.9102 0H0L4.41551 19.3719C4.73947 20.3437 5.64837 20.9977 6.67126 20.9977H36.239C37.2619 20.9977 38.1708 20.3437 38.4947 19.3719Z"
      transform="translate(11.5417 7.99933)"
      fill="url(#paint0_linear)"
    />
    <path
      d="M11.5418 5.99934H54.4521L50.0366 25.3712C49.7126 26.3431 48.8037 26.997 47.7808 26.997H18.2131C17.1902 26.997 16.2813 26.3431 15.9573 25.3712L11.5418 5.99934ZM11.5418 5.99934L10.4538 1.8088C10.1809 0.743917 9.21798 0 8.1201 0H0"
      transform="translate(0 2)"
      stroke="#9D7CBF"
      strokeWidth="3.5"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.90939 3.81624C0.85668 3.81624 0 2.95956 0 1.90812C0.0254585 0.995429 0.80449 0 1.88266 0C2.9621 0 3.81878 0.85668 3.81878 1.90812C3.81878 2.95956 2.9621 3.81624 1.90939 3.81624Z"
      transform="translate(35.6726 13)"
      fill="#9D7CBF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.90939 3.81624C0.85668 3.81624 0 2.95956 0 1.90812C0.0254585 0.995429 0.80449 0 1.88266 0C2.9621 0 3.81878 0.85668 3.81878 1.90812C3.81878 2.95956 2.9621 3.81624 1.90939 3.81624Z"
      transform="translate(26.2151 13)"
      fill="#9D7CBF"
    />
    <path
      d="M0 7.84727C0 6.72339 0.149188 5.64427 0.447563 4.6099C0.750911 3.57553 1.20096 2.63565 1.79771 1.79025C2.39446 0.944855 3.01359 0.348105 3.6551 0L3.93856 0.910045C3.21251 1.46701 2.61576 2.31738 2.1483 3.46115C1.68582 4.60493 1.4322 5.88545 1.38745 7.30274L1.37999 7.93679C1.37999 9.85633 1.73058 11.5223 2.43176 12.9346C2.85446 13.78 3.35672 14.4414 3.93856 14.9188L3.6551 15.7617C2.9937 15.3937 2.36214 14.777 1.76041 13.9118C0.586805 12.221 0 10.1995 0 7.84727Z"
      transform="translate(40.7617 21.0615) rotate(90)"
      fill="#9D7CBF"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x2="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(11.969 17.1557) scale(29.8329 14.5984) rotate(-90)"
      >
        <stop stopColor="#E0D6EB" />
        <stop offset="1" stopColor="#E0D6EB" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const EmptyCart = () => (
  <EmptyCartRoot>
    <SadCart />
    <SadCartCopy>
      <p>
        Your Cart is sad{' '}
        <span role="img" aria-label="sad face">
          😔
        </span>
      </p>
      <p>Turn that frown upside down with swag!</p>
    </SadCartCopy>
  </EmptyCartRoot>
);

export default EmptyCart;
