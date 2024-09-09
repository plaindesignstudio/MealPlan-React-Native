import React, { useState, useContext, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Styled from "styled-components/native";
import {
  Searchbar,
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
} from "react-native-paper";
import { MealsContext } from "../meals.context";
// import { SearchFieldsContext } from "../search.context";
// import { useEffect } from "react/cjs/react.development";
// import { AllergyFilter } from "./allergies.component";

const SearchContainer = Styled.View`
padding: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.primaryContainer};
`;

export const Search = ({ navigation }) => {
  const { searchFunction, filters } = useContext(MealsContext);
  const [searchText, setSearchText] = useState(filters["search"]);
  //const {} = useContext(SearchFieldsContext);

  const addSearchText = (item) => {
    setSearchText(item);
  };

  useEffect(() => {
    searchFunction({ ...filters, search: searchText });
  }, [searchText]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search meal"
        value={filters["search"]}
        onSubmitEditing={(text) => {
          addSearchText(text);
        }}
        onChangeText={(text) => {
          //addSearchText(text);
          addSearchText(text);
          //searchFunction(filterSearch);
        }}
      />
    </SearchContainer>
  );
};
