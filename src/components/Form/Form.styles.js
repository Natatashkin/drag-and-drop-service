import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => {
  const {
    spacing,
    colors: { $white, $blue },
  } = theme;
  return {
    formContiner: {
      minWidth: '420px',
    },
    form: {
      position: 'relative',
      backgroundColor: $white,
      padding: spacing(2),
    },

    closeIcon: {
      position: 'absolute',
      top: '0',
      right: '0',
    },

    submitFormButton: {
      visibility: 'visible',
      color: $blue,
    },
    submitFormButtonHidden: {
      visibility: 'hidden',
    },
  };
});
