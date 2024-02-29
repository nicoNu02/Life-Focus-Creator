import { helpHttp } from "./helpHttp";

function helpDragDrop(results, db, board, endpointDatabase) {
  const { destination, source } = results;
  if (!destination) return;
  const newDb = [...db];
  const movedItem = newDb[source.index];

  if (destination.droppableId == source.droppableId) {
    newDb.splice(source.index, 1);
    newDb.splice(destination.index, 0, movedItem);
    let sourceIn = source.index;
    source.index = destination.index;
    destination.index = sourceIn;
  }
  if (destination.droppableId !== source.droppableId) {
    // Update the section of the moved task if its dropped into a different section
    movedItem.section = destination.droppableId;
    const removedItem = newDb.splice(source.index, 1)[0];
    //adjusted the destination (la logica de esa linea esta sacada de internet)
    const adjustedDestinationIndex =
      destination.index - (source.index < destination.index ? 1 : 0);
    newDb.splice(adjustedDestinationIndex, 0, movedItem);
    source.index = adjustedDestinationIndex;
    destination.index = source.index;
  }

  // sorting task by section
  let sortedDb = [];
  board.map((section) => {
    newDb.map((it) => {
      if (it.section == section) {
        sortedDb.push(it);
      }
    });
  });

  sortedDb.map((it) => {
    let endpoint = `${endpointDatabase}/${it.id}`;
    helpHttp()
      .put(endpoint, {
        body: it,
        "content-type": "application/json",
      })
      .then(() => {
        db.map((el) => (el.id === it.id ? it : el));
      });
  });
  return { sortedDb };
}

export { helpDragDrop };
