import axios from 'axios';
axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3/videos';

export const getVideos = async () => {
  const response = await axios.get(
    `?key=${process.env.REACT_APP_API_KEY}&chart=mostPopular&part=snippet,player`
  );
  return response.data.items;
};
