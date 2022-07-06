import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => {
  const { spacing } = theme;
  return {
    container: {
      display: 'flex',
      minWidth: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: spacing(6),
      paddingBottom: spacing(6),
    },
  };
});
