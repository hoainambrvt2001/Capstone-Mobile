import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Colors from "../theme/Colors";
import Fonts from "../theme/Fonts";
import Icon from "react-native-vector-icons/FontAwesome5";

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
      <View style={styles.access_icon_wrapper}>
        <Icon name="walking" style={styles.access_icon} />
      </View>
      <View style={styles.access_text}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.access_action}>{"Check in: "}</Text>
          <Text style={styles.access_time}>{time}</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.access_room} numberOfLines={1}>
            In room: {room}
          </Text>
          <Text style={styles.access_organization} numberOfLines={1}>
            At: {organization}
          </Text>
        </View>
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
  access_icon_wrapper: {
    width: "50rem",
    height: "50rem",
    borderRadius: "12rem",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.pink,
  },
  access_icon: {
    color: Colors.white,
    fontSize: "25rem",
  },
  access_text: {
    paddingLeft: "19rem",
    flexDirection: "column",
  },
  access_action: {
    lineHeight: "21rem",
    color: Colors.black,
    marginBottom: "5rem",
    fontSize: Fonts.size.normalText,
    fontWeight: "bold",
  },
  access_room: {
    lineHeight: "18rem",
    color: Colors.darkGray,
    fontSize: Fonts.size.medium,
    marginBottom: "5rem",
    fontWeight: "normal",
  },
  access_organization: {
    lineHeight: "18rem",
    color: Colors.darkGray,
    fontSize: Fonts.size.medium,
    fontWeight: "normal",
  },
  access_time: {
    color: Colors.darkGray,
  },
});

export default AccessHistoryCard;
