import "./Task.css";
import useModals from "../hooks/useModals";
import Points from "./points";
import ModalOptionsTask from "./ModalOptionsTask";
const Task = ({
  name,
  priority,
  innerRef,
  id,
  dataToEdit,
  setDataToEdit,
  toggleModalForm,
  setActualSection,
}) => {
  const [isShowingModalOptions, toggleModalOptions] = useModals();
  const handleOptionsClick = () => {
    toggleModalOptions();
    setActualSection();
  };
  return (
    <div className="task-container" ref={innerRef}>
      <Points handleOptionsClick={handleOptionsClick} id={id} />
      <div className="task-inside">
        <h3>{name}</h3>
        <p>{priority}</p>
        <ModalOptionsTask
          id={id}
          isShowing={isShowingModalOptions}
          toggleModal={toggleModalOptions}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          toggleModalForm={toggleModalForm}
        />
      </div>
    </div>
  );
};

export default Task;
