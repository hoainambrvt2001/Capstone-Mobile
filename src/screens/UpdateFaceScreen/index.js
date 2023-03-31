import React, { useState, useEffect, useRef } from "react";
import { runOnJS } from "react-native-reanimated";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { Appbar } from "react-native-paper";
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useSelector } from "react-redux";
import Background from "../../components/Background";
import { uploadImageToTrain } from "../../firebase";
import styles from "./Styles";
import { scanFaces } from "vision-camera-face-detector";

import { useDispatch } from "react-redux";
import { updateUserById } from "../../store/reducers/userSlice";
import { setNotification } from "../../store/reducers/notificationSlice";
import Colors from "../../theme/Colors";

function CameraScreen({ navigation }) {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user);
  const devices = useCameraDevices();
  const device = devices.back;
  const cameraRef = useRef(null);
  const [flashModeOn, setFlashModeOn] = useState(false);
  const [faces, setFaces] = useState([]);

  const takePicture = async () => {
    try {
      if (faces.length !== 1) {
        dispatch(setNotification("Your face is invalid. Try again!"));
        return;
      }
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
        let photoName;
        if (currUser.registeredFaces.length === 2) {
          photoName = `${currUser.uid}-0.jpg`;
        } else {
          photoName = `${currUser.uid}-${currUser.registeredFaces.length}.jpg`;
        }
        const result = await uploadImageToTrain(photoPath, photoName);
        if (result) {
          const newRegisteredFaces = currUser.registeredFaces.map(
            (item) => item
          );
          newRegisteredFaces.push({
            name: photoName,
            url: result,
          }),
            dispatch(
              updateUserById({
                token: currUser.token,
                id: currUser.uid,
                registered_faces: newRegisteredFaces,
              })
            );
          dispatch(setNotification("Update face successfully!"));
          navigation.goBack();
        }
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
      }
    };
    getCameraPermission();
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    const scannedFaces = scanFaces(frame);
    runOnJS(setFaces)(scannedFaces);
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
        <>
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
          <View style={styles.component_wrapper}>
            <View style={styles.component_container}>
              <View style={styles.cameraContent}>
                <Camera
                  style={styles.preview}
                  ref={cameraRef}
                  device={device}
                  photo={true}
                  isActive={true}
                  frameProcessor={frameProcessor}
                  frameProcessorFps={10}
                  orientation={"landscapeRight"}
                />
                <Image
                  source={require("../../assets/photoScanRingIcon.png")}
                  resizeMode="contain"
                  style={styles.photoScanRingIcon}
                />
                <View style={styles.frontIdContainer}>
                  <Text
                    style={{
                      ...styles.frontIdHeading,
                      color: faces.length === 1 ? "#23DC3D" : Colors.pink,
                    }}
                  >
                    Front of ID
                  </Text>
                  <Text style={styles.frontIdPeregraph}>
                    {faces.length === 1
                      ? "All good, the face is valid.\nLet's take a photo of your face!"
                      : "Fit the front of your ID within the frame - check for good lighting!"}
                  </Text>
                  <View style={styles.clickPhotoBtnContent}>
                    <TouchableOpacity
                      style={{
                        ...styles.clickPhotoBtn,
                        borderColor:
                          faces.length === 1 ? "#23DC3D" : Colors.pink,
                      }}
                      onPress={takePicture.bind(this)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
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
