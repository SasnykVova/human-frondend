import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import authreducer from './reducer/authSlice';
import employessReducer from './reducer/employeesSlice';
import jobsSlice from "./reducer/jobsSlice";
import candidatesSlice from "./reducer/candidatesSlice";
import profileSlice from "./reducer/profileSlice";
import registerSlice from "./reducer/registerSlice";


const rootReducer = combineReducers({
    jobsPage: jobsSlice,
    auth: authreducer,
    employeesPage: employessReducer,
    registerPage: registerSlice,
    candidatesPage: candidatesSlice,
    profilePage: profileSlice,
})

const store = configureStore({
    reducer: rootReducer,
})

window.__store__ = store;
export default store;