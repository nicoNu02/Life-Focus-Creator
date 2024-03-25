import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../reducer";

const composedEnhancer = applyMiddleware(thunk);

const store = createStore(rootReducer, composedEnhancer);
export default store;
