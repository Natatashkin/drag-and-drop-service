import { useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { StylesProvider } from '@mui/styles';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'styles/theme';
import { jss, generateClassName } from 'styles/utils';
import { useGetVideos } from 'hooks/useGetVideos';
import { reorderItems, addNewItem, replacedItem } from 'helpers/helpers';
import { Container } from './Container';
import { VideoList } from './VideoList';
import { VideoListItem } from './VideoListItem';

export const App = () => {
  const { popularVideos, setPopularVideos, favoriteVideos, setFavoriteVideos } =
    useGetVideos();

  const handleOnDragEnd = useCallback(
    result => {
      if (!result.destination) return;

      const start = result.source.droppableId;
      const finish = result.destination.droppableId;

      const isShouldAddNewItem = start === 'popular' && finish === 'favorite';
      const videosCollections = [popularVideos, favoriteVideos];
      const setCollections = [setPopularVideos, setFavoriteVideos];

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

      const itemToReplace = replacedItem(
        videosCollections[Number(!isShouldAddNewItem)],
        setCollections[Number(!isShouldAddNewItem)],
        result
      );
      addNewItem(
        videosCollections[Number(isShouldAddNewItem)],
        itemToReplace,
        setCollections[Number(isShouldAddNewItem)],
        result
      );
    },
    [favoriteVideos, popularVideos]
  );

  const handleReplace = useCallback(video => {
    const { id, favorite } = video;
    const removeItemHandler = !favorite ? setFavoriteVideos : setPopularVideos;
    const addItemHandler = favorite ? setFavoriteVideos : setPopularVideos;
    addItemHandler(prev =>
      prev.filter(({ id: innerId }) => {
        return innerId !== id;
      })
    );
    removeItemHandler(prev => {
      const newVideo = {
        ...video,
        favorite: !favorite,
      };
      return [...prev, newVideo];
    });
  }, []);

  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <VideoList title="Popular in YouTube UA" listId="popular">
              {Boolean(popularVideos.length) &&
                popularVideos.map((video, index) => (
                  <VideoListItem
                    key={video.id}
                    video={video}
                    index={index}
                    replaceVideo={handleReplace}
                  />
                ))}
            </VideoList>
            <VideoList title="Favorite videos" listId="favorite">
              {Boolean(favoriteVideos.length) &&
                favoriteVideos.map((video, index) => (
                  <VideoListItem
                    key={video.id}
                    video={video}
                    index={index}
                    replaceVideo={handleReplace}
                  />
                ))}
            </VideoList>
          </DragDropContext>
        </Container>
      </ThemeProvider>
    </StylesProvider>
  );
};
