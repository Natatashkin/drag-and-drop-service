const reorderItems = (items, result) => {
  const videos = [...items];
  const [reorderedVideo] = videos.splice(result.source.index, 1);
  videos.splice(result.destination.index, 0, reorderedVideo);
  return videos;
};

const addNewItem = (targetList, newItem, handler, result) => {
  const { destination } = result;
  const shouldItemUpdate = destination.droppableId === 'favorite';
  const items = targetList;
  items.splice(destination.index, 0, {
    ...newItem,
    favorite: shouldItemUpdate,
  });
  handler(items);
};

const replacedItem = (targetList, handler, result) => {
  const items = [...targetList];
  const [removedItem] = items.splice(result.source.index, 1);
  handler(items);
  return removedItem;
};

export { reorderItems, addNewItem, replacedItem };
