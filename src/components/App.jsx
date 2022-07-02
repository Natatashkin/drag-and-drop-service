import { useState, useRef, useEffect } from 'react';
import { StylesProvider } from '@mui/styles';
import { ThemeProvider } from '@mui/material';
import theme from 'styles/theme';
import { jss, generateClassName } from 'styles/utils';
import { DragDropContext } from 'react-beautiful-dnd';
import { useGetVideos } from 'hooks/useGetVideos';
import { Container } from './Container';
import { VideoList } from './VideoList';
import { VideoListItem } from './VideoListItem';
import { FavoriteVideoList } from './FavotiteVideoList';

export const App = () => {
  const { videos } = useGetVideos();
  const [popularVideos, setPopularVideos] = useState([]);
  const [favoriteVideos, setFavoriteVideos] = useState([]);

  useEffect(() => {
    setPopularVideos(videos);
  }, [videos]);

  const handleOnDragEnd = result => {
    console.log(result);
    if (!result.destination) return;
    const items = Array.from(popularVideos);
    const [reorderedVideo] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedVideo);

    setPopularVideos(items);
  };

  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <Container>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <VideoList>
              {popularVideos &&
                popularVideos.map((video, index) => (
                  <VideoListItem key={video.id} video={video} index={index} />
                ))}
            </VideoList>
          </DragDropContext>
        </Container>
      </ThemeProvider>
    </StylesProvider>
  );
};
