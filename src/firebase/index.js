import storage from "@react-native-firebase/storage";

export const uploadImageToTrain = async (photoPath, photoName) => {
  try {
    const storageRef = storage().ref(`/train-images/${photoName}`);
    await storageRef.putFile(photoPath);
    const result = await storageRef.getDownloadURL(
      `/train-images/${photoName}`
    );
    return result;
  } catch (error) {
    console.log("Failed to upload training image.");
    return null;
  }
};

export const uploadAvatarImage = async (photoPath, photoName) => {
  try {
    const storageRef = storage().ref(`/avatar-images/${photoName}`);
    await storageRef.putFile(photoPath);
    const result = await storageRef.getDownloadURL(
      `/avatar-images/${photoName}`
    );
    return result;
  } catch (error) {
    console.log("Failed to upload training image.");
    return null;
  }
};
