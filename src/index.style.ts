import {createGlobalStyle} from 'styled-components';

type TTheme = {
  background: string;
  color: string;
};

const theme: {[key: string]: TTheme} = {
  light: {
    background: 'lightblue',
    color: 'black',
  },
  dark: {
    background: 'green',
    color: 'white',
  },
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    color: ${theme.color};

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }
`;

export {GlobalStyle, theme};
