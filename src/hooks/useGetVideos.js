import { useState, useEffect, useCallback } from 'react';
import * as youtubeAPI from 'services/youtubeAPI';

export const useGetVideos = () => {
  const [videos, setVideos] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const getPopularVideos = useCallback(async () => {
    try {
      const response = await youtubeAPI.getVideos();
      console.log(response);
      setVideos([...response]);
    } catch (error) {
      console.log(error.messages);
    }
  }, []);

  useEffect(() => {
    getPopularVideos();
  }, [getPopularVideos]);

  return { videos };
};
