import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http/index";



const initialState = {
  token: null,
  userInfoData: [],
  getLogin: {
    loading: false,
    success: false,
    error: "",
  },
  getLogout: {
    success: "",
  },
  isAuth: false,
  isLoading: false,
  error: "",
  email: "",
  password: "",
  surname: "",
  name: "",
  id: "",
};

export const getLogin = createAsyncThunk(
  "auth/getLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      let response = await $api.post("/login", { email, password });
      console.log(response.data.userInfo);
      const userInfoStr = JSON.stringify(response.data.userInfo);
      localStorage.setItem("userInfo", userInfoStr);
      localStorage.setItem("token", response.data.token);
      return thunkAPI.fulfillWithValue({token: response.data.token, userInfoData: response.data.userInfo});
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAC(state, action) {
      state.email = action.payload;
    },
    passwordAC(state, action) {
      state.password = action.payload;
    },
    getAuth(state) {
      state.isAuth = true;
    },
    logOut(state) {
      state.token = null;
      state.getLogout.success = true;
      state.userInfoData = [];
    },
    setSurname(state, action) {
      state.surname = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setLoginSuccess(state) {
      state.getLogin.success = false;
    },
    setToken(state, action) {
      state.token = action.payload
    }
  },
  extraReducers: {
    [getLogin.pending.type]: (state) => {
      state.getLogin.loading = true;
    },
    [getLogin.fulfilled.type]: (state, action) => {
      const { token, userInfoData } = action.payload;
      state.getLogin.loading = false;
      state.getLogin.success = true;
      state.token = token
      state.userInfoData = userInfoData
      state.email = "";
      state.password = "";
    },
    [getLogin.rejected.type]: (state, action) => {
      state.getLogin.loading = false;
      state.getLogin.error = action.payload;
    },
  },
});

export const actions = authSlice.actions;
export default authSlice.reducer;
