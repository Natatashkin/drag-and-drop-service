import { useState, useEffect, useCallback } from 'react';
import * as youtubeAPI from 'services/youtubeAPI';

export const useGetVideos = () => {
  const [lists, setLists] = useState({
    popular: {
      title: 'Popular in YouTube UA',
      items: [],
      isDefault: true,
    },
    favorite: {
      title: 'Favorite videos',
      items: [],
      isDefault: true,
    },
  });

  const getPopularVideos = useCallback(async () => {
    try {
      const response = await youtubeAPI.getVideos();
      const videosWithFavorite = response.map(video => {
        const newItem = { ...video, favorite: false };
        return newItem;
      });

      setLists(prevLists => {
        return {
          ...prevLists,
          popular: {
            ...prevLists.popular,
            items: videosWithFavorite,
          },
        };
      });
    } catch (error) {
      console.log(error.messages);
    }
  }, []);

  useEffect(() => {
    getPopularVideos();
  }, []);

  return {
    lists,
    setLists,
  };
};
