import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  fetchMe,
  signInWithEmailAndPassword,
  updateMe,
} from "../../api";

const initialState = {
  uid: "",
  email: "",
  name: "",
  registeredFaces: [],
  photoURL: "",
  phoneNumber: "",
  token: "",
  tokenExpirationTime: "",
};

export const createUserByEmailAndPassword = createAsyncThunk(
  "user/createUserByEmailAndPassword",
  async (params) => {
    const res = await createUserWithEmailAndPassword(params);
    params.signUpCallback({
      token: res.data.token,
      token_expiration_time: res.data.expiration_time,
    });
    return res.data;
  }
);

export const signInByEmailAndPassword = createAsyncThunk(
  "user/signInByEmailAndPassword",
  async (params) => {
    const res = await signInWithEmailAndPassword(params);
    params.signInCallback({
      token: res.data.token,
      token_expiration_time: res.data.expiration_time,
    });
    return res.data;
  }
);

export const fetchMyInfo = createAsyncThunk(
  "user/fetchMyInfo",
  async (params) => {
    const res = await fetchMe(params);
    return {
      user: res.data.user,
      token: params.token,
      expiration_time: params.expiration_time,
    };
  }
);

export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async (params) => {
    let updateData = {};
    if (params.name) updateData.name = params.name;
    if (params.phone_number) updateData.phone_number = params.phone_number;
    if (params.avatar_images) updateData.avatar_images = params.avatar_images;
    if (params.face_images) updateData.face_images = params.face_images;
    const updateResponse = await updateMe({ token: params.token, updateData });
    return updateResponse;
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state, action) => {
      state.uid = "";
      state.email = "";
      state.name = "";
      state.photoURL = "";
      state.phoneNumber = "";
      state.registeredFaces = [];
      state.token = "";
      state.tokenExpirationTime = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInByEmailAndPassword.fulfilled, (state, action) => {
      const { user, token, expiration_time } = action.payload;
      state.uid = user.id;
      state.email = user.email;
      state.name = user.name;
      state.photoURL = user.photo_url;
      state.phoneNumber = user.phone_number;
      state.registeredFaces = user.registered_faces;
      state.token = token;
      state.tokenExpirationTime = expiration_time;
    });
    builder.addCase(createUserByEmailAndPassword.fulfilled, (state, action) => {
      const { user, token, expiration_time } = action.payload;
      state.uid = user.id;
      state.email = user.email;
      state.name = user.name;
      state.token = token;
      state.tokenExpirationTime = expiration_time;
    });
    builder.addCase(fetchMyInfo.fulfilled, (state, action) => {
      const { user, token, expiration_time } = action.payload;
      console.log(user);
      state.uid = user.id;
      state.email = user.email;
      state.name = user.name;
      state.photoURL = user.photo_url;
      state.phoneNumber = user.phone_number;
      state.registeredFaces = user.registered_faces;
      state.token = token;
      state.tokenExpirationTime = expiration_time;
    });
    builder.addCase(updateUserById.fulfilled, (state, action) => {
      if (action.payload && action.payload.status_code === 201) {
        const { name, photo_url, phone_number, registered_faces } =
          action.payload.data;
        if (name) state.name = name;
        if (photo_url) state.photoURL = photo_url;
        if (phone_number) state.phoneNumber = phone_number;
        if (registered_faces) state.registeredFaces = registered_faces;
      }
    });
  },
});

export const resetUser = () => async (dispatch, getState) => {
  dispatch(UserSlice.actions.resetUser());
};

export default UserSlice;
