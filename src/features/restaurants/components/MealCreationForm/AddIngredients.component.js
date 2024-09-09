import React, { useState, useContext, useEffect } from "react";
import Styled from "styled-components/native";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { IngredientsSearch } from "./FormComponents/ingredientsSearch.component";
import { AddIngredientProvider } from "../../addIngredient.context";

const FormContainer = Styled.View`
padding: ${(props) => props.theme.space[2]};
backgroundColor: white;
height: 100%;
`;

const styles = StyleSheet.create({
  formfield: {
    marginBottom: 16,
  },
});

const MainTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.h5};
fontWeight: bold;
textAlign: center;
marginBottom: 16;
`;

export const AddIngredients = ({
  values,
  handleChange,
  nextStep,
  prevStep,
  addIngredients,
}) => {
  //const { values, handleChange } = props;
  const [ingredientsList, setIngredientsList] = useState([]);

  const listUpdate = (value) => {
    addIngredients(value);
    console.log(value.ingredients);
    console.log("addIng");
  };

  return (
    <FormContainer>
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          justifyContent: "space-between",
        }}
      >
        <MainTitle>Add ingredients</MainTitle>
        <Text>{values.step}/4</Text>
      </View>
      <View>
        <View style={{ zIndex: "100" }}>
          <AddIngredientProvider>
            <IngredientsSearch
              existingIngredients={values.ingredients}
              listUpdate={listUpdate}
              name="name"
            />
          </AddIngredientProvider>
        </View>
        <View
          style={{
            zIndex: "90",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button icon="arrow-left" mode="contained" onPress={prevStep}>
            Back
          </Button>

          <Button
            disabled={values.ingredients.length === 0 ? true : false}
            icon="arrow-right"
            mode="contained"
            onPress={nextStep}
            contentStyle={{ flexDirection: "row-reverse" }}
          >
            Next
          </Button>
        </View>
      </View>
    </FormContainer>
  );
};
