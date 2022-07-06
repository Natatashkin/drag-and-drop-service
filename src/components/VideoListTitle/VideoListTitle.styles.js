import { capitalize } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => {
  const {
    colors: { $white },
  } = theme;
  return {
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      textTransform: 'capitalize',
    },

    icon: {
      color: $white,
    },
  };
});
