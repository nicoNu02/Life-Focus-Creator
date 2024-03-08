import uniqid from "uniqid";

const initialState = [];

export default function notesReducer(state = initialState, action) {
  switch (action.type) {
    case "note/addedNote": {
      return [...state, { ...action.payload, id: uniqid() }];
    }
    case "note/updateNote": {
      const newState = state.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
      return [...newState];
    }
    case "notes/deleteNote": {
      const newState = state.filter((note) => note.id !== action.payload);
      return [...newState];
    }
    default: {
      return state;
    }
  }
}
