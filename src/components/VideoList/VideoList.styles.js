import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => {
  const {
    spacing,
    colors: { $violet, $white },
  } = theme;
  return {
    listBox: {
      backgroundColor: $violet,
      width: '432px',
      padding: spacing(2),
      textAlign: 'center',
      textDecorationColor: 'black',
      color: $white,
      boxSizing: 'border-box',
    },
  };
});
