import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import Colors from "../theme/Colors";

const WeatherWidget = ({ weatherData }) => {
  let renderData = weatherData;
  if (!renderData) {
    renderData = {
      temp: 32,
      humidity: 32,
      windSpeed: 15,
      locationName: "Ho Chi Minh City",
      country: "VN",
      iconUri: {
        uri: "https://openweathermap.org/img/wn/10d@2x.png",
      },
      cloudiness: 0,
    };
  }
  return (
    <View style={styles.card_wrapper}>
      <View style={styles.card_container}>
        <View style={styles.image_wrapper}>
          <Image source={renderData.iconUri} style={styles.image} />
        </View>
        <View style={styles.temp_wrapper}>
          <Text style={styles.temp_number}>{renderData.temp}</Text>
          <Text style={styles.temp_unit}>o</Text>
        </View>
        <View style={styles.location_wrapper}>
          <Text style={styles.location_text}>
            {renderData.locationName}, {renderData.country}
          </Text>
        </View>
        <View style={styles.detail_wrapper}>
          <View style={styles.detail_card}>
            <Text style={styles.detail_title}>Wind now</Text>
            <View style={styles.detail_content}>
              <Text style={styles.detail_number}>{renderData.windSpeed}</Text>
              <Text style={styles.detail_unit}>km</Text>
            </View>
          </View>
          <View style={styles.detail_card}>
            <Text style={styles.detail_title}>Humidity</Text>
            <View style={styles.detail_content}>
              <Text style={styles.detail_number}>{renderData.humidity}</Text>
              <Text style={styles.detail_unit}>%</Text>
            </View>
          </View>
          <View style={styles.detail_card}>
            <Text style={styles.detail_title}>Cloudiness</Text>
            <View style={styles.detail_content}>
              <Text style={styles.detail_number}>{renderData.cloudiness}</Text>
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
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40,
  },
  image: {
    width: 200,
    height: 200,
  },
  temp_wrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: -30,
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
