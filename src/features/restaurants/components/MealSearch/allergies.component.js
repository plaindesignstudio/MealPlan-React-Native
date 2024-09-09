import React, { useState, useContext, useEffect } from "react";
import Styled from "styled-components/native";
import { Text } from "../../../../components/Typography/text.component";
import ApiManager from "../../../../components/services/axiosManager";
import { Platform, FlatList } from "react-native";
import { Button } from "react-native-paper";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../../../components/services/axiosGetRequest";
import { MealsContext } from "../../../restaurants/meals.context";

const AlergiesContainer = Styled.View`
padding: ${(props) => props.theme.space[2]};
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

export const AllergyFilter = (props) => {
  const [allergyData, setAllergyData] = useState([]);
  const { searchFunction, filters } = useContext(MealsContext);
  const [filterSet, setFilterGroup] = useState(filters["allergies"]);
  const [allergySelection, setAllergySelection] = useState(filterSet);
  //const {} = useContext(SearchFieldsContext);

  // const [filterSearch, setFilters] = useState({
  //   allergies: {},
  // });
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllergies = () => {
    setLoading(true);
    setTimeout(() => {
      axiosGetRequest("/api/allergies", null, null, "GET")
        .then(resultsTransform)
        .then((results) => {
          setLoading(false);
          setAllergyData(results);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }, 0);
  };

  const addToArrayFunction = (allergy) => {
    // 👇️ filter with 2 conditions
    setAllergySelection(() => [...allergySelection, allergy]);
    //console.log(allergySelection);
    //item.persist();
    const included = allergySelection.includes(allergy);
    const filteredExisting = allergySelection.filter((allergySelection) => {
      return allergySelection !== allergy;
    });

    if (included === true) {
      const removedItem = filteredExisting;
      setAllergySelection(removedItem);
    } else {
      setAllergySelection(() => [...allergySelection, allergy]);
    }
    //props.allergySelection(allergySelection);
  };

  useEffect(() => {
    fetchAllergies();
    searchFunction({ ...filters, allergies: allergySelection });
    //setAllergySelection(() => [...allergySelection, filters]);
  }, [allergySelection]);

  return (
    <AlergiesContainer>
      <Title>Allergy Selection</Title>

      <AllergyList
        data={allergyData}
        renderItem={({ item }) => {
          return (
            <Button
              style={{ alignSelf: "flex-start", margin: 5 }}
              key={item.name}
              mode={
                allergySelection.includes(item.name) ? "contained" : "outlined"
              }
              onPress={() => addToArrayFunction(item.name)}
            >
              {item.name}
            </Button>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </AlergiesContainer>
  );
};
