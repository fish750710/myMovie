import {
  createSlice,
  createAsyncThunk,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";

import { accountSVC } from "@/api";

// export const getData = createAsyncThunk('user/getData', async (params, thunkAPI) => {
//   const url = 'https://api.justplus1.com.tw/api/mapcommon/list';
//   const res = await fetch(url).then(res => res.json());
//   console.log('resData2', params, thunkAPI, res)
//   return res;
// })

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isLogin: false,
    userData: {
      id: "",
      name: "",
    },
    sessionID: "",
    favoriteList: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsLogin: (state, { payload }) => {
      state.isLogin = payload;
    },
    setSessionID: (state, { payload }) => {
      state.sessionID = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setFavoriteList: (state, { payload }) => {
      state.favoriteList = payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getData.pending, (state, action) => {
    //   state.isLoading = true;
    //   // console.log('pending')
    // })
    // builder.addCase(getData.rejected, (state, action) => {
    //   // error
    //   console.log('rejected')
    //   state.isLoading = false;
    // })
    // builder.addCase(getData.fulfilled, (state, action) => {
    //   // success
    //   state.isLoading = false;
    //   // state.storeList = action.payload.ResultData;
    //   // userSlice.caseReducers.setStoreList(state, action);
    //   console.log('fulfilled', action)
    // })
  },
});

// reducers
export default userSlice.reducer;

// actions
export const {
  setUserData,
  setIsLogin,
  setSessionID,
  setIsLoading,
  setFavoriteList,
} = userSlice.actions;
