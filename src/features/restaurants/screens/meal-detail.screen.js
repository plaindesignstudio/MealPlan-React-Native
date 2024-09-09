import React, { useContext, useState, useEffect, handler } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
  TabBar,
} from "react-native";
import Styled from "styled-components/native";
import { SafeArea } from "../../../components/Utils/Safe-area.component";
import { Text } from "../../../components/Typography/text.component";
//import { MealsContext } from "../meals.context";
//import { MealsIngredientsScreen } from "../screens/meal-ingredients.screen";
import { createIconSetFromFontello } from "react-native-vector-icons";
import { TabView, SceneMap } from "react-native-tab-view";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AboutMeal } from "../components/AboutMealsComponents/about-meal.component";
import { Ingredients } from "../components/AboutMealsComponents/ingredients.component";
import { Cookingsteps } from "../components/AboutMealsComponents/cooking-steps.component";
import { Button } from "react-native-paper";
import { FormContoller } from "../components/MealCreationForm/FormContoller.component";
import { DetailsContext } from "../details.context";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../../components/services/axiosGetRequest";
//import { DetailsContextProvider } from "../details.context";

const MealWrapper = Styled(View).attrs({})`
backgroundColor: ${(props) => props.theme.colors.bg.background}
`;

const MealTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.title};
fontWeight: ${(props) => props.theme.fontWeights.bold};
`;

export const MealDetailScreen = ({ route, navigation }) => {
  //const { error } = useContext(DetailsContext);
  //const { isLoading, error } = useContext(DetailsContext);
  const layout = useWindowDimensions();

  //const [mealSet, setMeal] = useState(meals);
  const { meal } = route.params;

  // const { id } = meal;
  // const [mealData, setMealData] = useState(null);
  const { details, isLoading, error, detailsFunction, reloadFunction } =
    useContext(DetailsContext);

  function refreshMeals(reload) {
    reloadFunction(reload);
  }

  useEffect(() => {
    detailsFunction(meal.id);
  }, []);

  const [ingredientsList, setIngredientsList] = useState([]);

  const ingredientsValues = (ingredientData) => {
    const newArray = [];
    var newList = {};
    var unitList = {};

    if (ingredientData) {
      ingredientData.forEach(function (item) {
        // to print each of the titles

        newList["id"] = item.ingredients.id;
        newList["name"] = item.ingredients.name;
        newList["amount"] = item.amount;
        newList["quantity_display"] = item.quantity_display;
        newList["quantity"] = item.quantity;
        newList["unit_id"] = item.units.id;
        newList["short_name"] = item.units.short_name;
        newList["unit_name"] = item.units.name;
        //item.quantity = "40";
        newArray.push(newList);
        newList = {};
        unitList = {};
        [item];
      });
    }
    setIngredientsList(newArray);
  };

  useEffect(() => {
    if (details !== null) {
      const ingredientsArray = details.data.mealingredients;
      if (ingredientsArray) {
        //console.log("exists");
        ingredientsValues(ingredientsArray);
      } else {
        // console.log("not exists");
      }
    }
  }, [details]);

  const removeMeal = (id) => {
    axiosGetRequest(`/api/meals/${id}`, null, null, "DELETE");
    navigation.navigate("Meals", {
      refresh: true,
    });
  };

  const Detail = () => (
    <AboutMeal
      meal={meal}
      deleteMeal={removeMeal}
      style={{ flex: 1, backgroundColor: "red" }}
    />
  );

  const IngredientPage = () => (
    <Ingredients ingredients={ingredientsList} style={{ flex: 1 }} />
  );

  const Process = () => <Cookingsteps meal={meal} style={{ flex: 1 }} />;

  //Nutritional

  // const renderScene = SceneMap({
  //   details: Detail,
  //   ingredients: Ingredients,
  //   process: Process,
  // });

  const Tab = createMaterialTopTabNavigator();

  // const [index, setIndex] = React.useState(0);
  // const [routes] = React.useState([
  //   { key: "details", title: "Details" },
  //   { key: "IngredientPage", title: "Ingredients" },
  //   { key: "process", title: "Meal steps" },

  return (
    /* <TabView
        initialRouteName="Feed"
        shifting={true}
        labeled={false}
        sceneAnimationEnabled={false}
        activeColor="#000"
        inactiveColor="#95a5a6"
        barStyle={{ backgroundColor: "#ffff" }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ backgroundColor: "black" }}
      /> */
    <SafeArea>
      <Tab.Navigator
        screenOptions={{
          inactiveTintColor: "red",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarContentContainerStyle: {
            backgroundColor: `${(props) => props.theme.backgroundColor}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarIndicatorStyle: {
            height: 2,
            backgroundColor: "#000",
            borderRadius: 0,
            tabBarActiveTintColor: "red",
          },
        }}
      >
        <Tab.Screen
          name="Details"
          meal={meal}
          ingredients={ingredientsList}
          component={Detail}
        />
        <Tab.Screen name="Ingredients" meal={meal} component={IngredientPage} />
        <Tab.Screen name="How to" component={Process} />
      </Tab.Navigator>

      <Button
        mode="contained"
        style={styles.button}
        color="white"
        //theme={{ colors: { primary: 'green' } }}
        //backgroundColor={`${(props) => props.theme.primaryContainer}`}
        onPress={() =>
          navigation.navigate("Edit Meal", {
            meal: meal,
            ingredients: ingredientsList,
          })
        }
      >
        Edit Recipe
      </Button>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  button: {
    position: "absolute",
    borderRadius: 30,
    //backgroundColor: `${(props) => props.theme.primaryContainer}`,
    //color: "white",
    alignSelf: "flex-start",
    margin: 16,
    bottom: 0,
    right: 0,
  },
});

/*
export const MealDetailScreen = ({ route }) => {
  const { meal } = route.params;

  return (
    <>
      <SafeArea>
        <DetailsContextProvider>
          <MealWrapper>
            <MealTitle>{meal.name}</MealTitle>
          </MealWrapper>
          <MealsIngredientsScreen mealId={meal.id} />
        </DetailsContextProvider>
      </SafeArea>
    </>
  );
};
*/
