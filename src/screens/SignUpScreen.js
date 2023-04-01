import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import Colors from "../theme/Colors";
import { createUserByEmailAndPassword } from "../store/reducers/userSlice";
import { useDispatch } from "react-redux";
import { AuthContext } from "../auth";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { signUp } = useContext(AuthContext);

  const userSchema = Yup.object({
    name: Yup.string().required("Name is a required field."),
    email: Yup.string()
      .email("It must be a valid email.")
      .required("Email is a required field."),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number."
      )
      .required("Password is a required field."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "The password confirmation does not match.")
      .required("Confirm Password is a required field."),
  });

  const handleSignUp = async (values, actions) => {
    const params = {
      name: values.name,
      email: values.email,
      password: values.password,
      signUpCallback: signUp,
    };
    dispatch(createUserByEmailAndPassword(params));
    actions.setSubmitting(false);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        initialTouched={{
          name: false,
          email: false,
          password: false,
          confirmPassword: false,
        }}
        validationSchema={userSchema}
        onSubmit={(values, actions) => {
          handleSignUp(values, actions);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => {
          return (
            <>
              <TextInput
                label="Name"
                returnKeyType="next"
                mode="outlined"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                error={touched.name && errors.name !== undefined}
                errorText={errors.name}
              />
              <TextInput
                label="Email"
                returnKeyType="next"
                mode="outlined"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                error={touched.email && errors.email !== undefined}
                errorText={errors.email}
              />
              <TextInput
                label="Password"
                returnKeyType="done"
                mode="outlined"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={touched.password && errors.password !== undefined}
                errorText={errors.password}
                secureTextEntry
              />
              <TextInput
                label="Confirm Password"
                mode="outlined"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                error={
                  touched.confirmPassword &&
                  errors.confirmPassword !== undefined
                }
                errorText={errors.confirmPassword}
                secureTextEntry
              />
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={{ marginTop: 24 }}
              >
                Sign Up
              </Button>
            </>
          );
        }}
      </Formik>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("SignInScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: Colors.pink,
  },
});

export default SignUpScreen;
