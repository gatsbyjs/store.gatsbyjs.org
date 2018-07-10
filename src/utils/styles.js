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
  brand: '#663399',
  brandBright: '#e0d6eb',
  brandLight: '#f5f3f7',
  brandLighter: '#fbfafc',
  lightest: '#ffffff',
  darkest: '#4d4058',
  textLight: '#7e718a',
  text: '#766889',
  lilac: `#9D7CBF`
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

export const fonts = {
  body: defaultFontStack,
  heading: `Futura PT, ${defaultFontStack}`
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
    padding-bottom: ${spacing.sm}px;
    padding-top: ${spacing.sm}px;
  `
};

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
    background-color: ${colors.textLight};
    border-color: ${colors.darkest};
    color: ${colors.lightest};
    cursor: pointer;
    display: block;
    margin-top: 0.75rem;
    width: 100%;

    :focus,
    :hover {
      background-color: ${colors.brand};
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
  `
};
