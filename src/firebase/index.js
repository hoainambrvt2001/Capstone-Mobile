import storage from "@react-native-firebase/storage";

export const uploadImageToTrain = async (imagePath, uid) => {
  try {
    const storageRef = storage().ref(`/trainImages/${uid}.jpg`);
    await storageRef.putFile(imagePath);
    console.log("Succeed to upload training image.");
    return true;
  } catch (error) {
    console.log("Failed to upload training image.");
    return false;
  }
};
