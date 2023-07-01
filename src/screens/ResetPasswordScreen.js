import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import auth from "@react-native-firebase/auth";

const ResetPasswordScreen = ({ navigation }) => {
  const resetEmailSchema = Yup.object({
    email: Yup.string()
      .email("It must be a valid email.")
      .required("Email is a required field."),
  });

  const sendResetPasswordEmail = (values, actions) => {
    auth()
      .sendPasswordResetEmail(values.email)
      .then(() => {
        console.log("Send reset password email successfully!");
      })
      .catch((error) => {
        console.log(`Error: Code(${error.code}), Message(${error.message})`);
      });
    actions.setSubmitting(false);
    navigation.goBack();
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <Formik
        initialValues={{
          email: "",
        }}
        initialTouched={{
          email: false,
        }}
        validationSchema={resetEmailSchema}
        onSubmit={(values, actions) => {
          sendResetPasswordEmail(values, actions);
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
                label="E-mail address"
                returnKeyType="done"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={touched.email && errors.email !== undefined}
                errorText={errors.email}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description="You will receive email with password reset link."
              />
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={{ marginTop: 16 }}
              >
                Send Instructions
              </Button>
            </>
          );
        }}
      </Formik>
    </Background>
  );
};

export default ResetPasswordScreen;
