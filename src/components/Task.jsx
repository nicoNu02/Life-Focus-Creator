import "./Task.css";
import Points from "./points";
const Task = ({
  name,
  priority,
  innerRef,
  handleTaskClick,
  id,
  handleOptionsClick,
}) => {
  return (
    <div className="task-container" ref={innerRef} onClick={handleTaskClick}>
      <Points handleOptionsClick={handleOptionsClick} id={id} />
      <div className="task-inside">
        <h3>{name}</h3>
        <p>{priority}</p>
      </div>
    </div>
  );
};

export default Task;
