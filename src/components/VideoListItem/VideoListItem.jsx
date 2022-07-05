import { Draggable } from 'react-beautiful-dnd';
import { useRef, useEffect } from 'react';
import { useStyles } from './VideoListItem.styles';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import classNames from 'classnames';

const VideoListItem = ({ video, index, replaceVideo }) => {
  const ref = useRef(null);
  const { id, snippet = {}, player = {}, favorite = false } = video;
  const { title } = snippet;
  const { embedHtml } = player;
  const s = useStyles();

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = embedHtml;
    }
  }, [embedHtml]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <ListItem
            disablePadding
            ref={provided.innerRef}
            classes={{ root: s.li }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <Box className={s.iframeBox} ref={ref}></Box>
            <Box className={s.titleWrapper}>
              <Typography
                variant="subtitle1"
                classes={{ subtitle1: s.videoTitle }}
              >
                {title}
              </Typography>
              <Box
                className={classNames([
                  s.iconFavoriteBox,
                  {
                    [s.iconFavoriteActive]: snapshot.isDragging,
                    [s.iconFavoriteActive]: favorite,
                  },
                ])}
                onClick={() => {
                  replaceVideo(video);
                }}
              >
                {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </Box>
            </Box>
          </ListItem>
        );
      }}
    </Draggable>
  );
};

export default VideoListItem;
