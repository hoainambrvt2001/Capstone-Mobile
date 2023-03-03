import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, View, Image, Linking, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import Background from "../../components/Background";
import Colors from "../../theme/Colors";

import styles from "./Styles";

function CameraScreen({ navigation }) {
  const [flashModeOn, setFlashModeOn] = useState(false);
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [imgSrc, setImgSrc] = useState("");

  const takePicture = async () => {
    console.log("Hello");
    console.log(cameraRef.current !== null);
    try {
      if (cameraRef.current !== null) {
        const options = {
          flash: flashModeOn ? "on" : "off",
        };
        console.log("Hi");
        const photo = await cameraRef.current.takePhoto(options);
        // setImgSrc(photo.path);
        console.log(photo.path);
      } else {
        console.log("None");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);
      if (permission == "denied") await Linking.openSettings();
    }
    getPermission();
  }, []);

  return (
    <>
      <Appbar.Header mode="center-aligned" style={styles.header}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Update face" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      {device ? (
        <View style={styles.component_wrapper}>
          <View style={styles.component_container}>
            <View style={styles.cameraContent}>
              <Camera
                style={styles.preview}
                ref={cameraRef}
                device={device}
                photo={true}
                isActive={true}
              />
              <Image
                source={require("../../assets/photoScanRingIcon.png")}
                resizeMode="contain"
                style={styles.photoScanRingIcon}
              />
              <View style={styles.frontIdContainer}>
                <Text style={styles.frontIdHeading}>Front of ID</Text>
                <Text style={styles.frontIdPeregraph}>
                  Fit the front of your ID within the frame - check for good
                  lighting.
                </Text>
                <View style={styles.clickPhotoBtnContent}>
                  <TouchableOpacity
                    style={styles.clickPhotoBtn}
                    onPress={takePicture.bind(this)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.flashOnOfBtnContent}>
              <TouchableOpacity
                style={styles.flashOnOfBtn}
                onPress={() => setFlashModeOn(!flashModeOn)}
              >
                <Image
                  source={
                    flashModeOn
                      ? require("../../assets/FlashOn.png")
                      : require("../../assets/FlashOff.png")
                  }
                  resizeMode="contain"
                  style={styles.flashOnOffImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <Background>
          <View>
            <Text>Sorry, your camera is not available now!</Text>
          </View>
        </Background>
      )}
    </>
  );
}

export default CameraScreen;
