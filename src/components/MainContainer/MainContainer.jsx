import Container from '@mui/material/Container';
import { useStyles } from './MainContainer.styles';

const MainContainer = ({ children }) => {
  const s = useStyles();
  return <Container className={s.container}>{children}</Container>;
};

export default MainContainer;
