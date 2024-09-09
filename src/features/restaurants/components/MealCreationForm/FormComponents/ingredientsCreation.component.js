import React, { useState, useContext, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Fonts } from "../../../../../infastructure/theme/fonts";
import Styled from "styled-components/native";
import {
  Portal,
  Text,
  IconButton,
  TextInput,
  Dialog,
  Button,
} from "react-native-paper";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../../../../components/services/axiosGetRequest";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useTheme } from "react-native-paper";
import { FontDisplay } from "expo-font";
import { AllergiesContext } from "../../../allergies.context";
// import { NutritionlItemsContext } from "../../../nutrition.context";
import { SelectionBuilder } from "./selectionBuilder.component";
import { NutrientSearch } from "./nutrientSearch.component";
import { NutritionlItemsContextProvider } from "../../../nutrition.context";
import { AddIngredientContext } from "../../../addIngredient.context";
import { UnitItemsContextProvider } from "../../../units.context";
import { theme } from "../../../../../infastructure/theme";
import { Spacer } from "../../../../../components/spacer/spacer.component";
import { KeyboardHeight } from "../../../../../components/spacer/keyboardHeight.component";

const styles = StyleSheet.create({
  quantityButton: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 18,
    paddingRight: 8,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  measurementbutton: {
    marginRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Title = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.title};
fontWeight: ${(props) => props.theme.fontWeights.bold};
textAlign: left;
marginBottom: 8;
`;

const Spacing = Styled.View`
paddingTop: ${(props) => props.theme.space[3]};
`;

const NewItem = Styled.View`
padding: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.info};
borderRadius: 12;
marginBottom: ${(props) => props.theme.space[2]};
`;

const AddButton = Styled(IconButton).attrs({
  // IconButtonContentStyle: {
  //   width: 1,
  //   height: 1,
  // },
  contentContainerStyle: {
    // color:  `${(props) => props.theme.space[3]}`;
  },
})``;

export const IngredientsCreation = ({
  name,
  Navigation,
  addToList,
  searchText,
}) => {
  const allergyList = useContext(AllergiesContext);
  const {
    ingredientItemsAPI,
    isLoading,
    error,
    response,
    addIngredientFunction,
  } = useContext(AddIngredientContext);
  const [ingredientName, setIngredientName] = useState(name);
  const [nutrientSearchResultes, setNutrientSearchResultes] = useState([]);
  const [nutrientList, setNutrientList] = useState();
  const [allergies, setAllergies] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [newIngredient, setNewIngredient] = useState([
    { nutritional_information: null },
  ]);
  const [createdIngredient, setCreatedIngredient] = useState();

  const { colors } = useTheme();
  const hideDialog = () => {
    setVisible(false);
    // setNewIngredient([]);
  };

  const setDialogue = () => {
    setVisible(true);
  };

  const addToAllergies = (selected) => {
    setAllergies(selected);
  };

  const searchResults = (results) => {
    setNutrientSearchResultes(results);
  };

  const updateNutrients = (results) => {
    setNutrientList(results);
  };

  const AddRawCalories = (text) => {
    // const filteredExisting = selectedItems.filter((selectedItems) => {
    let el = newIngredient.map((newIngredient) => {
      // if (newIngredient.id === item.id) {
      if (text === 0 || text == null) {
        // newIngredient.raw_calories_per_100 = name;
      } else {
        newIngredient.raw_calories_per_100 = text;
      }
      //}
      return newIngredient;
    });
    // set the previous list to the new list
    setNewIngredient(el);
  };

  const AddCookedCalories = (text) => {
    // const filteredExisting = selectedItems.filter((selectedItems) => {
    let el = newIngredient.map((newIngredient) => {
      // if (newIngredient.id === item.id) {
      if (text === 0 || text == null) {
        // newIngredient.raw_calories_per_100 = name;
      } else {
        newIngredient.cooked_calories_per_100 = text;
      }
      //}
      return newIngredient;
    });
    // set the previous list to the new list
    setNewIngredient(el);
  };

  const AddIngredientName = (text) => {
    // const filteredExisting = selectedItems.filter((selectedItems) => {
    let el = newIngredient.map((newIngredient) => {
      // if (newIngredient.id === item.id) {
      if (text === 0 || text == null) {
        // newIngredient.raw_calories_per_100 = name;
      } else {
        newIngredient.name = text;
      }
      //}
      return newIngredient;
    });
    // set the previous list to the new list
    setNewIngredient(el);
  };

  const CompileIngredient = () => {
    let el = newIngredient.map((newIngredient) => {
      newIngredient.allergies = allergies;
      newIngredient.nutritional_information = nutrientList;

      return newIngredient;
    });
    // set the previous list to the new list
    setNewIngredient(el);
    addIngredientFunction(newIngredient[0]);
    // addToList(newIngredient[0]);
    //hideDialog();
  };

  useEffect(() => {
    //console.log(allergies);
    //console.log(newIngredient);
  }, [allergies]);

  useEffect(() => {
    //console.log(nutrientList);
  }, [nutrientList]);

  useEffect(() => {
    //console.log(newIngredient);
  }, [newIngredient]);

  useEffect(() => {
    // console.log(error);
  }, [ingredientName]);

  useEffect(() => {
    AddIngredientName(ingredientName);
  }, [ingredientName]);

  useEffect(() => {
    setIngredientName(name);
    // searchText("");
    //console.log(newIngredient);
  }, [name]);

  return (
    <>
      <Portal style={{ width: "100%" }}>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{
            width: "100%",
            height: "100%",
            bottom: "-5%",
            left: "-6%",
            padding: -20,
            margin: -20,
            backgroundColor: colors.primaryContainer,
            borderColor: "white",
          }}
        >
          <Dialog.Title
            style={{
              padding: 0,
              backgroundColor: "white",
              borderColor: "white",
            }}
          >
            {" "}
            <Title>Create ingredient</Title>
          </Dialog.Title>

          <Dialog.ScrollArea
            style={{
              padding: 0,
              backgroundColor: "white",
              borderColor: "white",
            }}
          >
            <ScrollView>
              <TextInput
                style={{ marginBottom: 12 }}
                defaultValue={ingredientName}
                value={ingredientName}
                onChangeText={(text) => setIngredientName(text)}
                //onChangeText={(text) => setMeasurement(text)}
                name="Name"
                mode="outlined"
                label="Name"

                //id={item.id}
                // right={<TextInput.Affix text="grams" />}
              />
              <Spacer position="top" size="medium" />
              <Title>Nutritional information</Title>
              <Text> nutritional information per 100g</Text>
              <Spacing></Spacing>
              <NutritionlItemsContextProvider>
                <UnitItemsContextProvider>
                  <NutrientSearch
                    nutrientSearchList={searchResults}
                    updateNutrients={updateNutrients}
                  />
                </UnitItemsContextProvider>
              </NutritionlItemsContextProvider>
              <View>
                <Spacing></Spacing>
                <Title>Allergies</Title>
                <SelectionBuilder
                  selectionList={allergyList}
                  saveSelection={addToAllergies}
                />
                <Spacing></Spacing>
                <Title>
                  Calories
                  {/* {ingredientID.name} */}
                </Title>
                <TextInput
                  style={{ marginBottom: 12 }}
                  defaultValue={null}
                  value={null}
                  onChangeText={(text) => AddRawCalories(text)}
                  name="Raw calories"
                  mode="outlined"
                  label="Raw calories"

                  //id={item.id}
                  // right={<TextInput.Affix text="grams" />}
                />

                <TextInput
                  style={{ marginBottom: 12 }}
                  defaultValue={null}
                  value={null}
                  onChangeText={(text) => AddCookedCalories(text)}
                  name="Cooked calories"
                  mode="outlined"
                  label="Cooked calories"

                  //id={item.id}
                  // right={<TextInput.Affix text="grams" />}
                />

                {/* <View style={{ flex: 2, flexDirection: "row" }}>
                  <Pressable
                    mode="outlined"
                    onPress={() => {
                      // setDisplayQuatity(false);
                    }}
                  >
                    <View>
                      <AddButton
                        style={{ borderColor: colors.white }}
                        iconColor={colors.white}
                        icon="minus"
                        mode="outlined"
                        size={10}
                        onPress={() => {
                          // setQuantity((current) => current - 1);
                        }}
                      />

                      <IconButton
                        style={{ borderColor: colors.white }}
                        iconColor={colors.white}
                        icon="plus"
                        mode="outlined"
                        size={10}
                        onPress={() => {
                          // setQuantity((current) => current + 1);
                        }}
                      />
                    </View>
                  </Pressable>
                </View> */}
                {/* <View
                  style={{
                    minHeight: "200%",
                    width: "100%",
                    backgroundColor: colors.primary,
                  }}
                ></View> */}
              </View>

              <View
                style={{
                  marginBottom: 8,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 12,
                }}
              >
                <Button
                  mode="outlined"
                  style={{ borderColor: colors.text }}
                  textColor={colors.dark}
                  onPress={() => setVisible(false)}
                >
                  cancel
                </Button>
                <Button
                  mode="contained"
                  style={{ backgroundColor: colors.success }}
                  onPress={() => CompileIngredient()}
                >
                  Create ingredient
                </Button>
              </View>

              {/* <Spacing></Spacing> */}
            </ScrollView>

            <Spacer position="bottom" size="large" />
          </Dialog.ScrollArea>
          <KeyboardHeight />
        </Dialog>
      </Portal>

      <View>
        <Button mode="contained" onPress={() => setDialogue(true)}>
          Create ingredient
        </Button>
      </View>
    </>
  );
};
