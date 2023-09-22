import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    login: ''
};

export const isAuthAC = createAction('IS_AUTH');

export default createReducer(initialState, {
    [isAuthAC]: (state) => {
        state.isAuth = state.isAuthAC
    }
})

export const getAuth = () => {

}