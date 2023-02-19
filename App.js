import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "./src/theme/theme";
import { Provider } from "react-native-paper";
import { SignInScreen, SignUpScreen, ResetPasswordScreen } from "./src/screens";
import MainScreen from "./src/screens/MainScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
