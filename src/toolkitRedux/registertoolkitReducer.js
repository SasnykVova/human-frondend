import { createAction, createReducer } from "@reduxjs/toolkit"

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

// export const getRegister = (name, surname, email, password) => {
//     return async (dispatch) => {
//         let data = await 
//     }
// }
