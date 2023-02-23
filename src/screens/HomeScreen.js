import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Avatar, Text } from "react-native-paper";
import AccessHistoryCard from "../components/AccessHistoryCard";
import Background from "../components/Background";
import WeatherWidget from "../components/WeatherWidget";
import Colors from "../theme/Colors";

const HomeScreen = () => {
  return (
    <>
      <Appbar.Header style={styles.header}>
        <View style={styles.title_wrapper}>
          <Appbar.Content
            title="Hello Nam Vo,"
            titleStyle={styles.header_title}
          />
          <Appbar.Content
            title="Thursday, 23th Feb 2023"
            titleStyle={styles.header_subtitle}
          />
        </View>
        <Avatar.Image size={35} source={require("../assets/avatar.jpg")} />
      </Appbar.Header>

      <Background>
        <WeatherWidget />
        <View style={styles.section_wrapper}>
          <Text style={styles.section_title}>Recent activities</Text>
          <AccessHistoryCard />
          <AccessHistoryCard />
          <AccessHistoryCard />
        </View>
      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    maxWidth: 340,
  },
  title_wrapper: {
    marginTop: 8,
    justifyContent: "center",
  },
  header_title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.pink,
  },
  header_subtitle: {
    marginTop: -5,
    fontSize: 15,
    color: Colors.darkGray,
  },
  section_wrapper: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  section_title: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.pink,
    marginBottom: 5,
  },
});

export default HomeScreen;
