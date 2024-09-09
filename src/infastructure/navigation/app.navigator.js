import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Foundation } from "@expo/vector-icons";
import { Text, Image } from "react-native";
import { SafeArea } from "../../../src/components/Utils/Safe-area.component";
import { MapScreen } from "../../features/messages/screens/message.screens";
import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screens";
import { AddMeal } from "../../features/restaurants/components/MealCreationForm/AddMeal.component";
import { SettingScreen } from "../../../src/features/settings/screens/settings.screens";
import { HomeScreen } from "../../features/Home/screens/home.screens";
import { MealsNavigator } from "./meals.navigator";
import { ProfileScreens } from "./profileTabs.navigator";
import { BusinessHome } from "../../features/Business/screens/businessHome.screen";
import { theme } from "../theme";
import { KeyboardHeight } from "../../components/spacer/keyboardHeight.component";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { colors } from "../theme/colors";
import { MealCreateScreen } from "../../../src/features/restaurants/screens/meal-create.screen";
// import { useTheme } from "react-native-paper";
// import { theme } from "../theme";
// import { theme } from "../theme";
// import { colors } from "../theme/colors";
// import { useTheme } from "react-native-paper";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Meals: "home",
  Settings: "widget",
  MealCreate: "plus",
  Maps: "foundation",
};

function MealsView() {
  // useEffect(() => {
  //   console.log(colorScheme);
  // }, [colorScheme]);

  return (
    <>
      <SafeArea>
        <RestaurantsScreen />
      </SafeArea>
    </>
  );
}

function SettingsView() {
  // useEffect(() => {
  //   console.log(colorScheme);
  // }, [colorScheme]);

  return (
    <>
      <SafeArea>
        <HomeScreen />
      </SafeArea>
    </>
  );
}

function HomeView() {
  // useEffect(() => {
  //   console.log(colorScheme);
  // }, [colorScheme]);

  return (
    <>
      <SafeArea>
        <HomeScreen />
      </SafeArea>
    </>
  );
}

function CreateMeal() {
  return (
    <>
      <SafeArea>
        <MealCreateScreen />
      </SafeArea>
    </>
  );
}

function MapView() {
  return (
    <>
      <SafeArea>
        <MapScreen />
      </SafeArea>
    </>
  );
}

const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    headerShown: false,
    // tabStyle: { backgroundColor: colors.info },
    // style: { borderTopWidth: 0 },
    // showLabel: false,
    inactiveTintColor: colors.text,
    // tabBarStyle: { backgroundColor: colors.dark },
    tabBarStyle: {
      borderTopWidth: 0,
      backgroundColor: colors.info,
      paddingTop: 8,
      height: 80,
    },
    tabBarIcon: ({ size, color }) => (
      <Foundation name={iconName} color={color} size={28} />
    ),
  };
};

export const AppNavigator = ({ user }) => (
  <Tab.Navigator
    // options={{
    //   backgroundColor: colors.primary,
    //   headerShown: false,
    //   //headerStyle: { backgroundColor: colors.primary },
    // }}
    tabBarOptions={{
      showLabel: false,
      inactiveTintColor: colors.dark,
    }}
    screenOptions={screenOptions}
  >
    <Tab.Screen name="Meals" component={MealsNavigator} />

    <Tab.Screen name="MealCreate" component={CreateMeal} />

    {/* <Tab.Screen name="Maps" component={MapView} /> */}

    {/* <Tab.Screen name="Settings" component={SettingsView} /> */}

    <Tab.Screen
      name="Home"
      component={ProfileScreens}
      options={{
        headerShown: false,
        // title: user,
        tabBarIcon: ({ size, focused, color }) => {
          return (
            <Image
              style={{ width: 32, height: 32, borderRadius: 50 }}
              size={28}
              source={{
                uri: `http://127.0.0.1:8000/storage/${user}`,
              }}
            />
          );
        },
      }}
    />
  </Tab.Navigator>
);
