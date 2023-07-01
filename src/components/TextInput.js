import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import Colors from "../theme/Colors";
import { theme } from "../theme/theme";

export default function TextInput({ errorText, error, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={Colors.pink}
        underlineColor="transparent"
        activeOutlineColor={Colors.darkGray}
        outlineColor={Colors.opacityDarkGray}
        mode="outlined"
        {...props}
      />
      {description && !error ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {error ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
  },
  input: {
    backgroundColor: "#ffffff",
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
