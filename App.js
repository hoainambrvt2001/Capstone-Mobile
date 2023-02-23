import React from "react";
import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "./src/theme/theme";
import { Provider } from "react-native-paper";
import {
  SignInScreen,
  SignUpScreen,
  ResetPasswordScreen,
  MainScreen,
  EditProfileScreen,
  UpdateFaceScreen,
} from "./src/screens";

const Stack = createNativeStackNavigator();

const { width } = Dimensions.get("window");

EStyleSheet.build({ $rem: width / 375 });

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          <Stack.Screen name="UpdateFaceScreen" component={UpdateFaceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
