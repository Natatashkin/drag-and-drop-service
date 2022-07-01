import { useState, useRef, useEffect } from 'react';
import {
  createGenerateClassName,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from '@mui/styles';
import { create } from 'jss';
import jssIncreaseSpecificity from 'jss-increase-specificity';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useGetVideos } from 'hooks/useGetVideos';
import { Container } from './Container';
import { VideoList } from './VideoList';
import { VideoListItem } from './VideoListItem';
import { FavoriteVideoList } from './FavotiteVideoList';

const jss = create({
  plugins: [...jssPreset().plugins, jssIncreaseSpecificity()],
});

const generateClassName = createGenerateClassName({
  productionPrefix: 'ntshkn-',
  disableGlobal: false,
  seed: 'ntshkn',
});

export const App = () => {
  const { videos } = useGetVideos();

  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <Container>
        <DragDropContext>
          <Droppable droppableId="videos">
            {provided => (
              <VideoList {...provided.droppableProps} ref={provided.innerRef}>
                {Boolean(videos?.length) &&
                  videos.map((video, index) => {
                    return (
                      <Draggable
                        key={video.id}
                        draggableId={video.id}
                        index={index}
                      >
                        {provided => (
                          <VideoListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            video={video}
                          />
                        )}
                      </Draggable>
                    );
                  })}
              </VideoList>
            )}
          </Droppable>
          {/* <Droppable> */}
          {/* <FavoriteVideoList ref={favoriteRef}></FavoriteVideoList> */}
          {/* </Droppable> */}
        </DragDropContext>
      </Container>
    </StylesProvider>
  );
};
