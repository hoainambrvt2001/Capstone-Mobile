import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, Button, Appbar } from "react-native-paper";
import Colors from "../theme/Colors";
import * as ImagePicker from "expo-image-picker";
import TextInputIcon from "../components/TextInputIcon";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

const EditProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const [userAvatar, setUserAvatar] = useState({
    isChanged: false,
    uri: "",
  });
  const userInfoSchema = Yup.object({
    name: Yup.string().required("Full name is a required field."),
    email: Yup.string().email().required("Email is a required field."),
    phone: Yup.number(),
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // let result = await ImagePicker.launchCameraAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [3, 3],
    //   quality: 1,
    // });

    if (!result.canceled) {
      setUserAvatar({
        isChanged: true,
        uri: result.assets[0].uri,
      });
    }
  };
  const handleEditProfile = (values, actions) => {
    actions.setSubmitting(false);
    navigation.goBack();
  };
  return (
    <>
      <Appbar.Header mode="center-aligned" style={styles.header}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Edit Profile" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <ScrollView style={styles.wrapper}>
        <View style={styles.container}>
          <Formik
            initialValues={{
              name: user.name,
              email: user.email,
              phone: user.phone,
            }}
            enableReinitialize={true}
            initialTouched={{
              name: false,
            }}
            validationSchema={userInfoSchema}
            onSubmit={(values, actions) => {
              handleEditProfile(values, actions);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              values,
              errors,
              touched,
            }) => {
              return (
                <>
                  <TouchableOpacity activeOpacity={0.6} onPress={pickImage}>
                    <View>
                      <Avatar.Image
                        source={require("../assets/avatar.jpg")}
                        size={130}
                      />
                      <Avatar.Icon
                        size={32}
                        icon="pencil"
                        style={styles.avatar_edit}
                        color={Colors.white}
                        backgroundColor={Colors.pink}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.box}></View>
                  <TextInputIcon
                    value={values.name}
                    inputLablel={"Fullname"}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    iconName="account-outline"
                    returnKeyType="next"
                    errorText={errors.name}
                    error={touched.name && errors.name !== undefined}
                  />
                  <TextInputIcon
                    value={values.email}
                    inputLablel={"Email"}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    iconName="email-outline"
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    returnKeyType="next"
                    errorText={errors.email}
                    error={touched.email && errors.email !== undefined}
                  />
                  <TextInputIcon
                    value={values.phone}
                    inputLablel={"Phone"}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    iconName="phone-outline"
                    returnKeyType="next"
                    errorText={errors.phone}
                    error={touched.phone && errors.phone !== undefined}
                  />
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.save_edit_btn}
                  >
                    Edit Profile
                  </Button>
                </>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    justifySelf: "center",
  },
  avatar_edit: {
    position: "absolute",
    bottom: 0,
    right: "10%",
  },
  box: {
    marginVertical: 10,
  },
  select_date_btn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.opacityDarkGray,
    color: Colors.darkGray,
    width: "100%",
  },
  save_edit_btn: {
    backgroundColor: Colors.pink,
    width: "100%",
    marginVertical: 20,
  },
});

export default EditProfileScreen;
