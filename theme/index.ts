import { createMuiTheme } from '@material-ui/core/styles';
import { Theme as MUITheme } from '@material-ui/core/styles/createMuiTheme';

const primary = {
  main: '#f18410',
  contrastText: '#fff',
};

const secondary = {
  main: '#90a0b7',
};

const additionalPalette = {
  accentBlue: '#109cf1',
  accentBlueRgb: '16, 156, 241',
  accentBlueStrong: '#c2cfe0',
  yellow: '#ffb946',
  red: '#f7685b',
  green: '#2ed47a',
  purple: '#885af8',
  text: '#333',
  border: '#e0e0e0',
  title: '#334d6e',
  accentBlueBackground: 'rgba(194, 207, 224, 0.25)',
};

export interface Theme extends MUITheme {
  additionalPalette: {
    accentBlue: string;
    yellow: string;
    red: string;
    green: string;
    purple: string;
    text: string;
    border: string;
    title: string;
    accentBlueBackground: string;
  };
}

export const themeObject = {
  palette: {
    primary,
    secondary,
    background: {
      default: '#f5f6f8',
    },
  },
  shape: {
    borderRadius: 0,
  },
  additionalPalette,
  mixins: {
    toolbar: {
      height: 64,
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#fff',
        color: additionalPalette.text,
      },
    },
    MuiButton: {
      root: {
        borderRadius: 25,
      },
    },
    MuiDialogTitle: {
      root: {
        color: additionalPalette.title,
      },
    },
  },
};

export default createMuiTheme(themeObject);

type TSymbols = {
  [index: string]: string;
};

export const currencySymbols: TSymbols = {
  us: '\u0024',
  eu: '\u20AC',
};
