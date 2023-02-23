import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import Colors from "../theme/Colors";
import Fonts from "../theme/Fonts";

const WeatherWidget = () => {
  return (
    <View style={styles.card_wrapper}>
      <View style={styles.card_container}>
        <View style={styles.image_wrapper}>
          <Image
            source={require("../assets/sun_clouds.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.temp_wrapper}>
          <Text style={styles.temp_number}>32</Text>
          <Text style={styles.temp_unit}>o</Text>
        </View>
        <View style={styles.location_wrapper}>
          <Text style={styles.location_text}>Ho Chi Minh</Text>
        </View>
        <View style={styles.detail_wrapper}>
          <View style={styles.detail_card}>
            <Text style={styles.detail_title}>Wind now</Text>
            <View style={styles.detail_content}>
              <Text style={styles.detail_number}>15</Text>
              <Text style={styles.detail_unit}>km</Text>
            </View>
          </View>
          <View style={styles.detail_card}>
            <Text style={styles.detail_title}>Humidity</Text>
            <View style={styles.detail_content}>
              <Text style={styles.detail_number}>32</Text>
              <Text style={styles.detail_unit}>%</Text>
            </View>
          </View>
          <View style={styles.detail_card}>
            <Text style={styles.detail_title}>Precipitation</Text>
            <View style={styles.detail_content}>
              <Text style={styles.detail_number}>87</Text>
              <Text style={styles.detail_unit}>%</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card_wrapper: {
    paddingHorizontal: 20,
    marginHorizontal: 30,
    marginBottom: 20,
    marginTop: "-10%",
  },
  card_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image_wrapper: {
    width: "100%",
    alignItems: "center",
    marginLeft: 50,
    marginTop: -20,
  },
  image: {
    width: 230,
    height: 200,
  },
  temp_wrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: -5,
  },
  temp_number: {
    fontWeight: "bold",
    fontSize: 60,
    color: Colors.pink,
  },
  temp_unit: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 10,
    color: Colors.pink,
  },
  location_wrapper: {
    marginBottom: 20,
  },
  location_text: {
    letterSpacing: -1,
    fontSize: 23,
    color: Colors.darkGray,
  },
  detail_wrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detail_card: {
    flex: 1,
    alignItems: "center",
  },
  detail_title: {
    color: Colors.lightBlack,
    marginBottom: 2,
  },
  detail_content: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  detail_number: {
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: -2,
    color: Colors.darkGray,
  },
  detail_unit: {
    fontSize: 15,
    marginBottom: 5,
    marginLeft: 2,
    color: Colors.darkGray,
  },
});

export default WeatherWidget;
