import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserInServer, fetchUserByEmail } from "../../axios";

const initialState = {
  id: "",
  email: "",
  name: "",
  token: "",
  expirationTime: "",
  avatarImg: "",
  phone: "",
  province: "",
  district: "",
  ward: "",
  address: "",
};

export const createUserData = createAsyncThunk(
  "user/createUserData",
  async (params) => {
    const res = await createUserInServer(
      params.name,
      params.email,
      params.password
    );
    res.token = params.token;
    res.expirationTime = params.expirationTime;
    return res;
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (params) => {
    const res = await fetchUserByEmail(params.email);
    res.token = params.token;
    res.expirationTime = params.expirationTime;
    return res;
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const {
        name = "",
        avatarImg = "",
        phone = "",
        province = "",
        district = "",
        ward = "",
        address = "",
      } = action.payload;
      state.name = name;
      state.avatarImg = avatarImg;
      state.phone = phone;
      state.province = province;
      state.district = district;
      state.ward = ward;
      state.address = address;
    },
    resetUser: (state, action) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      const {
        _id,
        email,
        token,
        expirationTime,
        name = "",
        avatarImg = "",
        phone = "",
        province = "",
        district = "",
        ward = "",
        address = "",
      } = action.payload;
      state.id = _id;
      state.email = email;
      state.token = token;
      state.expirationTime = expirationTime;
      state.name = name;
      state.avatarImg = avatarImg;
      state.phone = phone;
      state.province = province;
      state.district = district;
      state.ward = ward;
      state.address = address;
    });
    builder.addCase(createUserData.fulfilled, (state, action) => {
      const { _id, email, name, token, expirationTime } = action.payload;
      state.id = _id;
      state.email = email;
      state.name = name;
      state.token = token;
      state.expirationTime = expirationTime;
    });
  },
});

export const initUser = (user) => async (dispatch, getState) => {
  dispatch(UserSlice.actions.initUser(user));
};

export const setUserInfo = (user) => async (dispatch, getState) => {
  dispatch(UserSlice.actions.setUserInfo(user));
};

export const resetUser = () => async (dispatch, getState) => {
  dispatch(UserSlice.actions.resetUser());
};

export default UserSlice;
