import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { useSelector } from "react-redux";
import { uploadImageToTrain } from "../../firebase";
import styles from "./Styles";

import { useDispatch } from "react-redux";
import { updateUserById } from "../../store/reducers/userSlice";
import { setNotification } from "../../store/reducers/notificationSlice";
import Colors from "../../theme/Colors";

// Expo Camera:
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as ImageManipulator from "expo-image-manipulator";

function CameraScreen({ navigation }) {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user);
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState(CameraType.front);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [flashModeOn, setFlashModeOn] = useState(false);
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    const getCameraPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    };
    getCameraPermission();
  }, []);

  if (hasCameraPermission === undefined) {
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
      </>
    );
  } else if (!hasCameraPermission) {
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
      </>
    );
  }

  const takePicture = async () => {
    let options = {
      quality: 1,
    };
    let capturedPhoto = await cameraRef.current.takePictureAsync(options);
    const resizePhoto = await ImageManipulator.manipulateAsync(
      capturedPhoto.uri,
      [{ resize: { width: 500, height: 375 } }],
      { compress: 1 }
    );
    const photoPath = resizePhoto.uri;
    const photoName =
      currUser.registeredFaces.length === 2
        ? `${currUser.uid}-0.jpg`
        : `${currUser.uid}-${currUser.registeredFaces.length}.jpg`;
    const result = await uploadImageToTrain(photoPath, photoName);
    if (result) {
      const newRegisteredFaces = currUser.registeredFaces.map((item) => item);
      newRegisteredFaces.push({
        name: photoName,
        url: result,
      });
      dispatch(
        updateUserById({
          token: currUser.token,
          id: currUser.uid,
          registered_faces: newRegisteredFaces,
        })
      );
      dispatch(setNotification("Update face successfully!"));
      navigation.goBack();
    } else {
      dispatch(setNotification("Failed to update face!"));
    }
  };

  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
  };

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
      {hasCameraPermission === undefined ? (
        <View>
          <Text>Requesting permissions...</Text>
        </View>
      ) : !hasCameraPermission ? (
        <View>
          <Text>
            Permission for camera not granted. Please change this in settings.
          </Text>
        </View>
      ) : (
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
                  type={cameraType}
                  ref={cameraRef}
                  flashMode={flashModeOn ? FlashMode.on : FlashMode.off}
                  onFacesDetected={handleFacesDetected}
                  faceDetectorSettings={{
                    mode: FaceDetector.FaceDetectorMode.fast,
                    detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                    runClassifications:
                      FaceDetector.FaceDetectorClassifications.none,
                    minDetectionInterval: 100,
                    tracking: true,
                  }}
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
                      onPress={takePicture}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
}

export default CameraScreen;
