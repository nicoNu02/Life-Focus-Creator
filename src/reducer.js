import notesReducer from "./slices/notesSlice";

export default function rootReducer(state = [], action) {
  return notesReducer(state, action);
}
