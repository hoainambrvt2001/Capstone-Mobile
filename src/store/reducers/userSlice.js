import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchUserWithEmail,
  updateUserWithId,
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
    return res.data;
  }
);

export const signInByEmailAndPassword = createAsyncThunk(
  "user/signInByEmailAndPassword",
  async (params) => {
    const res = await signInWithEmailAndPassword(params);
    return res.data;
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (params) => {
    const res = await fetchUserWithEmail(params);
    return res.data;
  }
);

export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async (params) => {
    console.log(params);
    let updateData = {};
    if (params.name) updateData.name = params.name;
    if (params.phone_number) updateData.phone_number = params.phone_number;
    if (params.photo_url) updateData.photo_url = params.photo_url;
    if (params.registered_faces)
      updateData.registered_faces = params.registered_faces;
    await updateUserWithId({ token: params.token, id: params.id, updateData });
    return updateData;
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
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.uid = user.id;
      state.email = user.email;
      state.name = user.name;
      state.phoneNumber = user.phone_number;
      state.registeredFaces = user.registered_faces;
    });
    builder.addCase(updateUserById.fulfilled, (state, action) => {
      const { name, photo_url, phone_number, registered_faces } =
        action.payload;
      if (name) state.name = name;
      if (photo_url) state.photoURL = photo_url;
      if (phone_number) state.phoneNumber = phone_number;
      if (registered_faces) state.registeredFaces = registered_faces;
    });
  },
});

export const resetUser = () => async (dispatch, getState) => {
  dispatch(UserSlice.actions.resetUser());
};

export default UserSlice;
