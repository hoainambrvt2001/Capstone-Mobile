import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../theme/Colors";

import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import AccessManagementScreen from "./AccessManagementScreen";

import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyInfo } from "../store/reducers/userSlice";

const TabArr = [
  {
    route: "HomeScreen",
    label: "Home",
    icon: "home",
    component: HomeScreen,
    color: Colors.pink,
    alphaClr: Colors.lighterPink,
  },
  {
    route: "AccessManagementScreen",
    label: "Manage Access",
    icon: "search",
    component: AccessManagementScreen,
    color: Colors.pink,
    alphaClr: Colors.lighterPink,
  },
  {
    route: "SettingScreen",
    label: "Setting",
    icon: "user",
    component: SettingScreen,
    color: Colors.pink,
    alphaClr: Colors.lighterPink,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}
    >
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: item.color, borderRadius: 16 },
          ]}
        />
        <View
          style={[
            styles.btn,
            {
              backgroundColor: focused ? null : Colors.white,
            },
          ]}
        >
          <Icon
            name={item.icon}
            color={focused ? Colors.white : Colors.darkerGray}
            size={focused ? 20 : 24}
          />
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: Colors.white,
                  paddingHorizontal: 8,
                }}
              >
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function MainScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMe = async () => {
      if (!user.token) {
        token = await SecureStore.getItemAsync("access_token");
        dispatch(fetchMyInfo({ token }));
      }
    };
    fetchMe();
    return () => {};
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 16,
  },
});
