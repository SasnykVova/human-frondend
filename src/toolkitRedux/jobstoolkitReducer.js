import { createAction, createReducer } from "@reduxjs/toolkit";


const initialState = {
    newPostText: '',
    vacancyData: [],
}

export const newPostTextAC = createAction('NEWPOSTTEXT');

export default createReducer( initialState, {
    [newPostTextAC]: (state) => {
        state.newPostText = state.newPostTextAC
    }
})