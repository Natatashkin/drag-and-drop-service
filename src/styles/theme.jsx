import { createTheme } from '@mui/material';

const FONTSIZE_LARGE = '32px';
const FONTSIZE_MEDIUM = '24px';
const FONTSIZE_SMALL = '14px';

const FONTWEIGHT_BOLD = '700';
// const FONTWEIGHT_NORMAL = '400';

const LINEHEIGHT = '1';

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
    $white: '#ffffff',
    $orange: '#f08a16',
    $violet: '#ee82ee',
    $black: '#000000',
  },
});

export default theme;
