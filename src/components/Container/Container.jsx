import Box from '@mui/material/Box';
import { useStyles } from './Container.styles';

const Container = ({ children }) => {
  const s = useStyles();
  return <Box className={s.container}>{children}</Box>;
};

export default Container;
