import { Draggable } from 'react-beautiful-dnd';
import { useRef, useEffect } from 'react';
import { useStyles } from './VideoListItem.styles';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const VideoListItem = ({ video, index }) => {
  const ref = useRef(null);
  const { id, snippet = {}, player = {} } = video;
  const { thumbnails = {}, title } = snippet;
  const { embedHtml } = player;
  const s = useStyles();

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = embedHtml;
    }
  }, [embedHtml]);

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <ListItem
          disablePadding
          ref={provided.innerRef}
          classes={{ root: s.li }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box className={s.iframeBox} ref={ref}></Box>
          <Box className={s.titleWrapper}>
            <Typography
              variant="subtitle1"
              classes={{ subtitle1: s.videoTitle }}
            >
              {title}
            </Typography>
            <Box className={s.iconFavoriteBox}>
              <FavoriteBorderIcon />
            </Box>
          </Box>
        </ListItem>
      )}
    </Draggable>
  );
};

export default VideoListItem;
