import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  fetchUserWithEmail,
  updateUserWithId,
} from "../../api";

const initialState = {
  uid: "",
  email: "",
  name: "",
  token: "",
  tokenExpirationTime: "",
  photoURL: "",
  phoneNumber: "",
  numberFaceImages: 0,
};

export const createUserByEmailAndPassword = createAsyncThunk(
  "user/createUserByEmailAndPassword",
  async (params) => {
    const user = {
      name: params.name,
      email: params.email,
      password: params.password,
    };
    const res = await createUserWithEmailAndPassword(user);
    res.token = params.token;
    res.tokenExpirationTime = params.expirationTime;
    return res;
  }
);

export const signInByGoogle = createAsyncThunk(
  "user/signInByGoogle",
  async (params) => {
    const user = {
      name: params.name,
      email: params.email,
      phone_number: params.phoneNumber,
      photo_url: params.photoURL,
    };
    const res = await signInWithGoogle(user);
    res.token = params.token;
    res.expirationTime = params.expirationTime;
    return res;
  }
);

export const signInByEmailAndPassword = createAsyncThunk(
  "user/signInByEmailAndPassword",
  async (params) => {
    const res = await signInWithEmailAndPassword(params);
    res.token = params.token;
    res.expirationTime = params.expirationTime;
    return res;
  }
);

export const fetchUserByEmail = createAsyncThunk(
  "user/fetchUserByEmail",
  async (params) => {
    const res = await fetchUserWithEmail(params.email);
    res.token = params.token;
    res.expirationTime = params.expirationTime;
    return res;
  }
);

export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async (params) => {
    let updateData = {};
    if (params.name) updateData.name = params.name;
    if (params.phone_number) updateData.phone_number = params.phone_number;
    if (params.photo_url) updateData.photo_url = params.photo_url;
    if (params.number_face_images)
      updateData.number_face_images = params.number_face_images;
    const res = await updateUserWithId(updateData, params.id);
    return res;
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { name = "", photoURL = "", phoneNumber = "" } = action.payload;
      state.name = name;
      state.photoURL = photoURL;
      state.phoneNumber = phoneNumber;
    },
    resetUser: (state, action) => {
      (state.uid = ""),
        (state.email = ""),
        (state.name = ""),
        (state.token = ""),
        (state.tokenExpirationTime = ""),
        (state.photoURL = ""),
        (state.phoneNumber = ""),
        (state.numberFaceImages = 0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInByEmailAndPassword.fulfilled, (state, action) => {
      const {
        id,
        email,
        name = "",
        photo_url = "",
        phone_number = "",
        number_face_images = 0,
        token,
        expirationTime,
      } = action.payload;
      state.uid = id;
      state.email = email;
      state.name = name;
      state.photoURL = photo_url;
      state.phoneNumber = phone_number;
      state.numberFaceImages = number_face_images;
      state.token = token;
      state.tokenExpirationTime = expirationTime;
    });
    builder.addCase(createUserByEmailAndPassword.fulfilled, (state, action) => {
      const { id, email, name, token, expirationTime } = action.payload;
      state.uid = id;
      state.email = email;
      state.name = name;
      state.token = token;
      state.tokenExpirationTime = expirationTime;
    });
    builder.addCase(signInByGoogle.fulfilled, (state, action) => {
      const {
        id,
        email,
        name,
        photo_url = "",
        phone_number = "",
        number_face_images = 0,
        token,
        expirationTime,
      } = action.payload;
      state.uid = id;
      state.email = email;
      state.name = name;
      state.photoURL = photo_url;
      state.phoneNumber = phone_number;
      state.token = token;
      state.tokenExpirationTime = expirationTime;
      state.numberFaceImages = number_face_images;
    });
    builder.addCase(fetchUserByEmail.fulfilled, (state, action) => {
      const {
        id,
        email,
        name,
        photo_url = "",
        phone_number = "",
        number_face_images = 0,
        token,
        expirationTime,
      } = action.payload;
      state.uid = id;
      state.email = email;
      state.name = name;
      state.phoneNumber = phone_number;
      state.photoURL = photo_url;
      state.token = token;
      state.tokenExpirationTime = expirationTime;
      state.numberFaceImages = number_face_images;
    });
    builder.addCase(updateUserById.fulfilled, (state, action) => {
      const {
        name,
        photo_url = "",
        phone_number = "",
        number_face_images = 0,
      } = action.payload;
      if (name) state.name = name;
      if (photo_url) state.photoURL = photo_url;
      if (phone_number) state.phoneNumber = phone_number;
      if (number_face_images) state.numberFaceImages = number_face_images;
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
