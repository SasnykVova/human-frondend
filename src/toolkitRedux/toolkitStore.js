import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import jobstoolkitReducer from "./jobstoolkitReducer";
import authtoolkitReducer from "./authtoolkitReducer";
import registertoolkitReducer from "./registertoolkitReducer";


const rootReducer = combineReducers({
    jobsPage: jobstoolkitReducer,
    auth: authtoolkitReducer,
    registerPage: registertoolkitReducer,
})


const store = configureStore({
    reducer: rootReducer,
    
})
window.__store__ = store;
export default store;