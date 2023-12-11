import { createAction, createReducer } from "@reduxjs/toolkit"
import $api from "../http";
// import {Navigate} from "react-router-dom";

const initialState = {
    name: "",
    surname: "",
    email: "",
    password: "",
}

export const newNameTextAC = createAction("NEW_NAME_TEXT");
export const newSurnameTextAC = createAction("NEW_SURNAME_TEXT");
export const newEmailTextAC = createAction("NEW_EMAIL_TEXT");
export const newPasswordTextAC = createAction("NEW_PASSWORD_TEXT");


export default createReducer( initialState, {
    [newNameTextAC]:(state, action) => {
        state.name = action.payload
    },
    [newSurnameTextAC]:(state, action) => {
        state.surname = action.payload
    },
    [newEmailTextAC]:(state, action) => {
        state.email = action.payload
    },
    [newPasswordTextAC]:(state, action) => {
        state.password = action.payload
    },
})

export const getRegister = ( name, surname, email, password ) => { 
    return async () => {
            await $api.post('/registration', {name, surname, email, password}
        )
        // .then( () => {
        //     if(response.data === 'token') {
        //     return <Navigate to={'/login'}
        //     />
        //     } else if(response.data === 'message') {
        //         return alert("Email already used")
        //     }
        // }
        // )
        }

    }


