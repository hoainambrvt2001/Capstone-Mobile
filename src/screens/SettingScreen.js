import React, { useContext } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Text, Avatar, Button, Appbar } from "react-native-paper";
import Colors from "../theme/Colors";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../store/reducers/userSlice";
import { AuthContext } from "../auth";

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { signOut } = useContext(AuthContext);

  const handleSignout = async () => {
    await signOut();
    dispatch(resetUser());
    navigation.navigate("SignInScreen");
  };

  return (
    <>
      <Appbar.Header mode="center-aligned" style={styles.header}>
        <Appbar.BackAction
          onPress={() => {
            navigation.push("MainScreen");
          }}
        />
        <Appbar.Content title="Setting" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <View style={styles.setting_wrapper}>
        <View style={styles.setting_container}>
          <View style={styles.info_wrapper}>
            <Avatar.Image
              source={
                user.photoURL
                  ? { uri: user.photoURL }
                  : require("../assets/avatar.jpg")
              }
              size={130}
            />
            <Text style={styles.info_name}>{user.name}</Text>
            <Text style={styles.info_email}>{user.email}</Text>
            <Button
              style={styles.info_edit}
              mode="contained"
              onPress={() => navigation.push("EditProfileScreen")}
            >
              Edit Profile
            </Button>
          </View>
          <View
            style={{
              backgroundColor: Colors.lightGray,
              height: 0.5,
              width: "85%",
              marginVertical: 10,
              marginBottom: 20,
            }}
          />
          <View style={styles.action_wrapper}>
            <TouchableWithoutFeedback
              onPress={() => navigation.push("ResetPasswordScreen")}
            >
              <View style={styles.action_container}>
                <View style={styles.action_left}>
                  <Avatar.Icon
                    icon="lock-reset"
                    size={34}
                    color={Colors.pink}
                    style={styles.prefix_icon}
                  />
                  <Text style={{ marginLeft: 10, fontSize: 15 }}>
                    Reset password
                  </Text>
                </View>
                <Avatar.Icon
                  icon="chevron-right"
                  size={34}
                  color={Colors.darkGray}
                  style={{ backgroundColor: Colors.lightGray }}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.push("UpdateFaceScreen")}
            >
              <View style={styles.action_container}>
                <View style={styles.action_left}>
                  <Avatar.Icon
                    icon="emoticon-happy-outline"
                    size={34}
                    color={Colors.pink}
                    style={styles.prefix_icon}
                  />
                  <Text style={{ marginLeft: 10, fontSize: 15 }}>
                    Update face
                  </Text>
                </View>
                <Avatar.Icon
                  icon="chevron-right"
                  size={34}
                  color={Colors.darkGray}
                  style={{ backgroundColor: Colors.lightGray }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              backgroundColor: Colors.lightGray,
              height: 0.5,
              width: "85%",
              marginVertical: 10,
              marginBottom: 20,
            }}
          />
          <View style={styles.action_wrapper}>
            <View style={styles.action_container}>
              <View style={styles.action_left}>
                <Avatar.Icon
                  icon="phone"
                  size={34}
                  color={Colors.pink}
                  style={styles.prefix_icon}
                />
                <Text style={{ marginLeft: 10, fontSize: 15 }}>Contact us</Text>
              </View>
              <Avatar.Icon
                icon="chevron-right"
                size={34}
                color={Colors.darkGray}
                style={{ backgroundColor: Colors.lightGray }}
              />
            </View>
            <TouchableWithoutFeedback onPress={handleSignout}>
              <View style={styles.action_container}>
                <View style={styles.action_left}>
                  <Avatar.Icon
                    icon="logout"
                    size={34}
                    color="#ffffff"
                    style={{ backgroundColor: Colors.pink }}
                  />
                  <Text
                    style={{ marginLeft: 10, fontSize: 15, color: Colors.pink }}
                  >
                    Logout
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffffff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    justifySelf: "center",
  },
  setting_wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  setting_container: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  info_wrapper: {
    alignItems: "center",
  },
  info_name: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 5,
  },
  info_email: {
    fontSize: 14,
    color: "#666666",
  },
  info_edit: {
    marginVertical: 20,
    backgroundColor: Colors.pink,
  },
  action_wrapper: {
    flexBasis: "auto",
    width: "85%",
  },
  action_container: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  action_left: {
    flexDirection: "row",
    alignItems: "center",
  },
  prefix_icon: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
  },
});

export default SettingScreen;
