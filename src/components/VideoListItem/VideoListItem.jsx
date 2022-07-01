import ListItem from '@mui/material/ListItem';
import { useRef, useEffect } from 'react';
import { useStyles } from './VideoListItem.styles';

const VideoListItem = ({ video }) => {
  const ref = useRef(null);
  const { id, snippet = {}, player = {} } = video;
  const { thumbnails = {}, title } = snippet;
  const { embedHtml } = player;
  const s = useStyles();

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = embedHtml;
    }
  }, [embedHtml]);

  return (
    <ListItem classes={{ root: s.li }}>
      <div ref={ref}></div>
      <p>{title}</p>
    </ListItem>
  );
};

export default VideoListItem;
