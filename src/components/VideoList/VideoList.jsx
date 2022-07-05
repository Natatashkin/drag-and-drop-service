import { Droppable } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

import { useStyles } from './VideoList.styles';

const VideoList = ({ title, listId, children }) => {
  const s = useStyles();
  return (
    <Box className={s.listBox}>
      <Typography variant="h1" gutterBottom>
        {title}
      </Typography>
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
