import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, View, Image, Linking, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useSelector } from "react-redux";
import Background from "../../components/Background";
import { uploadImageToTrain } from "../../firebase";
import Colors from "../../theme/Colors";
import styles from "./Styles";

function CameraScreen({ navigation }) {
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [flashModeOn, setFlashModeOn] = useState(false);
  const [faceImgSrc, setFaceImgSrc] = useState("");
  const currentUser = useSelector((state) => state.user);

  const takePicture = async () => {
    try {
      if (cameraRef.current !== null) {
        const options = {
          quality: 100,
          skipMetadata: true,
        };
        if (device.hasFlash) {
          options.flash = flashModeOn ? "on" : "off";
        }
        const photo = await cameraRef.current.takeSnapshot(options);
        const photoPath = "file://" + photo.path;
        uploadImageToTrain(photoPath, currentUser.id);
        console.log(photoPath);
        setFaceImgSrc(photoPath);
      } else {
        console.log("No camera is available.");
      }
    } catch (error) {
      console.log(error);
      console.log("Failed to capture face!");
    }
  };

  useEffect(() => {
    const getCameraPermission = async () => {
      const permission = await Camera.getCameraPermissionStatus();
      if (permission == "denied") {
        const requestPermission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${requestPermission}`);
        if (requestPermission == "denied") await Linking.openSettings();
      }
    };
    getCameraPermission();
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
          {/* <Image
            source={
              imgSrc ? { uri: imgSrc } : require("../../assets/avatar.jpg")
            }
            style={{ width: "100%", height: "30%" }}
          /> */}
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
