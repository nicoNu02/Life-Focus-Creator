import NotesContainer from "../../components/NotesContainer";
import { DatabaseNoteContextProvider } from "../../contexts/DatabaseNotesContext";

function Notes() {
  return (
    <DatabaseNoteContextProvider>
      <NotesContainer />
    </DatabaseNoteContextProvider>
  );
}

export default Notes;
