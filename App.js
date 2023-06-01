import React, { useEffect, useReducer, useMemo, createContext } from "react";
import { Dimensions, View, Text, LogBox } from "react-native";
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
  InitialCameraScreen,
  InitialRequestAccessScreen,
  RequestAccessScreen,
} from "./src/screens";
import { Provider as StoreProvider } from "react-redux";
import store from "./src/store";
import NotificationMessage from "./src/components/NotificationMessage";
import * as SecureStore from "expo-secure-store";
import { isAfter } from "date-fns";
import { AuthContext } from "./src/auth";

const Stack = createNativeStackNavigator();

const { width } = Dimensions.get("window");

LogBox.ignoreAllLogs(); //Ignore all log notifications

EStyleSheet.build({ $rem: width / 375 });

const SplashScreen = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        const token_expiration_time = await SecureStore.getItemAsync(
          "token_expiration_time"
        );
        if (isAfter(new Date(), new Date(token_expiration_time))) {
          await SecureStore.deleteItemAsync("access_token");
          await SecureStore.deleteItemAsync("token_expiration_time");
          token = null;
        } else {
          token = await SecureStore.getItemAsync("access_token");
        }
      } catch (e) {
        token = null;
      }
      dispatch({ type: "RESTORE_TOKEN", token });
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        const { token, token_expiration_time } = data;
        if (token) {
          await SecureStore.setItemAsync("access_token", token);
          await SecureStore.setItemAsync(
            "token_expiration_time",
            token_expiration_time
          );
          dispatch({ type: "SIGN_IN", token });
        }
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("token_expiration_time");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        const { token, token_expiration_time } = data;
        if (token) {
          await SecureStore.setItemAsync("access_token", token);
          await SecureStore.setItemAsync(
            "token_expiration_time",
            token_expiration_time
          );
          dispatch({ type: "SIGN_IN", token });
        }
      },
    }),
    []
  );

  if (state.isLoading) return <SplashScreen />;

  return (
    <StoreProvider store={store}>
      <Provider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="MainScreen"
              screenOptions={{
                headerShown: false,
              }}
            >
              {state.userToken == null ? (
                <>
                  <Stack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                    options={{
                      animationTypeForReplace: state.isSignout ? "pop" : "push",
                    }}
                  />
                  <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                </>
              ) : (
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
                    name="RequestAccessScreen"
                    component={RequestAccessScreen}
                  />
                </>
              )}
              <Stack.Screen
                name="InitialRequestAccessScreen"
                component={InitialRequestAccessScreen}
              />
              <Stack.Screen
                name="InitialCameraScreen"
                component={InitialCameraScreen}
              />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <NotificationMessage />
        </AuthContext.Provider>
      </Provider>
    </StoreProvider>
  );
}
