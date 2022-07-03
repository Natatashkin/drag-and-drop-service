import { Container as AppContainer } from '@mui/material';
import { useStyles } from './Container.styles';

const Container = ({ children }) => {
  const s = useStyles();
  return <AppContainer className={s.container}>{children}</AppContainer>;
};

export default Container;
