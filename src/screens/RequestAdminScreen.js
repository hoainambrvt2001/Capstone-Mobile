import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Button, Appbar } from "react-native-paper";
import Colors from "../theme/Colors";
import TextInputIcon from "../components/TextInputIcon";
import { Formik } from "formik";
import * as Yup from "yup";

const RequestAdminScreen = ({ navigation }) => {
  const [requestInfo, setRequestInfo] = useState({
    fullname: "Nam Vo",
    email: "nam.vo_katzebrvt@example.com",
    phone: "0437320589",
    organization: "",
    note: "",
  });

  const requestInfoSchema = Yup.object({
    fullname: Yup.string().required("Full name is a required field."),
    email: Yup.string().email().required("Email is a required field."),
    phone: Yup.number().required("Contact is a required field."),
    // TODO: Need to validate before request
    organization: Yup.string().required("Organization is a required field."),
    note: Yup.string(),
  });

  const handleSendRequest = (values, actions) => {
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
        <Appbar.Content
          title="Register Access Form"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>
      <ScrollView style={styles.wrapper}>
        <View style={styles.container}>
          <Formik
            initialValues={requestInfo}
            enableReinitialize={true}
            initialTouched={{
              name: false,
            }}
            validationSchema={requestInfoSchema}
            onSubmit={(values, actions) => {
              handleSendRequest(values, actions);
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
                  <View>
                    <Text>
                      <Text style={{ color: Colors.pink, fontWeight: "bold" }}>
                        Note:{" "}
                      </Text>{" "}
                      Make sure that your organization has been registered.
                    </Text>
                  </View>
                  <TextInputIcon
                    value={values.organization}
                    inputLablel={"Organization"}
                    onChangeText={handleChange("organization")}
                    onBlur={handleBlur("organization")}
                    iconName="domain"
                    returnKeyType="next"
                    errorText={errors.organization}
                    error={
                      touched.organization && errors.organization !== undefined
                    }
                  />
                  <TextInputIcon
                    value={values.name}
                    inputLablel={"Fullname"}
                    onChangeText={handleChange("fullname")}
                    onBlur={handleBlur("fullname")}
                    iconName="account-outline"
                    returnKeyType="next"
                    errorText={errors.fullname}
                    error={touched.fullname && errors.fullname !== undefined}
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
                    inputLablel={"Contact"}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    iconName="phone-outline"
                    returnKeyType="next"
                    errorText={errors.phone}
                    error={touched.phone && errors.phone !== undefined}
                  />

                  <TextInputIcon
                    value={values.note}
                    inputLablel={"Note"}
                    onChangeText={handleChange("note")}
                    onBlur={handleBlur("note")}
                    iconName="note-edit-outline"
                    returnKeyType="next"
                    errorText={errors.note}
                    error={touched.note && errors.note !== undefined}
                    multiline={true}
                    numberOfLines={5}
                  />
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.save_edit_btn}
                  >
                    Send request
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
    paddingHorizontal: 20,
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
  save_edit_btn: {
    backgroundColor: Colors.pink,
    width: "100%",
    marginVertical: 20,
  },
});

export default RequestAdminScreen;
