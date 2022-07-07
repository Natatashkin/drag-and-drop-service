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
import { updateLists } from 'helpers/helpers';
import { MainContainer } from './MainContainer';
import { VideoList } from './VideoList';
import { VideoListItem } from './VideoListItem';
import { Form } from './Form';

export const App = () => {
  const { lists, setLists } = useGetVideos();
  const [newList, setNewList] = useState(false);
  const listsData = Object.entries(lists);

  const handleOnDragEnd = useCallback(
    result => {
      if (!result.destination) return;

      const startListId = result.source.droppableId;
      const finishListId = result.destination.droppableId;
      const startList = lists[startListId].items;
      const finishList = lists[finishListId].items;

      const isListIdEqual = startListId === finishListId;

      const [firstList, secondList] = updateLists(
        finishListId,
        result,
        startList,
        isListIdEqual ? null : finishList
      );

      setLists(prev => {
        const compareListsResult = {};
        const destinationList = {
          ...prev[finishListId],
          items: secondList,
        };

        const sourceList = {
          ...prev[startListId],
          items: firstList,
        };

        if (isListIdEqual) {
          compareListsResult[finishListId] = { ...destinationList };
        } else {
          compareListsResult[startListId] = { ...sourceList };
          compareListsResult[finishListId] = { ...destinationList };
        }

        return {
          ...prev,
          ...compareListsResult,
        };
      });
    },
    [lists]
  );

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

  const toggleFavoriteVideo = (listId, video) => {
    setLists(prev => {
      const isFavorite = listId === 'favorite';
      const formattedVideo = {
        ...video,
        favorite: !isFavorite,
      };
      const newItems = prev[listId].items.filter(({ id }) => id !== video.id);
      const listKey = isFavorite ? 'favorite' : listId;
      const destinationListKey = isFavorite ? 'popular' : 'favorite';
      return {
        ...prev,
        [listKey]: {
          ...prev[listKey],
          items: newItems,
        },
        [destinationListKey]: {
          ...prev[destinationListKey],
          items: [formattedVideo, ...prev[destinationListKey].items],
        },
      };
    });
  };

  const handleDeleteList = (id, deletedListItems) => {
    setLists(prev => {
      const formattedPopular = {
        ...prev.popular,
        items: [...deletedListItems, ...prev.popular.items],
      };
      delete prev[id];
      return {
        ...prev,
        popular: {
          ...formattedPopular,
        },
      };
    });
    // setLists(prevLists => {
    //   const allLists = Object.entries(prevLists);
    //   const listToDel = allLists.find(([key]) => key === id);
    //   const videos = listToDel[1].items;
    //   console.log(videos);
    //   const updatedLists = Object.entries(prevLists).filter(([key]) => {
    //     return key !== id;
    //   });
    //   const x = updatedLists.map(([key, values]) => {
    //     if (key === 'popular') {
    //       console.log(values);
    //       const arr = values.items;
    //       const newItems = [...arr, ...videos];
    //       return;
    //     }
    //   });
    //   console.log(updatedLists);
    //   return Object.fromEntries(updatedLists);
    // });
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
                  items={items}
                  listId={listId}
                  isDefault={isDefault}
                  onDeleteList={handleDeleteList}
                >
                  {items.map((video, index) => {
                    return (
                      <VideoListItem
                        key={video.id}
                        video={video}
                        index={index}
                        replaceVideo={() => toggleFavoriteVideo(listId, video)}
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
