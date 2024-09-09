import React, { useContext, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { View, Text } from "react-native";
import {
  AuthenticationContext,
  AuthenticationContextProvider,
} from "../../service/authentication/authentication.context";
import { AppNavigator, DefaultTheme } from "./app.navigator";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { AccountNavigator } from "./account.navigator";

// import { Acc}

export const Navigation = () => {
  const { colors } = useTheme();
  const { isAuthenticated, onLogin, user } = useContext(AuthenticationContext);

  useEffect(() => {
    onLogin("jjs1990creative@gmail", "WorldsWordles.1");
  }, []);
  return (
    <NavigationContainer theme={useTheme()}>
      {isAuthenticated ? (
        <AppNavigator user={user.image} />
      ) : (
        <AccountNavigator />
      )}
    </NavigationContainer>
  );
};
