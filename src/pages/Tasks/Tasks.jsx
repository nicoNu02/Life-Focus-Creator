import { useContext, useState } from "react";
import KanbanColumn from "../../components/Kanban/KanbanColumn";
import Task from "../../components/Tasks/Task";
import "./Tasks.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import ModalForm from "../../components/Tasks/ModalForm";
import useModals from "../../hooks/useModals";
import DatabaseContext from "../../contexts/DatabaseContext";
import { helpDragDrop } from "../../helpers/helpDragDrop";
import HeaderTasks from "../../components/Tasks/HeaderTasks/index";

const board = ["Backlog", "Todo", "InProgress", "Done"];
const projects = [
  { name: "project 1" },
  { name: "project 2" },
  { name: "project 3" },
];
const Tasks = () => {
  const [actualSection, setActualSection] = useState("");
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isShowingModalForm, toggleModalForm] = useModals();
  const [isOpenModalFilters, toggleModalFilters] = useModals();
  const { db, setDb, DATABASE_ENDPOINT } = useContext(DatabaseContext);
  const handleDragDrop = (results) => {
    const { sortedDb } = helpDragDrop(results, db, board, DATABASE_ENDPOINT);
    setDb(sortedDb);
  };

  const handleClick = (name) => {
    toggleModalForm();
    setActualSection(name);
  };

  return (
    <main className="container-task-main">
      <HeaderTasks
        projects={projects}
        isOpenModalFilters={isOpenModalFilters}
        toggleModal={toggleModalFilters}
      />
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
                                        id={it.id}
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
          section={actualSection}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      </div>
    </main>
  );
};

export default Tasks;
