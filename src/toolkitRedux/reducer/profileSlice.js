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
    extraReducers: (builder) => {
        builder
        .addCase(updatePassword.pending, (state) => {
            state.updatePassword.loading = true
        })
        .addCase(updatePassword.fulfilled, (state) => {
            state.updatePassword.loading = false
            state.updatePassword.success = true
        })
        .addCase(updatePassword.rejected, (state, action) => {
            state.updatePassword.loading = false
            state.updatePassword.error = action.payload
        })
    }
})


export const actions = profileSlice.actions;
export default profileSlice.reducer;