// import { createAction, createReducer } from "@reduxjs/toolkit";
// import $api from "../http";
// // import { Navigate } from "react-router";

// const initialState = {
//     isAuth: false,
//     login: '',
//     password: '',
// };

// export const isAuthAC = createAction('IS_AUTH');
// export const loginAC = createAction('LOGIN');
// export const passwordAC = createAction('PASSWORD');

// export default createReducer( initialState, {
//     [isAuthAC]: (state) => {
//         state.isAuth = state.isAuthAC
//     },
//     [loginAC]: (state) => {
//         state.login = state.loginAC
//     },
//     [passwordAC]: (state) => {
//         state.password = state.passwordAC
//     },
// })

// export const getLogin = (login, password) => {
//     return async () => {
//         let response = await $api.post('/login', {login, password})
//         if(response) {
//             console.log(response)
//         }
//     }
// }