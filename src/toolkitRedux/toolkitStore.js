import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import authreducer from './reducer/authSlice';
import registertoolkitReducer from "./registertoolkitReducer";
import employessReducer from './reducer/employeesSlice';
import jobsSlice from "./reducer/jobsSlice";
import candidatesSlice from "./reducer/candidatesSlice";
import profileSlice from "./reducer/profileSlice";


const rootReducer = combineReducers({
    jobsPage: jobsSlice,
    auth: authreducer,
    employeesPage: employessReducer,
    registerPage: registertoolkitReducer,
    candidatesPage: candidatesSlice,
    profilePage: profileSlice,
})

const store = configureStore({
    reducer: rootReducer,
})

window.__store__ = store;
export default store;