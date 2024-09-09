import React, { useState, useContext, useEffect, Component } from "react";
import Styled from "styled-components/native";
import { View, StyleSheet, Image, Pressable, FlatList } from "react-native";
import { Text } from "../../../../../components/Typography/text.component";
import { PieChart } from "./piechart.component";
import PieChartSVG from "../../../../../../assets/PieChartSVG";
import { Spacer } from "../../../../../components/spacer/spacer.component";
import { PieChartCompile } from "../../../../../components/piechartCompiler";

export const NutritionalData = ({ ingredients, calories }) => {
  const [nutritionArray, setNutritionArray] = useState(null);
  const [ingredientsAmount, setIngredientsAmount] = useState(null);
  const [mealCalories, setMealCalories] = useState(calories);

  function getIngredientQuantity(ingredient) {
    const ingredient_amount = parseFloat(ingredient.amount);

    const ingredients_grams_convert = parseFloat(
      ingredient.units.grams_convert
    );
    const ingredients_quantity = ingredient.quantity;
    const converted_ingredient = ingredient_amount * ingredients_grams_convert;

    if (ingredient.quantity_display == "1") {
      return parseFloat(converted_ingredient * ingredients_quantity);
    } else {
      return parseFloat(converted_ingredient);
    }
  }

  function addPercentage(data, total) {
    var nutPercentage = 0;
    var nutAmount = 0;

    const ingrediantDataArray = data;

    for (let s = 0; s < ingrediantDataArray.length; s++) {
      const per_100_gram = ingrediantDataArray[s].per_100_gram;
      const percentage_init = ingrediantDataArray[s].per_100_gram / total;
      const total_percentage = percentage_init * 100;
      ingrediantDataArray[s].percentage = total_percentage;
      nutPercentage = nutPercentage + total_percentage;
      nutAmount = nutAmount + per_100_gram;
    }
    if (nutAmount < total) {
      const other = {};
      other["name"] = "Other";
      // nutrition["percentage"] = Math.floor(convertedValue * 100) / 100;
      //nutrition["percentage"] = parseFloat(percentage);
      other["short_name"] = "g";
      other["per_100_gram"] = total - nutAmount;
      other["display_amount"] = total - nutAmount;
      other["percentage"] = 100 - nutPercentage;
      other["color"] = "grey";
      data.push(other);
    }
    return ingrediantDataArray;
  }

  function nutinfo(ingredients_array) {
    var nutritionSet = [];
    var ingredientsCount = 0;

    if (ingredients_array) {
      for (let i = 0; i < ingredients_array.length; i++) {
        const ingredient = ingredients_array[i];
        const nutrition_info = ingredient.ingredients.nutinfosingredients;
        const ingredient_calculation = getIngredientQuantity(ingredient);
        ingredientsCount = ingredientsCount + ingredient_calculation;
        if (typeof nutrition_info !== "undefined") {
          for (let k = 0; k < nutrition_info.length; k++) {
            const nutrition = {};
            var short_name = nutrition_info[k].units.short_name;
            var per_100_gram = parseFloat(nutrition_info[k].per_100_gram);
            var nutrition_name = nutrition_info[k].nutinfos.name;
            var grams_convert = parseFloat(
              nutrition_info[k].units.grams_convert
            );

            const converted_amount = (per_100_gram * grams_convert) / 100;
            const total_nutrtion_amount =
              converted_amount * ingredient_calculation;
            //(per_100_gram / total_data) * 100;
            nutrition["key"] = k;
            nutrition["name"] = nutrition_name;
            // nutrition["percentage"] = Math.floor(convertedValue * 100) / 100;
            //nutrition["percentage"] = parseFloat(percentage);
            nutrition["short_name"] = short_name;
            nutrition["per_100_gram"] = total_nutrtion_amount;
            nutrition["display_amount"] = total_nutrtion_amount;
            if (nutrition_name == "Protein") {
              nutrition["color"] = "#F7A952";
            } else if (nutrition_name == "Potassium") {
              nutrition["color"] = "#1385AF";
            } else {
              nutrition["color"] = "#5CC69B";
            }
            let matched = nutritionSet.find(
              ({ name }) => name === nutrition_name
            );

            if (matched) {
              // matched.percentage = matched.percentage + percentage;
              matched.per_100_gram = total_nutrtion_amount;
            } else {
              nutritionSet.push(nutrition);
            }
          }
        }
      }

      const withPercentage = addPercentage(nutritionSet, ingredientsCount);

      setIngredientsAmount(ingredientsCount);
      setNutritionArray(withPercentage);
    }
  }

  useEffect(() => {
    //findAllergies(details.data);
    nutinfo(ingredients);
  }, [ingredients]);

  return (
    <>
      <Text variant="h3">Nutritional information</Text>
      <Spacer size="large" position="top" />
      {/* <PieChartSVG data={nutritionArray} total={ingredientsAmount} /> */}
      <PieChartCompile
        data={nutritionArray}
        total={ingredientsAmount}
        calories={mealCalories}
      />

      <PieChart data={nutritionArray} total={ingredientsAmount} />

      {/* <FlatList
        horizontal={true}
        data={nutritionArray}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item) => item.id}
      /> */}
    </>
  );
};
