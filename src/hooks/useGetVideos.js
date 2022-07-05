import { useState, useEffect, useCallback } from 'react';
import * as youtubeAPI from 'services/youtubeAPI';

export const useGetVideos = () => {
  const [popularVideos, setPopularVideos] = useState([]);
  const [favoriteVideos, setFavoriteVideos] = useState([]);

  const getPopularVideos = useCallback(async () => {
    try {
      const response = await youtubeAPI.getVideos();
      const videosWithFavorite = response.map(video => {
        const newItem = { ...video, favorite: false };
        return newItem;
      });
      setPopularVideos(videosWithFavorite);
    } catch (error) {
      console.log(error.messages);
    }
  }, []);

  useEffect(() => {
    getPopularVideos();
  }, []);

  return {
    popularVideos,
    setPopularVideos,
    favoriteVideos,
    setFavoriteVideos,
  };
};
