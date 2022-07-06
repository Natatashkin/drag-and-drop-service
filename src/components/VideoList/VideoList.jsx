import { Droppable } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

import { VideoListTitle } from '../VideoListTitle';
import { useStyles } from './VideoList.styles';

const VideoList = ({ title, listId, onDeleteList, children }) => {
  const s = useStyles();

  return (
    <Box className={s.listBox}>
      <VideoListTitle title={title} onDeleteList={() => onDeleteList(listId)} />
      <Droppable droppableId={listId}>
        {provided => {
          return (
            <List
              className={s.list}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {children}
              {provided.placeholder}
            </List>
          );
        }}
      </Droppable>
    </Box>
  );
};

export default VideoList;
