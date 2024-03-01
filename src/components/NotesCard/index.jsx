import "./styles.css";
const emptyCard = {
  id: "",
  text: "",
  name: "",
  category: "",
};
function NotesCard({ data, handleActualData, handleDelete }) {
  return data ? (
    <div className="card-container">
      <main className="card-body" onClick={() => handleActualData(data)}>
        <p>{data.text}</p>
      </main>
      <footer className="card-footer">
        <h4>{data.name ? data.name : "Sin Titulo"}</h4>
        <span className="delete-card" onClick={() => handleDelete(data.id)}>
          <img src="src/assets/trash-can.png" alt="delete-icon" />
        </span>
      </footer>
    </div>
  ) : (
    <div
      className="card-container empty"
      onClick={() => handleActualData(emptyCard)}
    >
      <span>+</span>
    </div>
  );
}
export default NotesCard;
