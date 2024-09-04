import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import $api from "../../http"

const initialState = {
    getCandidates: {
        limit: 10,
        page: '',
        filter: '',
        onlyMine: '',
        loading: false,
        success: false,
        error: false,
        candidatesData: [],
        totalPages: '',
    },
    getOne: {
        loading: false,
        success: false,
        error: false,
        id: '',
        candidateData: [],
    },
    userName: '',
    userNameData: [],
    getSearchCandidate: {
        loading: false,
        success: false,
        error: false,
        candidateName: '',
    },
    deleteCandidate: {
        id: '',
        loading: false,
        success: false,
        error: false,
        modalOpen: false,
    },
    addCandidate: {
        loading: false,
        success: false,
        error: false,
    },
    navBar: {
        isOpen: true,
        mobileIsOpen: false,
    },
}

export const getCandidates = createAsyncThunk(
    'candidates/getCandidates',
    async ({limit = 10, page = 1, filter, onlyMine = 0}, thunkAPI) => {
        try {
            let response = await $api.get(`/candidates/?limit=${limit}&page=${page}&filter=${filter}&onlyMine=${onlyMine}`)
            console.log(response.data)
            return thunkAPI.fulfillWithValue(response.data)
        } catch(e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const getOneCandidate = createAsyncThunk(
    'candidates/getOneCandidate',
    async (id, thunkAPI) => {
        try {
            let response = await $api.get(`/candidates/${id}`)
            console.log(response.data)
            return thunkAPI.fulfillWithValue(response.data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    } 
)

export const getSearchCandidate = createAsyncThunk(
    'candidates/getSearchCandidate',
    async (username, thunkAPI) => {
        try {
            let response = await $api.get(`/candidates/search?username=${username}`)
            return thunkAPI.fulfillWithValue(response.data)
        } catch(e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const deleteCandidate = createAsyncThunk(
    'candidates/deleteCandidate',
    async (id, thunkAPI) => {
        try {
            let response = await $api.delete(`/candidates/${id}`)
            return thunkAPI.fulfillWithValue(response.data)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const addCandidate = createAsyncThunk(
    'candidates/addCandidate',
    async ({ name, surname, gender, birthDate, email, mobileNumber, address, position, salary }, thunkAPI) => {
        try {
            let response = await $api.post('/candidates/add', 
            { name, surname, gender, birthDate, email, mobileNumber, location: address, position, salary })
            console.log(response)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const candidatesSlice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {
        setUserName(state, action) {
            state.userName = action.payload
        },
        setCurrentPage(state, action) {
            state.getCandidates.page = action.payload
        },
        setTotalPages(state, action) {
            state.getCandidates.totalPages = action.payload
        },
        setCandidateId(state, action) {
            state.getOne.id = action.payload
        },
        setDeleteCandidateId(state, action) {
            state.deleteCandidate.id = action.payload                        
        },
        setDeleteCanModalOpen(state, action) {
            state.deleteCandidate.modalOpen = action.payload
        },
        setFilter(state, action) {
            state.getCandidates.filter = action.payload
        },
        setOnlyMine(state, action) {
            state.getCandidates.onlyMine = action.payload
        },
        deleteUserNameData(state) {
            state.userNameData = []
        },
        setSeachCandidateName(state, action) {
            state.getSearchCandidate.candidateName = action.payload
        },
        setAddCandidateSuccessFalse(state) {
            state.addCandidate.success = false
        },
        setNavBarIsOpen(state, action) {
            state.navBar.isOpen = action.payload
        },
        setMobileNavBarIsOpenFalse(state) {
            state.navBar.mobileIsOpen = false
        },
        setMobileNavBarIsOpen(state, action) {
            state.navBar.mobileIsOpen = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSearchCandidate.pending, (state) => {
            state.getSearchCandidate.loading = true
        })
        .addCase(getSearchCandidate.fulfilled, (state, action) => {
            state.getSearchCandidate.loading = false
            state.getSearchCandidate.success = true
            state.userNameData = action.payload
        })
        .addCase(getSearchCandidate.rejected, (state, action) => {
            state.getSearchCandidate.error = action.payload
        })
        .addCase(getCandidates.pending, (state) => {
            state.getCandidates.loading = true
        })
        .addCase(getCandidates.fulfilled, (state, action) => {
            state.getCandidates.loading = false
            state.getCandidates.success = true
            state.getCandidates.candidatesData = action.payload.candidates
            state.getCandidates.totalPages = action.payload.count
        })
        .addCase(getCandidates.rejected, (state, action) => {
            state.getCandidates.error = action.payload
        })
        .addCase(getOneCandidate.pending, (state) => {
            state.getOne.loading = true
        })
        .addCase(getOneCandidate.fulfilled, (state, action) => {
            state.getOne.loading = false
            state.getOne.success = true
            state.getOne.candidateData = action.payload
        })
        .addCase(getOneCandidate.rejected, (state, action) => {
            state.getOne.error = action.payload
        })
        .addCase(deleteCandidate.pending, (state) => {
            state.deleteCandidate.loading = true
        })
        .addCase(deleteCandidate.fulfilled, (state) => {
            state.deleteCandidate.loading = false
            state.deleteCandidate.success = true
            state.deleteCandidate.modalOpen = false
        })
        .addCase(deleteCandidate.rejected, (state, action) => {
            state.deleteCandidate.error = action.payload
        })
        .addCase(addCandidate.pending, (state) => {
            state.addCandidate.loading = true
        })
        .addCase(addCandidate.fulfilled, (state) => {
            state.addCandidate.loading = false
            state.addCandidate.success = true
        })
        .addCase(addCandidate.rejected, (state, action) => {
            state.addCandidate.error = action.payload
        })
    }
})

export const actions = candidatesSlice.actions;
export default candidatesSlice.reducer;