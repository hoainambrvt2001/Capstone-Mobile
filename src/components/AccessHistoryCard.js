import React from "react";
import { View, Text, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Colors from "../theme/Colors";
import Fonts from "../theme/Fonts";

const AccessHistoryCard = ({
  access_hitory_info = {
    room: "B4-404",
    organization: "HCMUT",
    time: "10:00 02/23/2023",
  },
}) => {
  const { room, organization, time } = access_hitory_info;
  return (
    <View style={styles.card_wrapper}>
      <Image
        source={require("../assets/avatar.jpg")}
        resizeMode="contain"
        style={styles.access_image}
      />
      <View style={styles.access_text}>
        <View style={styles.access_location}>
          <Text style={styles.access_room}>Action: Check-in</Text>
          <Text style={styles.access_organization}>
            At: {room} in {organization}
          </Text>
        </View>
        <Text style={styles.access_time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  card_wrapper: {
    // paddingHorizontal: "4rem",
    paddingTop: "4rem",
    paddingBottom: "14rem",
    marginBottom: "17rem",
    borderBottomWidth: "2rem",
    borderColor: Colors.gray,
    flexDirection: "row",
    maxWidth: 340,
  },
  access_image: {
    width: "50rem",
    height: "50rem",
    borderRadius: "12rem",
  },
  access_text: {
    paddingLeft: "19rem",
    flexDirection: "row",
  },
  access_room: {
    lineHeight: "21rem",
    color: Colors.black,
    marginBottom: "5rem",
    fontSize: Fonts.size.normalText,
    ...Fonts.style.boldText,
  },
  access_organization: {
    lineHeight: "18rem",
    color: Colors.darkGray,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  access_time: {
    color: Colors.darkBlack,
  },
});

export default AccessHistoryCard;
