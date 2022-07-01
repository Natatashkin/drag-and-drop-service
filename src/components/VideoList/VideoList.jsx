import { useStyles } from './VideoList.styles';
import List from '@mui/material/List';

const VideoList = ({ children }) => {
  const s = useStyles();
  return <List className="videos">{children}</List>;
};

export default VideoList;
