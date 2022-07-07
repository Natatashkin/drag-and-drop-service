export const updateLists = (
  destinationListId,
  result,
  sourceList,
  destinationList
) => {
  const list = destinationList || sourceList;
  const startList = [...sourceList];
  const finishList = [...list];
  if (!destinationList) {
    finishList.splice(result.source.index, 1);
  }
  const [removedItem] = startList.splice(result.source.index, 1);
  const newRemovedItem = {
    ...removedItem,
    favorite: destinationListId === 'favorite',
  };
  finishList.splice(result.destination.index, 0, newRemovedItem);
  return [startList, finishList];
};
