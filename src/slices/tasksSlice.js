const initialState = [];

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "task/addTask":
      return state;

    default:
      break;
  }
}
