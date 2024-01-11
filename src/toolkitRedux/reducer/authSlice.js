import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import $api from "../../http/index";


    const userInfoString = localStorage.getItem('userInfo')
    const userInfoData = JSON.parse(userInfoString)

const initialState = {
    token: localStorage.getItem('token'),
    userInfoData: userInfoData,
    getLogin: {
        loading: false,
        success: false,
        error: '',
    },
    getLogout: {
        success: ''
    },
    isAuth: false,
    isLoading: false,
    error: '',
    email: '',
    password: '',
    surname: '',
    mame: '',
    id: '',
}

export const getLogin = createAsyncThunk(
    'auth/getLogin',
    async ({ email, password }, thunkAPI) => {
        try {
            let response = await $api.post('/login', {email, password})
            console.log(response.data.userInfo)
            const userInfoStr = JSON.stringify(response.data.userInfo)
            localStorage.setItem('userInfo', userInfoStr)
            localStorage.setItem('token', response.data.token)
            return thunkAPI.fulfillWithValue(response.data.token)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)
// export const getLogin = (email, password) => {
//     return async (dispatch) => {
//     try {
//         dispatch(authSlice.actions.getLoginLoading())
//         let response = await $api.post('/login', {email, password})
//         console.log(response.data)
//         dispatch(authSlice.actions.setSurname(response.data.userInfo.surname))
//         dispatch(authSlice.actions.setName(response.data.userInfo.name))
//         dispatch(authSlice.actions.setId(response.data.userInfo._id))
//         localStorage.setItem('surname', response.data.userInfo.surname)
//         localStorage.setItem('name', response.data.userInfo.name)
//         localStorage.setItem('id', response.data.userInfo._id)
//         localStorage.setItem('token', response.data.token)
//         dispatch(authSlice.actions.getLoginSuccess(response.data.token))
//     } catch (error) {
//         dispatch(authSlice.actions.getLoginError(error.message))
//     }
//     }
// }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAC(state, action) {
            state.email = action.payload
        },
        passwordAC(state, action) {
            state.password = action.payload
        },
        getLoginLoading(state) {
            state.isLoading = true
        },
        getLoginSuccess(state, action) {
            state.isLoading = false
            state.isAuth = true
            state.token = action.payload
            state.email = ''
            state.password = ''
            state.error = ''
        },
        getLoginError(state, action) {
            state.isLoading = false
            state.error = action.payload
        },
        getAuth(state) {
            state.isAuth = true
        },
        logOut(state) {
            state.token = null
            state.getLogout.success = true
        },
        setSurname(state, action) {
            state.surname = action.payload
        },
        setName(state, action) {
            state.name = action.payload
        },
        setId(state, action) {
            state.id = action.payload
        },
        setLoginSuccess(state) {
            state.getLogin.success = false
        }
        },
        extraReducers: {
            [getLogin.pending.type]: (state) => {
                state.getLogin.loading = true
            },
            [getLogin.fulfilled.type]: (state, action ) => {
                state.getLogin.loading = false
                state.getLogin.success = true
                state.token = action.payload
                state.email = ''
                state.password = ''
            },
            [getLogin.rejected.type]: (state, action) => {
                state.getLogin.loading = false
                state.getLogin.error = action.payload
            },
        }
    }
)


export const actions = authSlice.actions
export default authSlice.reducer;

    // export const checkAuth = () => {
    //     return async (dispatch) => {
    //         try {
    //             const response = await $api.post('/login', {email, password}) 
    //             localStorage.setItem('token', response.data.token)
    //             dispatch(authSlice.actions.getAuth)
    //         } catch (error) {
                
    //         }
    //     }
    // }

// const { actions, reducer } = authSlice;
// export const {
//     loginAC,
//     passwordAC,
// } = actions;