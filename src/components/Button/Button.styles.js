import makeStyles from '@mui/styles/makeStyles';

export const useSyles = makeStyles(theme => {
  const {
    colors: { $blue },
  } = theme;
  return {
    button: {
      backgroundColor: $blue,
      marginTop: '59px',
    },
  };
});
