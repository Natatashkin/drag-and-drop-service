import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => {
  const {
    spacing,
    colors: { $violet, $white, $blue },
  } = theme;
  return {
    listBox: {
      width: '420px',
      padding: spacing(2),
      textAlign: 'center',
      textDecorationColor: 'black',
      color: $white,
      boxSizing: 'border-box',
    },

    list: {
      boxSizing: 'border-box',
      backgroundColor: $blue,
      padding: spacing(3),
    },
  };
});
