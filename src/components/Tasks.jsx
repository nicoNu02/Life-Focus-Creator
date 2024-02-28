import { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import Task from "./Task";
import "./Tasks.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { helpHttp } from "../helpers/helpHttp";
import ModalForm from "./ModalForm";
import useModals from "../hooks/useModals";

const DATABASE_ENDPOINT = "http://localhost:3000/tasks";
const board = ["backlog", "todo", "inProgress", "done"];
const Tasks = () => {
  const [actualSection, setActualSection] = useState("");
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isShowingModalForm, toggleModalForm] = useModals();

  useEffect(() => {
    helpHttp()
      .get(DATABASE_ENDPOINT)
      .then((res) => {
        setDb(res);
      });
  }, []);

  const createData = (body) => {
    helpHttp()
      .post(DATABASE_ENDPOINT, {
        body: body,
        "content-type": "application/json",
      })
      .then((res) => {
        if (!res.err) {
          console.log(res);
          setDb([...db, res]);
        } else {
          console.log(res);
        }
      });
  };

  const deleteData = (id) => {
    let options = {
      headers: { "content-type": "application/json" },
    };
    let endpoint = `${DATABASE_ENDPOINT}/${id}`;
    helpHttp()
      .del(endpoint, options)
      .then((res) => {
        let newData = db.filter((el) => el.id !== id);
        setDb(newData);
      });
  };

  const editData = (data) => {
    let endpoint = `${DATABASE_ENDPOINT}/${data.id}`;
    console.log(endpoint);
    helpHttp()
      .put(endpoint, {
        body: data,
        "content-type": "application/json",
      })
      .then((res) => {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      });
  };
  const handleDragDrop = (results) => {
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
      let endpoint = `${DATABASE_ENDPOINT}/${it.id}`;
      helpHttp()
        .put(endpoint, {
          body: it,
          "content-type": "application/json",
        })
        .then((res) => {
          db.map((el) => (el.id === it.id ? it : el));
        });
    });
    setDb(sortedDb);
  };

  const handleTaskClick = (e) => {};

  const handleClick = (name) => {
    toggleModalForm();
    setActualSection(name);
  };

  return (
    <div className={"tasks-container"}>
      <DragDropContext onDragEnd={handleDragDrop}>
        {board.map((item, i) => {
          return (
            <Droppable droppableId={item} key={i}>
              {(provided) => {
                return (
                  <KanbanColumn
                    key={i}
                    name={item}
                    {...provided.droppableProps}
                    innerRef={provided.innerRef}
                    handleClick={handleClick}
                  >
                    {db &&
                      db.map((it, index) => {
                        return (
                          item == it.section && (
                            <Draggable
                              draggableId={it.name + item + index}
                              key={it.name + item + index}
                              index={index}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    className="task"
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                  >
                                    <Task
                                      name={it.name}
                                      priority={it.priority}
                                      handleTaskClick={handleTaskClick}
                                      id={it.id}
                                      deleteData={deleteData}
                                      dataToEdit={it}
                                      setDataToEdit={setDataToEdit}
                                      toggleModalForm={toggleModalForm}
                                      setActualSection={() =>
                                        setActualSection(item)
                                      }
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          )
                        );
                      })}
                    {provided.placeholder}
                  </KanbanColumn>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
      <ModalForm
        isOpen={isShowingModalForm}
        toggleModalForm={toggleModalForm}
        createData={createData}
        updateData={editData}
        section={actualSection}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
    </div>
  );
};

export default Tasks;
