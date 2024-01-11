import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import $api from "../../http"

const initialState = {
    count: '',
    page: '',
    limit: 8,
    createNewVacancy: false,
    vacancyData: [],
    getJobs: {
        loading: false,
        success: false,
        error: false,
        filter: '',
        onlyMine: '',
        status: '',
    },
    addJob: {
        loading: false,
        success: false,
        error: false,
    },
    getJob: {
        loading: false,
        success: false,
        error: false,
        desk: {
            id: '',
        }
    },
    jobDetails: [],
    tasks: [],
    userIdDetails: localStorage.getItem('jobId'),
    addTaskModal: false,
    findEmployee: '',
    placeholder: '',
    findEmpData: {
        id: '',
        name: '',
        surname: '',
    },
    addTask: {
        loading: false,
        success: false,
        error: false,
        candidate: {
            id: '',
            name: '',
            surname: '',
        }
    },
    deactivateJob: {
        loading: false,
        success: false,
        error: false, 
        modalIsOpen: false,
        modalDeactivateSuccess: false,
    },
    updateTask: {
        loading: false,
        success: false,
        error: false, 
    }
}

export const getJobs = createAsyncThunk(
    'jobs/getJobs',
    async ({status, limit, page=1, filter = '', onlyMine=''}, thunkAPI) => {
        try {
            let response = await $api.get(`/jobs/?${status ? `status=${status}` : ''}&limit=${limit}&page=${page}&filter=${filter}&onlyMine=${onlyMine}`)
            console.log(response)
            return thunkAPI.fulfillWithValue(response.data)
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong')
        }
    } 
)

export const addJob = createAsyncThunk(
    'jobs/addJob',
    async ({position, description, department, location, salaryMax, salaryMin, deadlineDate}, thunkAPI) => {
        try {
            let response = await $api.post('/jobs/add', { position, description, department, location, assignedTo: {
                id: '654a2c3a4d80d43258bf1959',
                name: 'Vasyl',
                surname: 'Malon'
            }, salaryMax, 
            salaryMin, deadlineDate })
            return console.log(response)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }   
)
export const getJob = createAsyncThunk(
    'jobs/getJob',
    async (id , thunkAPI) => {
        try {
            let response = await $api.get(`jobs/${id}`)
            console.log(response)
            return thunkAPI.fulfillWithValue(response.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const addTask = createAsyncThunk(
    'jobs/addTask',
    async ({ id, boardId, candidate }, thunkAPI) => {
        try {
            let response = await $api.post(`jobs/${id}/task`, { boardId, candidate })
            console.log(response)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const updateTask = createAsyncThunk(
    'jobs/updateTask',
    async ({ vacancyId, taskId, column }, thunkAPI) => {
        try {
            let response = await $api.post(`jobs/${vacancyId}/updateTask`, { id: taskId, column })
            console.log(response)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const deactivateJob = createAsyncThunk(
    'jobs/deactivateJob',
    async ( id , thunkAPI) => {
        try {
            let response = await $api.get(`jobs/${id}/deactivate`)
            console.log(response)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setCreateNewVacancy(state, action) {
            state.createNewVacancy = action.payload
        },
        setAddJobSuccessFalse(state) {
            state.addJob.success = false
        },
        setCurrentPage(state,action) {
            state.page = action.payload
        },
        setCount(state, action) {
            state.count = action.payload
        },
        setUserIdDetails(state, action) {
            state.userIdDetails = action.payload
            localStorage.setItem('jobId', action.payload)
        },
        setAddTaskModal(state, action) {
            state.addTaskModal = action.payload
        },
        setFindEmployee(state, action) {
            state.findEmployee = action.payload
        },
        setOnlyMine(state, action) {
            state.getJobs.onlyMine = action.payload
        },
        setPlaceholder(state, action) {
            state.placeholder = action.payload
        },
        setFindEmpData(state, action) {
            state.findEmpData.id = action.payload.id
            state.findEmpData.name = action.payload.name
            state.findEmpData.surname = action.payload.surname
        },
        setCandidateData(state, action) {
            state.addTask.candidate.id = action.payload.id
            state.addTask.candidate.name = action.payload.name
            state.addTask.candidate.surname = action.payload.surname
        },
        setModalIsOpen(state, action) {
            state.deactivateJob.modalIsOpen = action.payload
        },
        setModalDeactivateSuccess(state, action) {
            state.deactivateJob.modalDeactivateSuccess = action.payload
        },
        setDeactivateSuccFalse(state) {
            state.deactivateJob.success = false
        },
    },
    extraReducers: {
        [getJobs.pending.type]: (state) => {
            state.getJobs.loading = true
        },
        [getJobs.fulfilled.type]: (state, action) => {
            state.getJobs.loading = false
            state.getJobs.success = true
            state.vacancyData = action.payload.vacancies
            state.count = action.payload.count
        },
        [getJobs.rejected.type]: (state, action) => {
            state.getJobs.error = action.payload
        },
        [addJob.pending.type]: (state) => {
            state.addJob.loading = true
        },
        [addJob.fulfilled.type]: (state) => {
            state.addJob.loading = false
            state.addJob.success = true
            state.createNewVacancy = false
        },
        [addJob.rejected.type]: (state, action) => {
            state.addJob.error = action.payload
        },
        [getJob.pending.type]: (state) => {
            state.getJob.loading = true
        },
        [getJob.fulfilled.type]: (state, action) => {
            state.getJob.loading = false
            state.getJob.success = true
            state.jobDetails = action.payload
            state.tasks = action.payload.desk.tasks
            state.getJob.desk.id = action.payload.desk._id
        },
        [getJob.rejected.type]: (state, action) => {
            state.getJob.error = action.payload
        },
        [addTask.pending.type]: (state) => {
            state.addTask.loading = true
        },
        [addTask.fulfilled.type]: (state) => {
            state.addTask.loading = false
            state.addTask.success = true
        },
        [addTask.rejected.type]: (state, action) => {
            state.addTask.error = action.payload
        },
        [deactivateJob.pending.type]: (state) => {
            state.deactivateJob.loading = true
        },
        [deactivateJob.fulfilled.type]: (state) => {
            state.deactivateJob.loading = false
            state.deactivateJob.success = true
        },
        [deactivateJob.rejected.type]: (state, action) => {
            state.deactivateJob.error = action.payload
        },
        [updateTask.pending.type]: (state) => {
            state.updateTask.loading = true
        },
        [updateTask.fulfilled.type]: (state) => {
            state.updateTask.loading = false
            state.updateTask.success = true
        },
        [updateTask.rejected.type]: (state, action) => {
            state.updateTask.error = action.payload
        },
    }
})


export const actions = jobsSlice.actions
export default jobsSlice.reducer;