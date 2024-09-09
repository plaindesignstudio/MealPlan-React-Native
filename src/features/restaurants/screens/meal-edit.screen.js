import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { set } from "react-native-reanimated";
import { Ingredients } from "../components/AboutMealsComponents/ingredients.component";
import { FormContoller } from "../components/MealCreationForm/FormContoller.component";
import { DetailsContextProvider } from "../details.context";
import { DetailsContext } from "../details.context";

export const MealEditScreen = ({ route, navigation }) => {
  const { meal, ingredients } = route.params;
  const [ingredientsList, setIngredientsList] = useState(ingredients);
  const { details, isLoading, error, detailsFunction } =
    useContext(DetailsContext);

  const cookingStepValues = (cookingsteps) => {
    if (cookingsteps) {
      cookingsteps.forEach(function (item) {
        // to print each of the titles
        item.openToggle = false;
        item.key = item.id;

        [item];
      });
    }
  };

  useEffect(() => {
    detailsFunction(meal.id);
    cookingStepValues(details.data.cookingsteps);
    setIngredientsList(ingredients);
    console.log(ingredients);
  }, [ingredients]);

  return (
    <>
      <>
        <FormContoller
          meal={details}
          ingredientData={ingredientsList}
          navigation={navigation}
        />
      </>
    </>
  );
};
