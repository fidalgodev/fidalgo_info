import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
    font-size: 62.5%; 
    box-sizing: border-box;
    line-height: 1.15;

    @media ${props => props.theme.mediaQueries.largest} {
        font-size: 60%;
    }

    @media ${props => props.theme.mediaQueries.large} {
        font-size: 57.5%;
    }

    @media ${props => props.theme.mediaQueries.small} {
        font-size: 55%;
    }
  }

  * {
    outline: none;
    box-sizing: inherit;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
  }

  ::selection {
      background: var(--primary-lighter); /* WebKit/Blink Browsers */
    }

  body {
    font-family: 'Montserrat', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", '!default';
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    --primary: ${props => props.theme.colors.main};
    --primary-light: ${props => props.theme.colors.light};
    --primary-lighter: ${props => props.theme.colors.lighter};
    --navbar: rgba(255, 255, 255, 0.95);
    --text: ${props => props.theme.colors.lightTheme.text};
    --text-highlight: ${props => props.theme.colors.lightTheme.textHighlight};
    --background: ${props => props.theme.colors.lightTheme.background};
    --tooltipBackground: ${props =>
      props.theme.colors.lightTheme.tooltipBackground};
    --white: #fff;
    --red: ${props => props.theme.colors.red};
    --shadow-btn: rgba(7, 49, 69, .1);
    --shadow-color: rgba(0, 0, 0, 0.1);
    --shadow-colorDark: rgba(0, 0, 0, 0.25);
    --shadow-colorDarker: rgba(0, 0, 0, 0.4);
    background-color: var(--background);

    &.light-mode {
      --navbar: rgba(255, 255, 255, 0.95);
      --text: ${props => props.theme.colors.lightTheme.text};
      --text-highlight: ${props => props.theme.colors.lightTheme.textHighlight};
      --background: ${props => props.theme.colors.lightTheme.background};
      --tooltipBackground: ${props =>
        props.theme.colors.lightTheme.tooltipBackground};
    }

    &.dark-mode {
      --navbar: rgba(33, 33, 33, 0.95);
      --text: ${props => props.theme.colors.darkTheme.text};
      --text-highlight: ${props => props.theme.colors.darkTheme.textHighlight};
      --background: ${props => props.theme.colors.darkTheme.background};
      --tooltipBackground: ${props =>
        props.theme.colors.darkTheme.tooltipBackground};
    }
  }

  form,
  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  .tooltipContent {
    & .react-tooltip-lite {
      border-radius: 0.5rem;
      box-shadow: 0 2rem 3rem var(--shadow-color);
    }
  }

  h3 {
    font-weight: 600;
    font-size: 2rem;
    z-index: 1;
    position: relative;
    font-style: italic;
        margin: 0;
    margin-bottom: 2.5rem;
    color: var(--white);
    transition: color 0.2s ease-out;

    @media ${props => props.theme.mediaQueries.small} {
      margin-bottom: 2rem;
    }

    @media ${props => props.theme.mediaQueries.smallest} {
      font-size: 1.8rem;
      /* margin-bottom: 1rem; */
    }

    &:not(:first-child) {
      margin-top: 5rem;
    }

    &:after {
      content: '';
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transform: rotate(-2deg);
      background: var(--primary);
    }
  }

  h4 {
    font-size: 1.8rem;
    color: var(--text-highlight);
    font-style: italic;
    font-weight: 600;

    &:not(:first-of-type) {
      margin-top: 3rem;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 60rem;
    list-style-position: inside;
    margin-top: 1.5rem;

    li {
      padding: 0;
      margin: 0;
      font-size: 1.7rem;
      color: var(--text);
      font-weight: 500;
      line-height: 1.5;
      margin-bottom: 1rem;

      & a {
        color: var(--primary);
      }
    }
  }
`;
