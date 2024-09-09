import React from "react";
import {} from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { RestaurantsScreen } from "../../../src/features/restaurants/screens/restaurants.screens";
import { MealDetailScreen } from "../../../src/features/restaurants/screens/meal-detail.screen";
import { MealFilterScreen } from "../../../src/features/restaurants/screens/meal-filter.screen";
import { MealCreateScreen } from "../../../src/features/restaurants/screens/meal-create.screen";
import { MealEditScreen } from "../../../src/features/restaurants/screens/meal-edit.screen";
import { useTheme } from "react-native-paper";
import { Button, IconButton } from "react-native-paper";
import { Text } from "../../components/Typography/text.component";
import { colors } from "../theme/colors";
// import { DetailsProvider } from "../../features/restaurants/meals.context";
const MealsStack = createStackNavigator();

export const MealsNavigator = () => {
  // const { colors } = useTheme();
  return (
    <MealsStack.Navigator
      // screenOptions={{
      //   headerShown: true,
      // }}
      //screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
      mode="modal"
      screenOptions={({ route, navigation }) => ({
        gestureEnabled: true,
        cardOverlayEnabled: false,
        headerShown: true,
        headerStatusBarHeight:
          navigation.getState().routes.findIndex((r) => r.key === route.key) > 0
            ? 0
            : undefined,
      })}
    >
      <MealsStack.Screen
        name="Meals"
        component={RestaurantsScreen}
        options={{ headerShown: false }}
      ></MealsStack.Screen>

      <MealsStack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{ title: null }}
        options={({ navigation, route }) => ({
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          //headerRight: () => null,
          // headerLeft: null,
          // title: null,
          // Add a placeholder button without the `onPress` to avoid flicker
          title: null,
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              size={30}
              onPress={() => navigation.goBack()}
            ></IconButton>
          ),
        })}
      ></MealsStack.Screen>

      <MealsStack.Screen
        name="MealFilter"
        component={MealFilterScreen}
        options={({ navigation, route }) => ({
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          //headerRight: () => null,
          // headerLeft: null,
          // title: null,
          // Add a placeholder button without the `onPress` to avoid flicker
          title: "Search",
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              size={30}
              onPress={() => navigation.goBack()}
            ></IconButton>
          ),
        })}
      ></MealsStack.Screen>

      <MealsStack.Screen
        name="MealCreate"
        component={MealCreateScreen}
        options={({ navigation, route }) => ({
          headerStyle: {
            backgroundColor: colors.light,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          // headerRight: () => null,
          title: null,
          // Add a placeholder button without the `onPress` to avoid flicker
          headerLeft: null,
          headerRight: () => (
            <IconButton
              icon="close"
              size={30}
              onPress={() => navigation.goBack()}
            ></IconButton>
          ),
        })}
      ></MealsStack.Screen>

      <MealsStack.Screen
        name="Edit Meal"
        component={MealEditScreen}
        // options={{ title: "Edit Meal" }}
        options={({ navigation, route }) => ({
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          // headerRight: () => null,
          // headerLeft: null,
          // title: null,
          // Add a placeholder button without the `onPress` to avoid flicker

          headerRight: () => (
            <IconButton
              icon="close"
              size={30}
              onPress={() => navigation.goBack()}
            ></IconButton>
          ),
        })}
      ></MealsStack.Screen>
    </MealsStack.Navigator>
  );
};
