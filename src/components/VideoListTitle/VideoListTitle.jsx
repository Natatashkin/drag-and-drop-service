import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { IconButton } from '../IconButton';
import { useStyles } from './VideoListTitle.styles';

const VideoListTitle = ({ title, onDeleteList }) => {
  // const handleDeleteIconClick = () => {};
  const s = useStyles();
  return (
    <Box className={s.titleContainer}>
      <Typography variant="h1">{title}</Typography>
      <IconButton
        buttonStyles={s.icon}
        icon={<DeleteForeverIcon />}
        onClick={onDeleteList}
      />
    </Box>
  );
};

export default VideoListTitle;
