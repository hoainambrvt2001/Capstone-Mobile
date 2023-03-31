import storage from "@react-native-firebase/storage";

export const uploadImageToTrain = async (imagePath, user) => {
  try {
    const storageRef = storage().ref(
      `/trainImages/${user.uid}-${user.numberFaceImages}.jpg`
    );
    await storageRef.putFile(imagePath);
    const result = await storageRef.getDownloadURL(
      `/trainImages/${user.uid}-${user.numberFaceImages}.jpg`
    );
    return result;
  } catch (error) {
    console.log("Failed to upload training image.");
    return null;
  }
};

export const uploadAvatarImage = async (imagePath, uid) => {
  try {
    const storageRef = storage().ref(`/avatarImages/${uid}.jpg`);
    await storageRef.putFile(imagePath);
    const result = await storageRef.getDownloadURL(`/avatarImages/${uid}.jpg`);
    return result;
  } catch (error) {
    console.log("Failed to upload training image.");
    return null;
  }
};
