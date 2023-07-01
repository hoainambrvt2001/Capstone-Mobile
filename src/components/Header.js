import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Colors from "../theme/Colors";
import { theme } from "../theme/theme";

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: Colors.pink,
    fontWeight: "bold",
    paddingVertical: 12,
  },
});
