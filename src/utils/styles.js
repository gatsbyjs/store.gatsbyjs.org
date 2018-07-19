import { css } from 'react-emotion';

/*
 * NOTE: use a six-character hex code for all colors to allow alpha channel
 * adjustment without adding extra vars and/or a color manipulation lib.
 *
 * Example:
 *    // use the brand color at 25% opacity
 *    border-color: ${colors.brand}40;
 */
export const colors = {
  brandDarker: '#221133',
  brandDark: '#442266',
  brand: '#663399',
  brandBright: '#e0d6eb',
  brandLight: '#f5f3f7',
  brandLighter: '#fbfafc',
  lightest: '#ffffff',
  darkest: '#4d4058',
  textLight: '#7e718a',
  textLighter: '#aaaaaa',
  text: '#333333',
  lilac: `#8c65b3`,
  accent: `#ffb238`
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

export const breakpoints = {
  mobile: 400,
  phablet: 550,
  tablet: 750,
  desktop: 1000,
  hd: 1200
};

export const radius = {
  default: 2,
  large: 4
};

const defaultFontStack = [
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
  `Space Mono`,
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
  heading: `Futura PT, ${defaultFontStack}`,
  monospace: monospaceFontStack
};

export const dropdown = {
  container: css`
    background: ${colors.lightest};
    border: 1px solid ${colors.brandBright};
    border-radius: ${radius.default}px;
    border-top-right-radius: 0;
    box-shadow: 0 3px 8px ${colors.textLight}40;
    box-sizing: border-box;
    margin-top: ${spacing['2xs']}px;
    padding: ${spacing.sm}px;
    position: absolute;
    right: ${spacing.sm + spacing.xs}px;
    top: 100%;

    &::before,
    &::after {
      content: ' ';
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }

    &::before {
      top: -12px;
      right: -1px;
      border-width: 0 0 12px 12px;
      border-color: transparent transparent ${colors.brandBright} transparent;
    }

    &::after {
      top: -10px;
      right: 0;
      border-width: 0 0 10px 10px;
      border-color: transparent transparent ${colors.lightest} transparent;
    }
  `,
  heading: css`
    color: ${colors.brand};
    font-size: 0.75rem;
    font-weight: normal;
    margin: 0 0 ${spacing.sm}px;
  `,
  divider: css`
    background: ${colors.brandLight};
    height: 1px;
    margin-left: -${spacing.sm}px;
    margin-right: -${spacing.sm}px;
  `,
  item: css`
    color: #000;
    display: block;
    font-size: 0.875rem;
    margin-left: -${spacing.sm}px;
    margin-right: -${spacing.sm}px;
    padding: ${spacing.sm}px;

    &:hover {
      background-color: ${colors.brandLighter};
      color: ${colors.brand};
    }
  `
};

export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const input = {
  default: css`
    background-color: ${colors.lightest};
    border: 1px solid ${colors.brandBright};
    border-radius: ${radius.default}px;
    box-sizing: border-box;
    color: ${colors.text};
    display: block;
    font-size: 1rem;
    padding: ${spacing.xs}px ${spacing.sm}px;
  `,
  small: css`
    font-size: 0.75rem;
    padding: ${spacing.xs}px;
  `,
  focus: css`
    border-color: ${colors.lilac};
    box-shadow: 0 0 0 3px ${colors.brandBright};
    outline: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  `
};

export const select = {
  default: css`
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23${colors.lilac.substr(
    1
  )}' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 8px 10px;
  padding-right: ${spacing.xl}px !important;
`,
  small: css`
    padding-right: ${spacing.xl}px !important;
  `
};

export const link = css`
  border-bottom: 1px solid ${colors.brand};
  color: ${colors.brand};
  text-decoration: none;
`;

export const button = {
  default: css`
    background-color: ${colors.lightest};
    border: 1px solid ${colors.brandBright};
    border-radius: ${radius.default}px;
    box-sizing: border-box;
    color: ${colors.brand};
    cursor: pointer;
    display: block;
    font-family: ${fonts.body};
    margin: 0;
    min-height: 2.25rem;
    padding: ${spacing.xs}px ${spacing.sm}px;
    text-align: center;
    text-decoration: none;
    transition: 200ms background linear, 100ms border-color linear;

    :focus,
    :hover {
      background: ${colors.brand}0c;
    }

    &[disabled] {
      background-color: ${colors.lightest};
      cursor: not-allowed;
    }
  `,
  small: css`
    font-size: 0.875rem;
  `,
  big: css`
    font-family: ${fonts.heading};
    font-size: 1.25rem;
    padding: 0.25em 0.625em;
  `,
  purple: css`
    background-color: ${colors.brand};
    border-color: ${colors.lilac};
    color: ${colors.lightest};
    cursor: pointer;
    display: block;
    margin-top: 0.75rem;
    width: 100%;

    :focus,
    :hover {
      background-color: ${colors.brandDark};
    }

    &[disabled] {
      background-color: ${colors.textLight};
    }
  `,
  ghost: css`
    border: 1px solid transparent;

    :focus,
    :hover {
      background: ${colors.lightest};
      border-color: ${colors.brandBright};
    }
  `,
  link: css`
    border: 0;
    ${link};
    background: transparent;
    cursor: pointer;
    padding: 0;
    font-size: 100%;
  `
};

export const pullHeadline = css`
  font-family: ${fonts.heading};

  @media (min-width: ${breakpoints.hd}px) {
    position: absolute;
    left: -240px;
    top: 0;
    width: 180px;
    font-size: 3rem;
    line-height: 1;
    margin-top: 0;
  }
`;
