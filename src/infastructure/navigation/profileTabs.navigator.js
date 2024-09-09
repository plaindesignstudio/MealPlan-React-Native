import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CreatedMeals } from "../../features/Home/screens/createdmeals.screens";
import { MealDetailScreen } from "../../../src/features/restaurants/screens/meal-detail.screen";
import { BusinessCreation } from "../../features/Home/screens/businessCreation.screens";
import { HomeScreen } from "../../features/Home/screens/home.screens";
import { BusinessPortal } from "../../features/Home/screens/businessPortal.screen";
import { BusinessPortalScreens } from "./business.navigator";
import { Button, IconButton } from "react-native-paper";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Spacer } from "../../components/spacer/spacer.component";
import { colors } from "../theme/colors";

const ProfileTabsNavigator = createMaterialTopTabNavigator();
const ProfileNavigator = createStackNavigator();

function FavoriteMeals() {
  return (
    <>
      <CreatedMeals />
    </>
  );
}

function BusinessForm() {
  return (
    <>
      <BusinessCreation />
    </>
  );
}

function ProfileHome() {
  return (
    <>
      <Spacer position="top" size="large" />
      <Spacer position="top" size="large" />
      <Spacer position="top" size="large" />
      <HomeScreen />
    </>
  );
}

export const ProfileTabs = ({ user }) => (
  <ProfileTabsNavigator.Navigator>
    <ProfileTabsNavigator.Screen name="Meal Plans" component={FavoriteMeals} />
    <ProfileTabsNavigator.Screen
      name="Business Portal"
      component={BusinessPortal}
    />
  </ProfileTabsNavigator.Navigator>
);
export const ProfileScreens = ({ user }) => (
  <ProfileNavigator.Navigator
    screenOptions={{
      tabBarStyle: {
        borderWidth: 0,
      },
    }}
    options={{
      backgroundColor: colors.primary,
      headerShown: false,
      headerStyle: { backgroundColor: colors.primary },
    }}
  >
    <ProfileNavigator.Screen
      name="Home"
      component={ProfileHome}
      options={{ headerShown: false }}
    ></ProfileNavigator.Screen>
    <ProfileNavigator.Screen
      name="BusinessFromCreation"
      component={BusinessForm}
      options={{
        title: "Create Business",
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    ></ProfileNavigator.Screen>
    <ProfileNavigator.Screen
      name="BusinessHome"
      component={BusinessPortalScreens}
      // options={{
      //   title: false,
      //   headerStyle: {
      //     backgroundColor: colors.background,
      //     elevation: 0,
      //     shadowOpacity: 0,
      //     borderBottomWidth: 0,
      //   },
      // }}
      // options={({ navigation, route }) => ({
      //   headerStyle: {
      //     backgroundColor: colors.background,
      //     elevation: 0,
      //     shadowOpacity: 0,
      //     borderBottomWidth: 0,
      //   },
      //   //headerRight: () => null,
      //   // headerLeft: null,
      //   // title: null,
      //   // Add a placeholder button without the `onPress` to avoid flicker
      //   title: "Bussiness Overview",
      //   headerLeft: () => (
      //     <IconButton
      //       icon="arrow-left"
      //       size={30}
      //       onPress={() => navigation.goBack()}
      //     ></IconButton>
      //   ),
      // })}
      options={{ headerShown: false }}
    ></ProfileNavigator.Screen>
  </ProfileNavigator.Navigator>
);
