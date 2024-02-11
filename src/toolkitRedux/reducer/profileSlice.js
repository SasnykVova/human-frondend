import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import $api from "../../http"

const initialState = {
    updatePassword: {
        loading: false,
        success: false,
        error: false,
    }
}

export const updatePassword = createAsyncThunk(
    'profile/updatePassword',
    async ({passwordOld, passwordNew}, thunkAPI) => {
        try {
            let response = await $api.post(`password`, {passwordOld, passwordNew})
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: {
        [updatePassword.pending.type]: (state) => {
            state.updatePassword.loading = true
        },
        [updatePassword.fulfilled.type]: (state) => {
            state.updatePassword.loading = false
            state.updatePassword.success = true
        },
        [updatePassword.rejected.type]: (state, action) => {
            state.updatePassword.loading = false
            state.updatePassword.error = action.payload
        }
    }
})