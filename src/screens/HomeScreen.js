import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Avatar, Text } from "react-native-paper";
import AccessHistoryCard from "../components/AccessHistoryCard";
import Background from "../components/Background";
import WeatherWidget from "../components/WeatherWidget";
import Colors from "../theme/Colors";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import * as Location from "expo-location";
import { fetchListAccessHistory, fetchWeatherData } from "../api";

const HomeScreen = () => {
  const user = useSelector((state) => state.user);
  const today = format(new Date(), "cccc, do LLL yyyy");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [accessHistoryData, setAccessHistoryData] = useState([]);

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };
    getLocationPermission();
  }, []);

  useEffect(() => {
    const getWeatherData = async (location) => {
      if (location && !weatherData) {
        const fetchData = await fetchWeatherData(location.coords);
        setWeatherData(fetchData);
      }
    };
    getWeatherData(location);
  }, [location]);

  useEffect(() => {
    const getAccessHistoryData = async () => {
      if (user.token) {
        const res = await fetchListAccessHistory({
          token: user.token,
        });
        if (res) {
          const accessHistory = res.data.map((accessItem) => {
            return {
              room: accessItem.room.name,
              organization: accessItem.organization.name,
              time: format(new Date(accessItem.accessed_time), "Pp"),
            };
          });
          setAccessHistoryData(accessHistory);
        }
      }
    };
    getAccessHistoryData();
  }, [user.token]);

  return (
    <>
      <Appbar.Header style={styles.header}>
        <View style={styles.title_wrapper}>
          <Appbar.Content
            title={`Hello, ${user.name}`}
            titleStyle={styles.header_title}
          />
          <Appbar.Content title={today} titleStyle={styles.header_subtitle} />
        </View>
        <Avatar.Image
          source={
            user.photoURL
              ? { uri: user.photoURL }
              : require("../assets/avatar.jpg")
          }
          size={40}
        />
      </Appbar.Header>

      <Background>
        <WeatherWidget weatherData={weatherData} />
        <View style={styles.section_wrapper}>
          <Text style={styles.section_title}>Recent activities</Text>
          {accessHistoryData.map((item, index) => {
            return <AccessHistoryCard key={index} access_hitory_info={item} />;
          })}
        </View>
        <View style={styles.box}></View>
      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
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
  box: {
    height: 40,
  },
});

export default HomeScreen;
