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

  const reorderItems = (items, result) => {
    const videos = [...items];
    const [reorderedVideo] = videos.splice(result.source.index, 1);
    videos.splice(result.destination.index, 0, reorderedVideo);
    return videos;
  };

  const replacedItem = (targetList, handler, result) => {
    const items = [...targetList];
    const [removedItem] = items.splice(result.source.index, 1);
    handler(items);
    return removedItem;
  };

  const addNewItem = (targetList, newItem, handler, result) => {
    const items = [...targetList];
    items.splice(result.destination.index, 0, newItem);
    handler(items);
  };

  useEffect(() => {
    setPopularVideos(videos);
  }, [videos]);

  const handleOnDragEnd = result => {
    if (!result.destination) return;

    const start = result.source.droppableId;
    const finish = result.destination.droppableId;

    if (start === finish) {
      switch (finish) {
        case 'popular':
          setPopularVideos(prevItems => reorderItems(prevItems, result));
          return;
        case 'favorite':
          setFavoriteVideos(prevItems => reorderItems(prevItems, result));
          return;
        default:
          return;
      }
    }

    const isShouldAddNewItem = start === 'popular' && finish === 'favorite';

    if (isShouldAddNewItem) {
      const itemToReplace = replacedItem(
        popularVideos,
        setPopularVideos,
        result
      );
      addNewItem(favoriteVideos, itemToReplace, setFavoriteVideos, result);
      return;
    }

    const itemToReplace = replacedItem(
      favoriteVideos,
      setFavoriteVideos,
      result
    );
    addNewItem(popularVideos, itemToReplace, setPopularVideos, result);
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
