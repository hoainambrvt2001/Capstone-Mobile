import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../theme/theme";
import Colors from "../theme/Colors";

export default function TextInputIcon({
  errorText,
  error,
  description,
  iconName,
  inputLablel,
  onFocusCallback,
  ...props
}) {
  return (
    <View style={styles.container}>
      <Input
        onFocus={onFocusCallback}
        style={styles.input}
        selectionColor={Colors.pink}
        outlineColor={Colors.opacityDarkGray}
        underlineColor="transparent"
        outlineStyle={styles.inputOutline}
        activeOutlineColor={Colors.darkGray}
        mode="outlined"
        label={inputLablel}
        left={<Input.Icon icon={iconName} />}
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
    marginVertical: 4,
  },
  input: {
    backgroundColor: "#ffffff",
  },
  inputOutline: {
    borderRadius: 25,
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
