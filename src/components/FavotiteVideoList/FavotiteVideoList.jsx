import { useStyles } from './VideoList.styles';
import List from '@mui/material/List';

const FavoriteVideoList = ({ children }) => {
  const s = useStyles();
  return <List>{children}</List>;
};

export default FavoriteVideoList;
