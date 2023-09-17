import { combineReducers } from "redux";
import jobsReducer from "./jobsReducer";
import { legacy_createStore as createStore } from "redux";

const rootReducers = combineReducers({
    jobsPage: jobsReducer,
})

const store = createStore (
    rootReducers,
)

window.__store__ = store;

export default store;