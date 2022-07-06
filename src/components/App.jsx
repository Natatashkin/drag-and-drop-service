import { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { StylesProvider } from '@mui/styles';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Button } from './Button';
import theme from 'styles/theme';
import { jss, generateClassName } from 'styles/utils';
import { useGetVideos } from 'hooks/useGetVideos';
// import { reorderItems, addNewItem, replacedItem } from 'helpers/helpers';
import { MainContainer } from './MainContainer';
import { VideoList } from './VideoList';
import { VideoListItem } from './VideoListItem';
import { Form } from './Form';

export const App = () => {
  const { lists, setLists } = useGetVideos();
  const [newList, setNewList] = useState(false);

  const listsData = Object.entries(lists);

  const handleOnDragEnd = useCallback(result => {
    console.log(result);
  }, []);

  const handleGetNewList = newTitle => {
    const array = newTitle.split(' ').filter(Boolean);
    const newListId = array
      .map(item => item[0].toUpperCase() + item.substring(1, item.length))
      .join('');

    const newList = {
      [newListId]: {
        title: newTitle,
        items: [],
      },
    };
    setLists(prevLists => {
      return {
        ...prevLists,
        ...newList,
      };
    });
  };

  const handleDeleteList = id => {
    setLists(prevLists => {
      const updatedLists = Object.entries(prevLists).filter(([key]) => {
        return key !== id;
      });
      return Object.fromEntries(updatedLists);
    });
  };

  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainContainer>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {listsData.map(([listId, data]) => {
              const { title, items, isDefault } = data;
              return (
                <VideoList
                  key={listId}
                  title={title}
                  listId={listId}
                  isDefault={isDefault}
                  onDeleteList={handleDeleteList}
                >
                  {items.map((video, index) => {
                    return (
                      <VideoListItem
                        key={data.id}
                        video={video}
                        index={index}
                      />
                    );
                  })}
                </VideoList>
              );
            })}
          </DragDropContext>
          {newList ? (
            <Form
              onAddNewList={handleGetNewList}
              onCloseForm={() => setNewList(!newList)}
            />
          ) : (
            <Box>
              <Button title="Add new list" onClick={() => setNewList(true)} />
            </Box>
          )}
        </MainContainer>
      </ThemeProvider>
    </StylesProvider>
  );
};

// const handleOnDragEnd = useCallback(
//   result => {
//     if (!result.destination) return;

//     const start = result.source.droppableId;
//     const finish = result.destination.droppableId;

//     const isShouldAddNewItem = start === 'popular' && finish === 'favorite';
//     const videosCollections = [popularVideos, favoriteVideos];
//     const setCollections = [setPopularVideos, setFavoriteVideos];

//     if (start === finish) {
//       switch (finish) {
//         case 'popular':
//           setPopularVideos(prevItems => reorderItems(prevItems, result));
//           return;
//         case 'favorite':
//           setFavoriteVideos(prevItems => reorderItems(prevItems, result));
//           return;
//         default:
//           return;
//       }
//     }

//     const itemToReplace = replacedItem(
//       videosCollections[Number(!isShouldAddNewItem)],
//       setCollections[Number(!isShouldAddNewItem)],
//       result
//     );
//     addNewItem(
//       videosCollections[Number(isShouldAddNewItem)],
//       itemToReplace,
//       setCollections[Number(isShouldAddNewItem)],
//       result
//     );
//   },
//   [favoriteVideos, popularVideos]
// );

// const handleReplace = useCallback(video => {
//   const { id, favorite } = video;
//   const removeItemHandler = !favorite ? setFavoriteVideos : setPopularVideos;
//   const addItemHandler = favorite ? setFavoriteVideos : setPopularVideos;
//   addItemHandler(prev =>
//     prev.filter(({ id: innerId }) => {
//       return innerId !== id;
//     })
//   );
//   removeItemHandler(prev => {
//     const newVideo = {
//       ...video,
//       favorite: !favorite,
//     };
//     return [...prev, newVideo];
//   });
// }, []);
