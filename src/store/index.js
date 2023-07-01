import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/userSlice";
import NotificationSlice from "./reducers/notificationSlice";

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    notification: NotificationSlice.reducer,
  },
});

export default store;
