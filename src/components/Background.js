import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";

export default function Background({ children }) {
  return (
    <ScrollView style={styles.background}>
      <View style={styles.container} behavior="padding">
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    padding: 5,
    marginTop: "10%",
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
