import { useEffect, useState } from "react";
import NotesCard from "../NotesCard";
import NotesGrid from "../NotesGrid";
import "./styles.css";
import NotesModal from "../NotesModal";
import useModals from "../../hooks/useModals";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const gridSize = { columns: 3, rows: 3 };

function NotesContainer() {
  const notes = useSelector((state) => state);
  const [actualData, setActualData] = useState();
  const [isShowingModalNote, toggleModalNote] = useModals();
  const dispatch = useDispatch();

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
    dispatch({ type: "notes/deleteNote", payload: id });
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
