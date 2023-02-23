import FontHelper from "../helpers/FontHelper.js";
import { Platform } from "react-native";
import Colors from "./Colors";

const size = {
  h1: "32rem",
  h2: "28rem",
  h3: "24rem",
  h4: "18rem",
  larg: "30rem",
  regular: "16rem",
  medium: "14rem",
  small: "13rem",
  tiny: "12rem",
};

const style = {
  placeHolderText: {
    ...FontHelper.font({
      fontFamily: "PlusJakarta",
      fontWeight: "300",
    }),
    fontSize: size.regular,
    color: Colors.lightGray,
  },
  textInputText: {
    ...FontHelper.font({
      fontFamily: "PlusJakarta",
      fontWeight: "500",
    }),
  },
  buttonText: {
    ...FontHelper.font({
      fontFamily: "PlusJakarta",
      fontWeight: "700",
    }),
  },
  lightText: {
    ...FontHelper.font({
      fontFamily: "PlusJakarta",
      fontWeight: "300",
    }),
  },
  normalText: {
    ...FontHelper.font({
      fontFamily: "PlusJakarta",
      fontWeight: "400",
    }),
  },
  boldText: {
    ...FontHelper.font({
      fontFamily: "PlusJakarta",
      fontWeight: Platform.OS === "ios" ? "700" : "600",
    }),
  },
};

export default {
  size,
  style,
};
