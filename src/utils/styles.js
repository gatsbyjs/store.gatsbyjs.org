import { keyframes, css } from '@emotion/react';

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
  brandLight: '#f6f0ff',
  lightest: '#ffffff',
  text: '#7026B9',
  textLight: '#7026B9',
  border: '#7026B9',
  accent: '#7026B9',
  error: `#ec1818`
};

export const badgeThemes = {
  BUILDWITHGATSBY: {
    level: 1,
    backgroundTheme: '#fff',
    textTheme: '#7026B9'
  },
  HOLYBUCKETS: {
    level: 2,
    backgroundTheme: '#fff',
    textTheme: '#7026B9'
  }
};

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '2.5rem'
};

export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700
};
// ;)

export const spacing = {
  '3xs': '2px',
  '2xs': '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
  '3xl': '48px'
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
  'Inter var',
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

const serifFontStack = [`Times New Roman`, `Times`, `serif`].join();

export const fonts = {
  body: defaultFontStack,
  heading: defaultFontStack,
  monospace: monospaceFontStack,
  serif: serifFontStack
};

export const dimensions = {
  headerHeight: '64px',
  cartWidthDesktop: '560px',
  contributorAreaWidth: {
    closedDesktop: '64px',
    openDesktop: '340px',
    openHd: '360px'
  },
  contributorAreaBarHeight: '64px',
  pictureBrowserAction: {
    widthDesktop: '200px',
    heightMobile: '80px'
  },
  gutter: {
    default: '24px',
    desktop: '32px'
  },
  interactiveMinHeight: '48px'
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
  button: `repeating-linear-gradient(75deg, ${colors.brand}, ${colors.brand}, #BC027F, ${colors.brand}, ${colors.brand})`,
  overlay: `repeating-linear-gradient(75deg, ${colors.brand}, #BC027F, #BC027F, #F67300, #FED038, #37B635, #00BDB6, #0D96F2)`
};

export const transitions = {
  sidebar: '0.25s ease',
  speed: {
    faster: '50ms',
    fast: '100ms',
    default: '250ms',
    slow: '500ms',
    slower: '1000ms'
  }
};

export const animations = {
  /* stylelint-disable */
  simpleEntry: css`
    ${simpleEntry} .75s ease forwards
  `,
  deadSimpleEntry: css`
    ${deadSimpleEntry} .5s ease forwards
  `
  /* stylelint-enable */
};

export const shadows = {
  card:
    '0 0 192px rgba(112, 38, 185, 0.1), 0 0 96px rgba(112, 38, 185, 0.2), 0 0 8px rgba(112, 38, 185, 0.05)'
};

export const borders = {
  grid: `0px solid ${colors.border}`
};

export const visuallyHidden = {
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

export const zIndices = {
  contributorArea: 100,
  closeBar: 101,
  header: 1000,
  overlay: 1001,
  cart: 1002,
  imageBrowser: 10000
};
