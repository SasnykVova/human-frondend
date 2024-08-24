import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import $api from "../../http";



const initialState = {
    employeesData: [],
    limit: 10,
    totalPage: null,
    currentPage: 1,
    isLoading: false,
    error: '',
    isSuccess: false,
    createNewEmployee: false,
    deleteUserSuccess: false,
    deleteUserLoading: false,
    deleteNavigate: false,
    deleteUserError: '',
    deleteUser: {
        loading: false,
        success: false,
        error: '',
    },
    addUser: {
        loading: false,
        success: false,
        error: '',
    },
    getOne: {
        loading: false,
        success: false,
        error: '',
    },
    userId: '',
    employeeData: {
        id: '',
        name: '',
        surname: '',
        email: '',
        mobileNumber: '',
        birthDate: '',
        gender: '',
        address: '',
        startDate: '',
        department: '',
        position: '',
        role: '',
    }
}

export const addUser = createAsyncThunk(
    'user/addOne',
    async ({ name, position, birthDate, department, surname, mobileNumber, address, email, role, startDate, gender }, thunkAPI) => {
        try {
            let response = await $api.post('/employees/add', {
                name, position, birthDate, department, surname, mobileNumber, address,
                email, role, startDate, gender
            })
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)
export const deleteUser = createAsyncThunk(
    'user/delete',
    async (id, thunkAPI) => {
        try {
            let response = await $api.delete(`/employees/${id}`)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Something went wrong. Failed to delete employee.")
        }
    }
)
export const getOneUser = createAsyncThunk(
    'user/getOne',
    async (id, thunkAPI) => {
        try {
            let response = await $api.get(`/employees/${id}`)
            return thunkAPI.fulfillWithValue(response.data)
        } catch (e) {
            return thunkAPI.rejectWithValue("Something went wrong. Failed to get employee.")
        }
    } 
)


export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployeesData(state, action) {
            state.employeesData = action.payload
        },
        setTotalPage(state, action) {
            state.totalPage = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        getEmployeesDataLoading(state) {
            state.isLoading = true
        },
        getEmployeesSuccess(state, action) {
            state.isLoading = false
            state.totalPage = action.payload
        },
        getEmployeesError(state, action) {
            state.isLoading = false
            state.error = action.payload
        },
        getAddUserLoading(state) {
            state.addUserIsLoading = true
        },
        getAddUserSuccess(state) {
            state.addUserSuccess = false
        },
        getAddUserError(state, action) {
            state.error = action.payload
        },
        getCreateNewEmployee(state, action) {
            state.createNewEmployee = action.payload
        },
        getIsSuccessFalse(state) {
            state.isSuccess = false
        },
        getDeleteUserSuccess(state, action) {
            state.deleteUserSuccess = action.payload
        },
        getOneUserId(state, action) {
            state.userId = action.payload
        },
        getDeleteNavigate (state, action) {
            state.deleteNavigate = action.payload
        },
        setAddEmployeeFalse(state) {
            state.addUser.success = false
        },
        setDeleteUserSuccessFalse(state) {
            state.deleteUser.success = false
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(addUser.pending, (state) => {
            state.addUser.loading = true
        })
        .addCase(addUser.fulfilled, (state) => {
            state.addUser.loading = false
            state.addUser.success = true
            state.createNewEmployee = false
        })
        .addCase(addUser.rejected, (state, action) => {
            state.addUser.loading = false
            state.addUser.error = action.payload
        })
        .addCase(deleteUser.pending, (state) => {
            state.deleteUser.loading = true
        })
        .addCase(deleteUser.fulfilled, (state) => {
            state.deleteUser.loading = false
            state.deleteUser.success = true
            state.deleteNavigate = true
            state.deleteUserSuccess = false
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.deleteUser.loading = false
            state.deleteUser.error = action.payload
        })
        .addCase(getOneUser.pending, (state) => {
            state.getOne.loading = true
        })
        .addCase(getOneUser.fulfilled, (state, action) => {
            state.getOne.loading = false
            state.getOne.success = true
            state.employeeData.id = action.payload.id
            state.employeeData.name = action.payload.name
            state.employeeData.surname = action.payload.surname
            state.employeeData.email = action.payload.email
            state.employeeData.mobileNumber = action.payload.mobileNumber
            state.employeeData.birthDate = action.payload.birthDate
            state.employeeData.gender = action.payload.gender
            state.employeeData.address = action.payload.address
            state.employeeData.startDate = action.payload.startDate
            state.employeeData.department = action.payload.department
            state.employeeData.position = action.payload.position
            state.employeeData.role = action.payload.role
        })
        .addCase(getOneUser.rejected, (state, action) => {
            state.deleteUserLoading = false
            state.deleteUserError = action.payload
        })
    }
})


export const getUsers = (limit = 5, page = 1, filter='') => {
    return async (dispatch) => {
        try {
            dispatch(employeesSlice.actions.getEmployeesDataLoading())
            let response = await $api.get(`/employees/?limit=${limit}&page=${page}&filter=${filter}`)
            console.log(response)
            dispatch(employeesSlice.actions.setEmployeesData(response.data.users))
            dispatch(employeesSlice.actions.getEmployeesSuccess(response.data.count))
        } catch (error) {
            dispatch(employeesSlice.actions.getEmployeesError(error.message))
        }
    }
}

export const actions = employeesSlice.actions
export default employeesSlice.reducer;