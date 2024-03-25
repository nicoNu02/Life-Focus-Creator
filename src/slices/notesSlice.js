import uniqid from "uniqid";

const initialState = {
  notes: [],
  searchTerm: "",
  filteredNotes: [],
};

export default function notesReducer(state = initialState, action) {
  switch (action.type) {
    case "notes/notesLoaded": {
      console.log("asdasdasd");
      return { ...state, notes: action.payload };
    }
    case "notes/addedNote": {
      return [...state, action.payload];
    }
    case "notes/updateNote": {
      return state.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    }
    case "notes/deleteNote": {
      return state.filter((note) => note.id !== action.payload);
    }
    case "notes/filterByName": {
      if (!state.filteredNotes) return state.notes;
      const searchTerm = action.payload;
      const filteredNotes = searchTerm
        ? state.notes.filter((note) => {
            const title = note.title.toLowerCase();
            for (let i = 0; i < searchTerm.length; i++) {
              if (title.charAt(i) !== searchTerm.charAt(i)) {
                return false; // Mismatch found, exit loop
              }
            }
            return true; // All characters matched
          })
        : state.notes;

      return { ...state, searchTerm, filteredNotes };
    }
    default: {
      return state;
    }
  }
}

export async function fetchNotes(dispatch, getState) {
  fetch("http://localhost:4000/notes", {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((notes) => dispatch({ type: "notes/notesLoaded", payload: notes }));
  console.log("last");
}

export function addNote(note) {
  return async function addNotesThunk(dispatch, getState) {
    const initialNote = note;
    fetch("http://localhost:4000/notes", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(initialNote),
    })
      .then((res) => res.json())
      .then(() => dispatch({ type: "notes/addedNote", payload: initialNote }));
  };
}

export function updateNote(note) {
  return async function updateNotesThunk(dispatch, getState) {
    const initialNote = note;
    fetch("http://localhost:4000/notes", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(initialNote),
    }).then(() => dispatch({ type: "notes/updateNote", payload: initialNote }));
  };
}
