import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Colors from "../theme/Colors";
import Fonts from "../theme/Fonts";
import Icon from "react-native-vector-icons/FontAwesome5";
import { format } from "date-fns";

const RequestAccessCard = ({ request }) => {
  const { organization, requested_time, status } = request;
  return (
    <View style={styles.card_wrapper}>
      <View style={styles.access_icon_wrapper}>
        <Icon name="key" style={styles.access_icon} />
      </View>
      <View style={styles.access_text}>
        <Text style={styles.access_organization}>
          Organization:
          <Text
            style={{ fontWeight: "400", color: Colors.darkGray }}
          >{` ${organization.name}`}</Text>
        </Text>
        <Text style={styles.access_time}>
          Requested on:
          <Text style={{ fontWeight: "400", color: Colors.darkGray }}>
            {` ${format(new Date(requested_time), "Pp")}`}
          </Text>
        </Text>
        <Text style={styles.status}>
          Status:
          <Text style={{ fontWeight: "400", color: Colors.darkGray }}>
            {` ${status.charAt(0).toUpperCase() + status.slice(1)}`}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  card_wrapper: {
    paddingTop: "4rem",
    paddingBottom: "14rem",
    marginBottom: "17rem",
    borderBottomWidth: "2rem",
    borderColor: Colors.gray,
    flexDirection: "row",
    maxWidth: 340,
    width: "100%",
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
  },
  access_organization: {
    lineHeight: "21rem",
    color: Colors.darkBlack,
    marginBottom: "5rem",
    fontSize: Fonts.size.normalText,
    fontWeight: "bold",
  },
  access_time: {
    lineHeight: "21rem",
    color: Colors.darkBlack,
    fontSize: Fonts.size.medium,
    fontWeight: "bold",
  },
  status: {
    lineHeight: "21rem",
    color: Colors.darkBlack,
    fontSize: Fonts.size.medium,
    fontWeight: "bold",
  },
});

export default RequestAccessCard;
