import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "1009737711764-6eomkq5mcb6t96gvmn1057mfu7fttfg9.apps.googleusercontent.com",
});

const CustomGoogleSignIn = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <GoogleSigninButton
      style={{ width: "100%", borderRadius: 5 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      // disabled={this.state.isSigninInProgress}
    />
  );
};

export default CustomGoogleSignIn;
