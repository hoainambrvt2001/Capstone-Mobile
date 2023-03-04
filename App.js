import React, { useState, useEffect } from "react";
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
  RequestAdminScreen,
} from "./src/screens";
import auth from "@react-native-firebase/auth";
import {
  // useSelector,
  // useDispatch,
  Provider as StoreProvider,
} from "react-redux";
import store from "./src/store";

const Stack = createNativeStackNavigator();

const { width } = Dimensions.get("window");

EStyleSheet.build({ $rem: width / 375 });

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [currentUser, setCurrentUser] = useState();
  const [pending, setPending] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setCurrentUser(user);
    if (pending) setPending(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (pending) return null;

  return (
    <StoreProvider store={store}>
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MainScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            {currentUser ? (
              <>
                <Stack.Screen name="MainScreen" component={MainScreen} />
                <Stack.Screen
                  name="EditProfileScreen"
                  component={EditProfileScreen}
                />
                <Stack.Screen
                  name="UpdateFaceScreen"
                  component={UpdateFaceScreen}
                />
                <Stack.Screen
                  name="RequestAdminScreen"
                  component={RequestAdminScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              </>
            )}
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StoreProvider>
  );
}
