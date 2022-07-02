import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => {
  const {
    spacing,
    colors: { $violet, $orange, $white },
  } = theme;
  return {
    listBox: {
      backgroundColor: $violet,
      maxWidth: 'fit-content',
      padding: spacing(2),
      textAlign: 'center',
      textDecorationColor: 'black',
      color: $white,
    },
    list: {
      maxWidth: 'fit-content',
    },
  };
});
