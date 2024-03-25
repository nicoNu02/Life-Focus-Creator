import "./KanbanColumn.css";
const KanbanColumn = ({ name, children, innerRef, handleClick }) => {
  return (
    <section className="container-kanban" ref={innerRef}>
      <div className="header">
        <h2>{name}</h2>
        <button className="add-button" onClick={() => handleClick(name)}>
          ➕
        </button>
      </div>
      <article>{children}</article>
    </section>
  );
};

export default KanbanColumn;
