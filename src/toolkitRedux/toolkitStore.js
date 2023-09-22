import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import jobstoolkitReducer from "./jobstoolkitReducer";
import authtoolkitReducer from "./authtoolkitReducer";


const rootReducer = combineReducers({
    jobsPage: jobstoolkitReducer,
    auth: authtoolkitReducer,
})


const store = configureStore({
    reducer: rootReducer,
    
})
window.__store__ = store;
export default store;