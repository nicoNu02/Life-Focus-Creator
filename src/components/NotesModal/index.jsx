import { useContext, useEffect, useState } from "react";
import "./styles.css";
import helpFormNotes from "../../helpers/helpFormNotes";
import DatabaseNoteContext from "../../contexts/DatabaseNotesContext";

export default function NotesModal({
  data,
  isShowingModalNote,
  toggleModalNote,
  setActualData,
}) {
  const { notes, setNotes } = useContext(DatabaseNoteContext);
  const { id, text, name, category } = data;
  const initialForm = {
    id: id,
    text: text,
    name: name,
    category: category,
  };
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (id) {
      setForm({ ...initialForm, id: id || "" }); // Use empty string as fallback if id is missing
    }
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleModalNote();
    if (!form.name && !form.text && !form.id) return;
    const newDb = helpFormNotes(notes, form);
    setNotes(newDb);
    setActualData(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className={`modal-container ${isShowingModalNote ? "hidden" : ""}`}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          autoFocus={form.name ? false : true}
          name="name"
          value={form.name}
          onChange={handleChange}
          className="note-title"
          placeholder="Sin titulo"
        />
        <textarea
          autoFocus={form.name ? true : false}
          placeholder="Your note"
          name="text"
          id="content"
          cols="30"
          rows="10"
          value={form.text}
          onChange={handleChange}
        ></textarea>
        <button type="submit">
          {form.name || form.text ? "Guardar" : "Salir"}
        </button>
      </form>
      <span>{form.id}</span>
    </div>
  );
}
