import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from "../http";

export const getLogin2 = createAsyncThunk(
    'counter/getLogin2',
    async () => {
        console.log(111)
        let response = await $api.post('/login')
        return response.data
    }
)

const initialState = {
    isAuth: false,
    login: '',
    password: '',
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: {
    [getLogin2.fulfilled.type]: (state) => {
        state.isAuth = state.isAuthAC
    },
    [getLogin2.pending.type]: (state) => {
        state.login = state.loginAC
    },
    [getLogin2.rejected.type]: (state) => {
        state.login = state.loginAC
    },
  }
})

export default counterSlice.reducer