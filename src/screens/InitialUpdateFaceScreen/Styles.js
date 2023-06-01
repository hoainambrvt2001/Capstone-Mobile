import EStyleSheet from "react-native-extended-stylesheet";
import Colors from "../../theme/Colors";
import Fonts from "../../theme/Fonts";

const styles = EStyleSheet.create({
  header: {
    backgroundColor: "#ffffff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    justifySelf: "center",
  },
  component_wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  component_container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  preview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  capture: {
    borderRadius: "5rem",
    padding: "15rem",
    paddingHorizontal: "20rem",
    alignSelf: "center",
    margin: "20rem",
  },
  clickPhotoBtnContent: {
    width: "70rem",
    height: "70rem",
    marginLeft: "auto",
    marginRight: "auto",
    shadowOffset: {
      width: 0,
      height: "10rem",
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurPink,
    zIndex: 999999,
  },
  clickPhotoBtn: {
    backgroundColor: Colors.white,
    width: "100%",
    height: "100%",
    borderWidth: "15rem",
    borderColor: Colors.pink,
    borderRadius: "35rem",
    overflow: "hidden",
  },
  photoScanRingIcon: {
    width: "90%",
    height: "290rem",
    position: "absolute",
    left: "5%",
    top: 10,
  },
  frontIdContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.white,
    paddingTop: "37rem",
  },
  frontIdHeading: {
    marginBottom: "23rem",
    color: Colors.black,
    lineHeight: "23rem",
    letterSpacing: "-0.02rem",
    textAlign: "center",
    fontSize: Fonts.size.h4,
    ...Fonts.style.buttonText,
  },
  frontIdPeregraph: {
    marginBottom: "37rem",
    color: Colors.darkGray,
    lineHeight: "21rem",
    textAlign: "center",
    width: "225rem",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  flashOnOfBtnContent: {
    position: "absolute",
    right: "20rem",
    top: 15,
  },
  flashOnOfBtn: {
    width: "40rem",
    height: "40rem",
    alignItems: "center",
    justifyContent: "center",
  },
  flashOnOffImg: {
    width: "25rem",
    height: "25rem",
  },
  waitingText: {
    flex: 1,
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContent: {
    height: "100%",
    width: "100%",
  },
});

export default styles;
