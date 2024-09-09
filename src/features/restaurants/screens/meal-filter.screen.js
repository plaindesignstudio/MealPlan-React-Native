import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Styled from "styled-components/native";
import { SafeArea } from "../../../components/Utils/Safe-area.component";
import { Text } from "../../../components/Typography/text.component";
//import { DetailsContextProvider, DetailsContext } from "../details.context";
import { MealsIngredientsScreen } from "./meal-ingredients.screen";
import { createIconSetFromFontello } from "react-native-vector-icons";
import { AllergyFilter } from "../components/MealSearch/allergies.component";
import { SearchFieldsContextProvider } from "../search.context";
import { Search } from "../components/search.component";
import { MealsContext } from "../meals.context";
import { Button } from "react-native-paper";
import {
  Spacer,
  SectionWrapper,
} from "../../../components/spacer/spacer.component";

export const MealFilterScreen = ({ navigation }) => {
  const { searchFunction, filters } = useContext(MealsContext);

  const [filterSet, setFilterGroup] = useState(filters);

  const allergy_selection = (data) => {
    //allergy_list;
    //setFilterGroup(filterSet, data);
    setFilterGroup({ ...filterSet, allergies: data });
    searchFunction(filterSet);
  };

  const search_text = (data) => {
    //console.log(allergy_list);
    setFilterGroup({ ...filterSet, search: data });
    searchFunction(filterSet);
  };
  // const { searchFunction, filters } = useContext(MealsContext);
  //const {} = useContext(SearchFieldsContext);

  //console.log(filters);
  const styles = StyleSheet.create({
    center: {
      minHeight: "100%",
      backgroundColor: "white",
      flexDirection: "row",
    },
    wrapper: {
      width: "100%",
    },
  });

  return (
    <>
      <SafeArea>
        <SectionWrapper style={styles.wrapper}>
          <View style={styles.center}>
            <View style={styles.wrapper}>
              <SearchFieldsContextProvider>
                <Search search_text={search_text} />
                <AllergyFilter allergySelection={allergy_selection} />
              </SearchFieldsContextProvider>
              <Spacer size="large" position="top" />
              <Button
                mode="contained"
                onPress={() => navigation.navigate("Meals")}
              >
                View results
              </Button>
            </View>
          </View>
        </SectionWrapper>
      </SafeArea>
    </>
  );
};
