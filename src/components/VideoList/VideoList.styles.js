import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => {
  const {
    spacing,
    colors: { $white, $blue },
    shape: { borderRadius },
  } = theme;
  return {
    listBox: {
      minWidth: '420px',
      padding: spacing(2),
      textAlign: 'center',
      textDecorationColor: 'black',
      color: $white,
      boxSizing: 'border-box',
      backgroundColor: $blue,
      borderRadius: borderRadius,
      marginRight: spacing(5),
    },

    list: {
      boxSizing: 'border-box',
      backgroundColor: $blue,
      padding: spacing(3),
    },
  };
});
