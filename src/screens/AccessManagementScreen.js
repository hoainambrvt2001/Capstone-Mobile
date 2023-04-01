import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { Text, Appbar, Button, Dialog } from "react-native-paper";
import { useSelector } from "react-redux";
import Colors from "../theme/Colors";
import { fetchListRequestByUID } from "../api";
import RequestAccessCard from "../components/RequestAccessCard";

const AccessManagementScreen = ({ navigation }) => {
  const currUser = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);
  const [listRequest, setListRequest] = useState([]);

  useEffect(() => {
    const fetchListRequest = async () => {
      const res = await fetchListRequestByUID({
        uid: currUser.uid,
        token: currUser.token,
      });
      if (res) setListRequest(res.data);
    };
    fetchListRequest();
    return () => {};
  }, []);

  const showUpdateFaceDialog = () => setVisible(true);

  const hideUpdateFaceDialog = () => setVisible(false);

  const handleRequestAdmin = () => {
    if (!currUser) return;
    if (currUser.registeredFaces.length !== 0) {
      navigation.push("RequestAdminScreen");
    } else {
      showUpdateFaceDialog();
    }
  };

  return (
    <>
      <Appbar.Header mode="center-aligned" style={styles.header}>
        <Appbar.BackAction
          onPress={() => {
            navigation.push("MainScreen");
          }}
        />
        <Appbar.Content
          title="Access Management"
          titleStyle={styles.header_title}
        />
      </Appbar.Header>
      <ScrollView style={styles.section_wrapper}>
        <View style={styles.section_container}>
          <Text style={styles.section_title}>
            Registered Access Organization
          </Text>
          {listRequest.length !== 0 ? (
            listRequest.map((request, idx) => {
              return <RequestAccessCard key={idx} request={request} />;
            })
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginVertical: 20,
              }}
            >
              <Image
                alt="no-content"
                source={require("../assets/no-content.png")}
                style={{ width: 128, height: 128, marginBottom: 10 }}
              />
              <Text style={{ textAlign: "center", fontSize: 15 }}>
                {
                  "There is no request access.\nTo access any rooms, you need to register!"
                }
              </Text>
            </View>
          )}
          <Button
            mode="contained"
            style={styles.btnRequest}
            onPress={handleRequestAdmin}
          >
            Request Admin
          </Button>
        </View>
      </ScrollView>
      <Dialog
        visible={visible}
        onDismiss={hideUpdateFaceDialog}
        style={{ backgroundColor: Colors.white }}
      >
        <Dialog.Title style={styles.dialog_title}>
          Update your face!
        </Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            To request access from the admin, you need to update your face
            first.
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "space-between" }}>
          <Button
            onPress={hideUpdateFaceDialog}
            style={{ padding: 10 }}
            buttonColor={Colors.white}
            textColor={Colors.pink}
            mode="elevated"
          >
            Later
          </Button>
          <Button
            onPress={() => {
              hideUpdateFaceDialog();
              navigation.push("UpdateFaceScreen");
            }}
            style={{ padding: 10 }}
            buttonColor={Colors.pink}
            mode="contained"
          >
            Go to update
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffffff",
  },
  header_title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    justifySelf: "center",
  },
  section_wrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  section_container: {
    flex: 1,
    paddingHorizontal: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  section_title: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.pink,
    marginBottom: 10,
  },
  btnRequest: {
    backgroundColor: Colors.pink,
    borderRadius: 5,
    width: "100%",
    marginTop: 5,
  },
  dialog_title: {
    color: Colors.pink,
    fontWeight: "bold",
  },
});

export default AccessManagementScreen;
