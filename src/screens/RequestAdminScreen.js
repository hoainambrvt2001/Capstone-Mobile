import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Button, Appbar } from "react-native-paper";
import Colors from "../theme/Colors";
import TextInputIcon from "../components/TextInputIcon";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SelectList } from "react-native-dropdown-select-list";
import { createRequestAccess, fetchOrganizationByName } from "../api";
import { setNotification } from "../store/reducers/notificationSlice";

const RequestAdminScreen = ({ navigation }) => {
  const [queryOrganization, setQueryOrganization] = useState("");
  const [totalOrganization, setTotalOrganization] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const initRequestInfo = {
    name: user.name,
    email: user.email,
    phone_number: user.phoneNumber ? user.phoneNumber : "",
    organization_id: "",
    note: "",
  };
  useEffect(() => {
    const fetchOrganization = async () => {
      const params = {
        token: user.token,
        s: queryOrganization,
        page: 1,
        limit: 5,
      };
      const res = await fetchOrganizationByName(params);
      if (res) {
        setTotalOrganization(
          res.data.map((item) => {
            return {
              key: item._id,
              value: item.name,
            };
          })
        );
      }
    };
    fetchOrganization();
    return () => {};
  }, [queryOrganization]);

  const requestInfoSchema = Yup.object({
    name: Yup.string().required("Full name is a required field."),
    email: Yup.string().email().required("Email is a required field."),
    phone_number: Yup.string().required("Contact is a required field."),
    organization_id: Yup.string().required("Organization is a required field."),
    note: Yup.string(),
  });

  const handleSendRequest = async (values, actions) => {
    const params = {
      token: user.token,
      organization_id: values.organization_id,
      note: values.note,
      requested_time: new Date().toISOString(),
    };
    const createdRequest = await createRequestAccess(params);
    if (createdRequest) {
      dispatch(setNotification("Successful request creation!"));
    } else {
      dispatch(setNotification("Fail to make a request!"));
    }
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
            initialValues={initRequestInfo}
            enableReinitialize={true}
            initialTouched={{
              organization_id: false,
              phone_number: false,
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
                    <Text style={{ marginBottom: 15 }}>
                      <Text style={{ color: Colors.pink, fontWeight: "bold" }}>
                        Note:{" "}
                      </Text>{" "}
                      Make sure that your organization has been registered.
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      marginVertical: 4,
                    }}
                  >
                    <SelectList
                      setSelected={(val) =>
                        setFieldValue("organization_id", val)
                      }
                      onSelect={(val) => setQueryOrganization(val)}
                      data={totalOrganization}
                      save="key"
                      boxStyles={{
                        borderRadius: 25,
                        borderColor: Colors.opacityDarkGray,
                      }}
                      dropdownTextStyles={{
                        fontSize: 15,
                      }}
                      dropdownStyles={{
                        borderRadius: 15,
                        borderColor: Colors.opacityDarkGray,
                        backgroundColor: Colors.lightWhite,
                      }}
                      placeholder="Organization"
                      searchPlaceholder="Search organization"
                      inputStyles={{
                        fontSize: 16,
                        color: Colors.black,
                      }}
                    />
                  </View>
                  <TextInputIcon
                    value={values.name}
                    inputLablel={"Name"}
                    onChangeText={handleChange("fullname")}
                    onBlur={handleBlur("fullname")}
                    iconName="account-outline"
                    returnKeyType="next"
                    editable={false}
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
                    editable={false}
                    errorText={errors.email}
                    error={touched.email && errors.email !== undefined}
                  />
                  <TextInputIcon
                    value={values.phone_number}
                    inputLablel={"Contact"}
                    onChangeText={handleChange("phone_number")}
                    onBlur={handleBlur("phone_number")}
                    iconName="phone-outline"
                    returnKeyType="next"
                    editable={!user.phoneNumber}
                    errorText={errors.phone_number}
                    error={
                      touched.phone_number && errors.phone_number !== undefined
                    }
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
