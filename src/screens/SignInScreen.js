import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import { theme } from "../theme/theme";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Logo from "../components/Logo";
import Header from "../components/Header";
import CustomGoogleSignIn from "../components/GoogleSignIn";
import Colors from "../theme/Colors";
import { useDispatch } from "react-redux";
import { signInByEmailAndPassword } from "../store/reducers/userSlice";
import { AuthContext } from "../auth";

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { signIn } = useContext(AuthContext);

  const userSchema = Yup.object({
    email: Yup.string()
      .email("It must be a valid email.")
      .required("Email is a required field."),
    password: Yup.string().required("Password is a required field."),
  });

  const handleSignIn = async (values, actions) => {
    const params = {
      email: values.email,
      password: values.password,
      signInCallback: signIn,
    };
    dispatch(signInByEmailAndPassword(params));
    actions.setSubmitting(false);
    navigation.navigate("MainScreen");
  };

  return (
    <Background>
      <Logo />
      <Header>Welcome back.</Header>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        initialTouched={{
          email: false,
          password: false,
        }}
        validationSchema={userSchema}
        onSubmit={(values, actions) => {
          handleSignIn(values, actions);
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
                label="Email"
                returnKeyType="next"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={touched.email && errors.email !== undefined}
                errorText={errors.email}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
              <TextInput
                label="Password"
                returnKeyType="done"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={touched.password && errors.password !== undefined}
                errorText={errors.password}
                secureTextEntry
              />
              <View style={styles.forgotPassword}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ResetPasswordScreen", {
                      parentRoute: "SignInScreen",
                    })
                  }
                >
                  <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>
              <Button
                mode="contained"
                style={{ padding: 2, borderRadius: 5 }}
                labelStyle={{ fontSize: 16 }}
                onPress={handleSubmit}
              >
                Sign In
              </Button>
            </>
          );
        }}
      </Formik>

      <View style={styles.row}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.push("SignUpScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <View>
          <Text style={{ width: 40, textAlign: "center" }}>or</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>
      <View style={styles.row}>
        <CustomGoogleSignIn />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: Colors.pink,
  },
});

export default SignInScreen;
