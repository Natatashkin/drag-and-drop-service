import { Draggable } from 'react-beautiful-dnd';
import { useRef, useEffect } from 'react';
import { useStyles } from './VideoListItem.styles';
import ListItem from '@mui/material/ListItem';

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
          ref={provided.innerRef}
          classes={{ root: s.li }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div ref={ref}></div>
          <p>{title}</p>
        </ListItem>
      )}
    </Draggable>
  );
};

export default VideoListItem;
