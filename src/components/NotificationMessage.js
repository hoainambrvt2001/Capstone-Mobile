import { Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { resetNotification } from "../store/reducers/notificationSlice";
import Colors from "../theme/Colors";

const NotificationMessage = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  return (
    <Snackbar
      visible={notification.isShow}
      onDismiss={() => dispatch(resetNotification())}
      action={{
        label: "Continue",
        onPress: () => dispatch(resetNotification()),
        textColor: Colors.pink,
      }}
    >
      {notification.message}
    </Snackbar>
  );
};

export default NotificationMessage;
