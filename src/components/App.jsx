import { useState, useRef, useEffect } from 'react';
import {
  createGenerateClassName,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from '@mui/styles';
import { create } from 'jss';
import jssIncreaseSpecificity from 'jss-increase-specificity';
import { DragDropContext } from 'react-beautiful-dnd';
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
          <VideoList>
            {videos &&
              videos.map((video, index) => (
                <VideoListItem video={video} index={index} />
              ))}
          </VideoList>
        </DragDropContext>
      </Container>
    </StylesProvider>
  );
};
