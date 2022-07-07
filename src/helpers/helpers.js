export const updateLists = (result, sourceList, destinationList) => {
  if (!destinationList) {
    const videos = [...sourceList];
    const [reorderedVideo] = videos.splice(result.source.index, 1);
    videos.splice(result.destination.index, 0, reorderedVideo);
    return videos;
  }

  const startList = [...sourceList];
  const finishList = [...destinationList];
  const [removedItem] = startList.splice(result.source.index, 1);
  finishList.splice(result.destination.index, 0, removedItem);
  return [startList, finishList];
};
