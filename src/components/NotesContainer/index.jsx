import { useContext, useEffect, useState } from "react";
import NotesCard from "../NotesCard";
import NotesGrid from "../NotesGrid";
import "./styles.css";
import DatabaseNoteContext from "../../contexts/DatabaseNotesContext";
import NotesModal from "../NotesModal";
import useModals from "../../hooks/useModals";
const gridSize = { columns: 3, rows: 3 };

function NotesContainer() {
  const { notes, setNotes } = useContext(DatabaseNoteContext);
  const [actualData, setActualData] = useState();
  const [isShowingModalNote, toggleModalNote] = useModals();

  useEffect(() => {
    if (!actualData) {
      setActualData({
        id: "",
        text: "",
        name: "",
        category: "",
      });
    }
  }, []);
  const handleActualData = (data) => {
    setActualData(data);
    toggleModalNote();
  };

  const handleDelete = (id) => {
    console.log("asdasd", id);
    const db = [...notes];
    db.splice(id, 1);
    console.log(db);
    setNotes(db);
  };
  return (
    <div className="notes-app-container">
      <main>
        <NotesGrid size={gridSize}>
          {notes.map((note, index) => {
            return (
              <NotesCard
                data={note}
                key={index}
                handleActualData={handleActualData}
                handleDelete={handleDelete}
              />
            );
          })}
          <NotesCard handleActualData={handleActualData} />
        </NotesGrid>
      </main>
      {actualData && (
        <NotesModal
          data={actualData}
          isShowingModalNote={isShowingModalNote}
          toggleModalNote={toggleModalNote}
          setActualData={setActualData}
        />
      )}
    </div>
  );
}
export default NotesContainer;
