import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import authreducer from './reducer/authSlice';
import registertoolkitReducer from "./registertoolkitReducer";
import employessReducer from './reducer/employeesSlice';
import jobsSlice from "./reducer/jobsSlice";
import candidatesSlice from "./reducer/candidatesSlice";


const rootReducer = combineReducers({
    jobsPage: jobsSlice,
    auth: authreducer,
    employeesPage: employessReducer,
    registerPage: registertoolkitReducer,
    candidatesPage: candidatesSlice,
})

const store = configureStore({
    reducer: rootReducer,
})

window.__store__ = store;
export default store;