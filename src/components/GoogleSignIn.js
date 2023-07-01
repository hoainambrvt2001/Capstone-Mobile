import {
  // GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
// import auth from "@react-native-firebase/auth";
// import { useDispatch } from "react-redux";
// import { signInByGoogle } from "../store/reducers/userSlice";

// GoogleSignin.configure({
//   webClientId:
//     "1009737711764-6eomkq5mcb6t96gvmn1057mfu7fttfg9.apps.googleusercontent.com",
// });

const CustomGoogleSignIn = () => {
  // const dispatch = useDispatch();

  // const onGoogleButtonPress = async () => {
  //   // Check if your device supports Google Play
  //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //   // Get the users ID token
  //   const { idToken } = await GoogleSignin.signIn();

  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   // Sign-in the user with the credential
  //   await auth()
  //     .signInWithCredential(googleCredential)
  //     .then(async (data) => {
  //       const idTokenResult = await data.user.getIdTokenResult();
  //       const params = {
  //         name: data.user.displayName,
  //         email: data.user.email,
  //         photoURL: data.user.photoURL,
  //         phoneNumber: data.user.phoneNumber,
  //         token: idTokenResult.token,
  //         expirationTime: idTokenResult.expirationTime,
  //       };
  //       dispatch(signInByGoogle(params));
  //     });
  // };

  return (
    <GoogleSigninButton
      style={{ width: "100%", borderRadius: 5 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      //  onPress={onGoogleButtonPress}
    />
  );
};

export default CustomGoogleSignIn;
