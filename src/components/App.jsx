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

    const start = result.source.droppableId;
    const finish = result.destination.droppableId;

    if (start === finish) {
      setPopularVideos(prevVideo => {
        const items = [...prevVideo];
        const [reorderedVideo] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedVideo);
        return items;
      });
      return;
    }

    const popularItems = [...popularVideos];
    const [removedItem] = popularItems.splice(result.source.index, 1);
    setPopularVideos(popularItems);

    const favoriteItems = [...favoriteVideos];
    favoriteItems.splice(result.destination.index, 0, removedItem);
    setFavoriteVideos(favoriteItems);
  };

  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <Container>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <VideoList title="Popular in YouTube UA" listId="popular">
              {popularVideos &&
                popularVideos.map((video, index) => (
                  <VideoListItem key={video.id} video={video} index={index} />
                ))}
            </VideoList>
            <VideoList title="Favorite videos" listId="favorite">
              {favoriteVideos &&
                favoriteVideos.map((video, index) => (
                  <VideoListItem key={video.id} video={video} index={index} />
                ))}
            </VideoList>
          </DragDropContext>
        </Container>
      </ThemeProvider>
    </StylesProvider>
  );
};
