import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CreatedMeals } from "../../features/Home/screens/createdmeals.screens";
import { MealDetailScreen } from "../../features/restaurants/screens/meal-detail.screen";
import { BusinessCreation } from "../../features/Home/screens/businessCreation.screens";
import { HomeScreen } from "../../features/Home/screens/home.screens";
import { BusinessHome } from "../../features/Business/screens/businessHome.screen";
import { MealPlanHome } from "../../features/Mealplans/screens/mealplanHome.screen";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Spacer } from "../../components/spacer/spacer.component";
import { colors } from "../theme/colors";
import { IconButton } from "react-native-paper";

const BusinessTabsNavigator = createMaterialTopTabNavigator();
const BusinessStackNavigator = createStackNavigator();

function Home() {
  return (
    <>
      <BusinessHome />
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

// export const BusinessTabs = ({ user }) => (
//   <BusinessTabsNavigator.Navigator>
//     <BusinessTabsNavigator.Screen
//       name="BusinessHome"
//       component={BusinessHome}
//     />
//     <BusinessTabsNavigator.Screen name="Business" component={BusinessHome} />
//   </BusinessTabsNavigator.Navigator>
// );
export const BusinessPortalScreens = ({ user }) => (
  <BusinessStackNavigator.Navigator
    screenOptions={{
      tabBarStyle: {
        borderWidth: 0,
      },
    }}
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
      title: "Bussiness Overview",
      headerLeft: () => (
        <IconButton
          icon="arrow-left"
          size={30}
          onPress={() => navigation.goBack()}
        ></IconButton>
      ),
    })}
  >
    <BusinessStackNavigator.Screen
      name="BusinessHome"
      component={Home}
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
        title: "Bussiness Overview",
        headerLeft: () => (
          <IconButton
            icon="arrow-left"
            size={30}
            onPress={() => navigation.goBack()}
          ></IconButton>
        ),
      })}
    ></BusinessStackNavigator.Screen>
    <BusinessStackNavigator.Screen
      name="MealPlanHome"
      component={MealPlanHome}
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
        title: "Meal Plan",
        headerLeft: () => (
          <IconButton
            icon="arrow-left"
            size={30}
            onPress={() => navigation.goBack()}
          ></IconButton>
        ),
      })}
    ></BusinessStackNavigator.Screen>

    <BusinessStackNavigator.Screen
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
    ></BusinessStackNavigator.Screen>
  </BusinessStackNavigator.Navigator>
);
