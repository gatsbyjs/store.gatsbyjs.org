import { keyframes, css } from '@emotion/core';

/*
 * NOTE: use a six-character hex code for all colors to allow alpha channel
 * adjustment without adding extra vars and/or a color manipulation lib.
 *
 * Example:
 *    // use the brand color at 25% opacity
 *    border-color: ${colors.brand}40;
 *
 * Also ref. https://css-tricks.com/8-digit-hex-codes/
 */
export const colors = {
  brand: '#7026B9',
  brandBright: '#F1DEFA',
  brandLight: '#F6EDFA',
  lightest: '#ffffff',
  darkest: '#4d4058',
  text: '#36313D',
  textLight: '#78757A',
  border: '#dddddd',
  accent: `#BC027F`,
  error: `#ec1818`
};

export const badgeThemes = {
  BUILDWITHGATSBY: {
    level: 1,
    backgroundTheme: '#F67300',
    textTheme: colors.lightest
  },
  HOLYBUCKETS: {
    level: 2,
    backgroundTheme: '#FEC21E',
    textTheme: colors.text
  }
};

export const fontSizes = {
  '2xs': '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
  '4xl': '4rem'
};

export const spacing = {
  '3xs': 2,
  '2xs': 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48
};

export const lineHeights = {
  solid: 1,
  dense: 1.25,
  default: 1.5
};

export const breakpoints = {
  mobile: 400,
  phablet: 550,
  tablet: 750,
  desktop: 1000,
  hd: 1300
};

export const radius = {
  sm: 2,
  md: 4,
  lg: 8,
  round: 9999
};

export const defaultFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Open Sans',
  'Helvetica Neue',
  'sans-serif'
].join();

const monospaceFontStack = [
  `SFMono-Regular`,
  `Menlo`,
  `Monaco`,
  `Consolas`,
  `Liberation Mono`,
  `Courier New`,
  `monospace`
].join();

export const fonts = {
  body: defaultFontStack,
  heading: `${defaultFontStack}`,
  monospace: monospaceFontStack
};

export const dimensions = {
  headerHeight: '64px',
  cartWidthDesktop: '420px',
  contributorAreaWidth: {
    closedDesktop: '64px',
    openDesktop: '340px',
    openHd: '420px'
  },
  contributorAreaBarHeight: '64px',
  pictureBrowserAction: {
    widthDesktop: '200px',
    heightMobile: '80px'
  }
};

const simpleEntry = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const deadSimpleEntry = keyframes`
  from {
    opacity: .25;
  }
`;

export const gradients = {
  default: 'linear-gradient(0deg, #0C0717, #442266)',
  button: 'linear-gradient(90deg, #BC027F, #7026B9)',
  buttonHover: 'linear-gradient(90deg, #940159, #7026B9)'
};

export const transitions = {
  sidebar: '0.25s ease'
};

export const animations = {
  simpleEntry: css`
    ${simpleEntry} .75s ease forwards
  `,
  deadSimpleEntry: css`
    ${deadSimpleEntry} .5s ease forwards
  `
};

export const visuallyHidden = {
  // be explicit and include a unit (`px`)
  // so we can use it with e. g. `sx`
  border: 0,
  clip: `rect(0, 0, 0, 0)`,
  height: `1px`,
  margin: `-1px`,
  overflow: `hidden`,
  padding: 0,
  position: `absolute`,
  whiteSpace: `nowrap`,
  width: `1px`
};
