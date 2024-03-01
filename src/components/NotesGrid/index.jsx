import "./styles.css";

function NotesGrid({ children, size }) {
  const styles = {
    display: "grid",
    gridTemplateColumns: `repeat(${size.columns}, 250px)`,
    gridTemplateRows: `repeat(${size.rows}, 200px)`,
    gridColumnGap: "1rem",
    gridRowGap: "1rem",
  };
  return (
    <div className="notes-board" style={styles}>
      {children}
    </div>
  );
}

export default NotesGrid;
