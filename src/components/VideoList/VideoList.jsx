import { Droppable } from 'react-beautiful-dnd';
import { useStyles } from './VideoList.styles';
import List from '@mui/material/List';

const VideoList = ({ children }) => {
  const s = useStyles();
  return (
    <Droppable droppableId="videoList">
      {provided => (
        <List ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default VideoList;
