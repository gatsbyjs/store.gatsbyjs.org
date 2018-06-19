import React from 'react';
import { css } from 'react-emotion';

const logo = css`
  fill: #fff;
`;

export default () => (
  <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
    <g id="monogram">
      <circle cx="14" cy="14" r="14" fill="#639" />
      <path
        className={logo}
        d="M6.2 21.8C4.1 19.7 3 16.9 3 14.2L13.9 25c-2.8-.1-5.6-1.1-7.7-3.2zM16.4 24.7L3.3 11.6C4.4 6.7 8.8 3 14 3c3.7 0 6.9 1.8 8.9 4.5l-1.5 1.3C19.7 6.5 17 5 14 5c-3.9 0-7.2 2.5-8.5 6L17 22.5c2.9-1 5.1-3.5 5.8-6.5H18v-2h7c0 5.2-3.7 9.6-8.6 10.7z"
      />
    </g>
  </svg>
);
