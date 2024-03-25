import notesReducer from "./slices/notesSlice";
import tasksReducer from "./slices/tasksSlice";

export default function rootReducer(state = {}, action) {
  return {
    tasks: tasksReducer(state.tasks, action),
    notes: notesReducer(state.notes, action),
  };
}
