import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  isShow: false,
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
      state.isShow = true;
    },
    resetNotification: (state, action) => {
      state.message = "";
      state.isShow = false;
    },
  },
});

export const setNotification = (message) => async (dispatch, getState) => {
  dispatch(NotificationSlice.actions.setNotification(message));
};

export const resetNotification = () => async (dispatch, getState) => {
  dispatch(NotificationSlice.actions.resetNotification());
};

export default NotificationSlice;
