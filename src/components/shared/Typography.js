import styled, { keyframes, css } from 'react-emotion';
import { colors, fonts } from '../../utils/styles';

const loading = keyframes`
  from { background-position-x: 0; }
  to { background-position-x: 200%; }
`;

const hideText = css`
  color: transparent;
  position: relative;
`;

const loadingBar = css`
  animation: ${loading} 2s ease infinite;
  /*
      You’re my sunshine after the rain 
      You’re the cure against my fear and my pain 
      ’Cause I’m losing my mind 
      When you’re not around 
      It’s all, it’s all 
      It’s all because of you
    */
  background-image: linear-gradient(
    98deg,
    ${colors.brandLighter} 0%,
    ${colors.brandLighter} 62%,
    ${colors.brand}10 63%,
    ${colors.brandLighter} 64%,
    ${colors.brand}10 65%,
    ${colors.brand}10 66%,
    ${colors.brandLighter} 67%,
    ${colors.brand}10 68%,
    ${colors.brand}10 72%,
    ${colors.brandLighter} 90%,
    ${colors.brandLighter} 100%
  );
  background-position-x: 0;
  background-size: 200%;
  border-radius: 3px;
  display: block;
  height: 1em;
`;

const loadingBarOverlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const loadingStyles = css`
  ${hideText};

  ::after {
    ${loadingBar};
    content: ' ';
  }
`;

export const Heading = styled('h2')`
  color: ${colors.darkest};
  font-family: ${fonts.heading};
  font-size: 1.5rem;
  margin: 0;

  &.loading {
    ${loadingStyles};

    ::after {
      ${loadingBarOverlay};
      width: 65%;
    }
  }
`;

export const HeadingInverted = styled(Heading)`
  color: ${colors.lightest};
`;

export const Subheading = styled('h3')`
  color: ${colors.darkest};
  font-family: ${fonts.heading};
  font-size: 1.125rem;
  margin: 1.5rem 0 0;

  &.loading {
    ${loadingStyles};

    ::after {
      ${loadingBarOverlay};
      width: 45%;
    }
  }
`;

export const Lede = styled('p')`
  color: ${colors.text};
  font-size: 1.125rem;
  margin: 0.5rem 0 0;

  &.loading {
    ${loadingStyles};
    height: 1em;

    ::after {
      ${loadingBarOverlay};
      height: 1em;
    }
  }
`;

export const Text = styled('p')`
  color: ${colors.text};
  font-size: 1rem;
  margin: 1rem 0 0;

  /* This is kind of hacky; maybe we can improve this? */
  &.loading {
    ${loadingStyles};
    ${loadingBar};
    height: 1em;
    margin-bottom: 2em;
    position: relative;

    ::after {
      position: absolute;
      top: 1.45em;
      width: 95%;
    }
  }
`;

export const UnorderedList = styled('ul')`
  color: ${colors.text};
  margin: 1rem 0 0;

  li {
    margin: 0 0 0.25rem;
  }

  a {
    color: ${colors.text};
  }
`;
