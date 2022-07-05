import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => {
  const {
    colors: { $white, $orange, $black },
    spacing,
    shadows,
  } = theme;
  return {
    li: {
      width: '340px',
      flexDirection: 'column',
      alignItems: 'center',
      color: $black,
      backgroundColor: $white,
      boxShadow: shadows[5],

      '&:not(:last-child)': {
        marginBottom: spacing(4),
      },
    },

    iframeBox: {
      '& iframe': {
        display: 'block',
      },
    },

    titleWrapper: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: $white,
    },

    iconFavoriteBox: {
      padding: spacing(2),
      '&:hover svg': {
        fill: $orange,
      },
    },

    iconFavoriteActive: {
      '& svg': {
        fill: $orange,
      },
    },

    videoTitle: {
      padding: spacing(2),
      paddingRight: '0',
    },
  };
});
