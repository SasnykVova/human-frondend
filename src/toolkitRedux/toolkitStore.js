import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import jobstoolkitReducer from "./jobstoolkitReducer";


const rootReducer = combineReducers({
    jobsPage: jobstoolkitReducer,
})


const store = configureStore({
    reducer: rootReducer,
    
})

export default store;