import { Droppable } from 'react-beautiful-dnd';
import { useStyles } from './VideoList.styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

const VideoList = ({ children }) => {
  const s = useStyles();
  return (
    <Box className={s.listBox}>
      <Typography variant="h1" gutterBottom>
        Popular in YouTube UA
      </Typography>
      <Droppable droppableId="videoList">
        {provided => (
          <List
            classes={{ root: s.list }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {children}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Box>
  );
};

export default VideoList;
