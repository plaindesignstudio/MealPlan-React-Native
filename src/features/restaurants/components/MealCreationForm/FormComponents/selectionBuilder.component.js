import React, { useState, useContext, useEffect } from "react";
import Styled from "styled-components/native";
import { Text } from "../../../../../components/Typography/text.component";
import ApiManager from "../../../../../components/services/axiosManager";
import { Platform, FlatList } from "react-native";
import { Button } from "react-native-paper";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../../../../components/services/axiosGetRequest";
import { useTheme } from "react-native-paper";
// import { AllergiesContext } from "../../../allergies.context";

const AlergiesContainer = Styled.View`
padding: ${(props) => props.theme.space[0]};
backgroundColor: ${(props) => props.theme.primaryContainer};`;

const AllergyList = Styled(FlatList).attrs({
  contentContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-start",
  },
})``;

const Title = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.title};
fontWeight: ${(props) => props.theme.fontWeights.bold};
paddingBottom: ${(props) => props.theme.space[2]};
paddingLeft: ${(props) => props.theme.space[2]};
paddingRight: ${(props) => props.theme.space[2]};
paddingTop: ${(props) => props.theme.space[2]};
`;

export const SelectionBuilder = ({
  selectionList,
  selectedItems = [],
  saveSelection,
}) => {
  const { isLoading, error, allergies } = selectionList;
  const [filterSet, setFilterGroup] = useState(selectedItems);
  const [allergySelection, setAllergySelection] = useState(selectedItems);
  // const [allergySelection, setAllergySelection] = useState();
  const { colors } = useTheme();

  const addToArrayFunction = (allergy) => {
    console.log(allergy);
    // 👇️ filter with 2 conditions
    setAllergySelection(() => [...allergySelection, allergy]);
    //console.log(allergySelection);
    //item.persist();
    const included = allergySelection.includes(allergy);
    const filteredExisting = allergySelection.filter((allergySelection) => {
      return allergySelection.name !== allergy.name;
    });

    if (included === true) {
      const removedItem = filteredExisting;
      setAllergySelection(removedItem);
    } else {
      setAllergySelection(() => [...allergySelection, allergy]);
    }

    //allergySelection(allergySelection);
  };

  useEffect(() => {}, [selectionList]);

  useEffect(() => {
    saveSelection(allergySelection);
  }, [allergySelection]);

  useEffect(() => {}, [selectionList]);

  return (
    <AlergiesContainer>
      <AllergyList
        data={allergies}
        renderItem={({ item }) => {
          return (
            <Button
              style={{ alignSelf: "flex-start", marginRight: 5 }}
              key={item.name}
              textColor={
                allergySelection.includes(item) ? colors.white : colors.text
              }
              icon={allergySelection.includes(item) ? "check" : ""}
              mode={allergySelection.includes(item) ? "contained" : "outlined"}
              onPress={() => addToArrayFunction(item)}
            >
              {item.name}
            </Button>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      {isLoading && <Text>Is Loading</Text>}
    </AlergiesContainer>
  );
};
