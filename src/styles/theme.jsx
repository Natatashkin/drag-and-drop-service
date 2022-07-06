import { createTheme } from '@mui/material';

const FONTSIZE_LARGE = '24px';
const FONTSIZE_MEDIUM = '18px';
const FONTSIZE_SMALL = '14px';

const FONTWEIGHT_BOLD = '700';
// const FONTWEIGHT_NORMAL = '400';

const LINEHEIGHT = '1';

const WHITE = '#ffffff';
const ORANGE = '#f08a16';
const VIOLET = '#ee82ee';
const BLACK = '#000000';
const BLUE = '#0099ff';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: FONTSIZE_LARGE,
      fontWeight: FONTWEIGHT_BOLD,
      lineHeight: LINEHEIGHT,
    },
    h2: {
      fontSize: FONTSIZE_MEDIUM,
      fontWeight: FONTWEIGHT_BOLD,
      lineHeight: LINEHEIGHT,
    },
    subtitle1: {
      fontSize: FONTSIZE_SMALL,
      fontWeight: FONTWEIGHT_BOLD,
      lineHeight: LINEHEIGHT,
    },
  },
  colors: {
    $white: WHITE,
    $orange: ORANGE,
    $violet: VIOLET,
    $black: BLACK,
    $blue: BLUE,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: '0',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          backgroundColor: VIOLET,
          overflowX: 'scroll',
        },

        code: {
          fontFamily:
            "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
        },
      },
    },
  },
});

export default theme;
