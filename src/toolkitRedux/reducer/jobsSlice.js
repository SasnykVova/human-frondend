import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import $api from "../../http"

const initialState = {
    page: 1,
    limit: 8,
    createNewVacancy: false,
    vacancyData: [],
    getJobs: {
        loading: false,
        success: false,
        error: false,
    },
    addJob: {
        loading: false,
        success: false,
        error: false,
    }
}

export const getJobs = createAsyncThunk(
    'jobs/getJobs',
    async ({limit, page}, thunkAPI) => {
        try {
            let response = await $api.get(`/jobs/?limit${limit}&page${page}`)
            console.log(response.data)
            return thunkAPI.fulfillWithValue(response.data.vacancies)
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

export const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setCreateNewVacancy(state, action) {
            state.createNewVacancy = action.payload
        },
    },
    extraReducers: {
        [getJobs.pending.type]: (state) => {
            state.getJobs.loading = true
        },
        [getJobs.fulfilled.type]: (state, action) => {
            state.getJobs.loading = false
            state.getJobs.success = true
            state.vacancyData = action.payload
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
        },
        [addJob.rejected.type]: (state, action) => {
            state.addJob.error = action.payload
        }
    }
})


export const actions = jobsSlice.actions
export default jobsSlice.reducer;