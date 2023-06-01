import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { useSelector } from "react-redux";
import styles from "./Styles";

import { useDispatch } from "react-redux";
import { updateUserById } from "../../store/reducers/userSlice";
import { setNotification } from "../../store/reducers/notificationSlice";
import Colors from "../../theme/Colors";

// Expo Camera:
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as ImageManipulator from "expo-image-manipulator";
import Button from "../../components/Button";

// Extract file:
import mime from "mime";

function InitialCameraScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
              navigation.navigate("MainScreen");
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
              navigation.navigate("MainScreen");
            }}
          />
          <Appbar.Content title="Update face" titleStyle={styles.headerTitle} />
        </Appbar.Header>
      </>
    );
  }

  const takePicture = async () => {
    try {
      let capturedPhoto = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      const resizePhoto = await ImageManipulator.manipulateAsync(
        capturedPhoto.uri,
        [{ resize: { width: 500, height: 375 } }],
        { compress: 1 }
      );
      const fileUri = resizePhoto.uri;
      const fileName =
        user.registeredFaces.length === 2
          ? `${user.uid}-0.jpg`
          : `${user.uid}-${user.registeredFaces.length}.jpg`;
      const fileType = mime.getType(fileUri);
      dispatch(
        updateUserById({
          token: user.token,
          face_images: {
            uri: fileUri,
            type: fileType,
            name: fileName,
          },
        })
      );
      dispatch(setNotification("Update face successfully!"));
      navigation.navigate("InitialRequestAccessScreen");
    } catch (e) {
      dispatch(setNotification("Failed to update face!"));
      console.log(e);
    }
  };

  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
  };

  return (
    <>
      <Appbar.Header mode="center-aligned" style={styles.header}>
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
                  <Button
                    mode="contained"
                    onPress={() => navigation.navigate("MainScreen")}
                    style={{
                      width: 150,
                      alignSelf: "center",
                      marginTop: 50,
                      backgroundColor: Colors.pink,
                    }}
                  >
                    Skip for now
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
}

export default InitialCameraScreen;
