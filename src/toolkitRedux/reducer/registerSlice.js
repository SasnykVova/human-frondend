import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";




const initialState = {
    name: "",
    surname: "",
    email: "",
    password: "",
    setRegister: {
        loading: false,
        success: false,
        error: false, 
    }
}

export const setRegister = createAsyncThunk(
    'register/setRegister',
    async ({ name, surname, email, password }, thunkAPI) => {
        try {
            let response = await $api.post('/registration', {name, surname, email, password})
        }
        catch(e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setName(state, action) {
            state.name = action.payload
        },
        setSurname(state, action) {
            state.surname = action.payload
        },
        setEmail(state, action) {
            state.email = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(setRegister.pending, (state) => {
            state.setRegister.loading = true
        })
        .addCase(setRegister.fulfilled, (state) => {
            state.setRegister.loading = false
            state.setRegister.success = true
        })
        .addCase(setRegister.rejected, (state, action) => {
            state.setRegister.loading = false
            state.setRegister.error = action.payload
        })
    }
})

export const actions = registerSlice.actions;
export default registerSlice.reducer;