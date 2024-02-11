import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http/index";

const userInfoString = localStorage.getItem("userInfo");
const userInfoData = JSON.parse(userInfoString);

const initialState = {
  token: localStorage.getItem("token"),
  userInfoData: userInfoData,
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
  mame: "",
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
      return thunkAPI.fulfillWithValue(response.data.token);
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
    getLoginLoading(state) {
      state.isLoading = true;
    },
    getLoginSuccess(state, action) {
      state.isLoading = false;
      state.isAuth = true;
      state.token = action.payload;
      state.email = "";
      state.password = "";
      state.error = "";
    },
    getLoginError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAuth(state) {
      state.isAuth = true;
    },
    logOut(state) {
      state.token = null;
      state.getLogout.success = true;
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
  },
  extraReducers: {
    [getLogin.pending.type]: (state) => {
      state.getLogin.loading = true;
    },
    [getLogin.fulfilled.type]: (state, action) => {
      state.getLogin.loading = false;
      state.getLogin.success = true;
      state.token = action.payload;
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
