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
  TextInput,
  IconButton,
} from "react-native-paper";
import { View, FlatList, StyleSheet } from "react-native";
import { AddIngredientProvider } from "../../../restaurants/addIngredient.context";
import { useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { NutrientList } from "./nutrientList.component";
// import { SearchFieldsContext } from "../search.context";
// import { useEffect } from "react/cjs/react.development";
// import { AllergyFilter } from "./allergies.component";
import { NutritionlItemsContext } from "../../../restaurants/nutrition.context";
import { AllergiesSearchContext } from "../../../restaurants/allergiesSearch.context";
const SearchContainer = Styled.View`
padding: ${(props) => props.theme.space[0]};
backgroundColor: ${(props) => props.theme.primaryContainer};
zIndex: 100
`;

const styles = StyleSheet.create({
  activeSearch: {
    borderBottomLeftRadius: "0em",
    borderBottomRightRadius: "0em",
  },
});

const SearchBar = Styled(Searchbar).attrs({
  color: "white",
})`backgroundColor: ${(props) => props.theme.colors.bg.darkInfo};
color: white,
marginBottom: ${(props) => props.theme.space[0]};
padding: ${(props) => props.theme.space[0]}`;

const SearchListWrapper = Styled(View).attrs({
  position: "relative",
  flex: 1,
  zIndex: "100",
  backgroundColor: `${(props) => props.theme.colors.bg.darkInfo}`,
})`marginBottom: ${(props) => props.theme.space[12]}; 
backgroundColor: ${(props) => props.theme.colors.bg.darkInfo}`;

const SearchListContainer = Styled(View).attrs({
  position: "absolute",
  width: "100%",
  zIndex: 100,
  borderBottomLeftRadius: "25em",
  borderBottomRightRadius: "25em",
  backgroundColor: `${(props) => props.theme.colors.bg.darkInfo}`,
})`backgroundColor: ${(props) => props.theme.colors.bg.darkInfo}`;

const IngredientsList = Styled(FlatList).attrs({
  width: "100%",
  borderBottomLeftRadius: "0em",
  borderBottomRightRadius: "0em",
  backgroundColor: `${(props) => props.theme.colors.bg.darkInfo}`,
  contentContainerStyle: {
    padding: 0,
    width: "100%",
    backgroundColor: `${(props) => props.theme.colors.bg.darkInfo}`,
  },
})``;

const Title = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.title};
fontWeight: ${(props) => props.theme.fontWeights.bold};
textAlign: center;
marginBottom: 12;
`;

const Body = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.body};
fontWeight: ${(props) => props.theme.fontWeights.regular};
lineHeight: 24;
textAlign: center;
marginBottom: 12;
`;

const SearchList = Styled(FlatList).attrs({
  width: "100%",
  contentContainerStyle: {
    width: "100%",
  },
})``;

const NewItem = Styled.View`
padding: ${(props) => props.theme.space[0]};
borderRadius: 8;
borderWidth: 0.8;
borderColor: ${(props) => props.theme.colors.bg.dark};
marginBottom: ${(props) => props.theme.space[2]};
`;

const Spacer = Styled.View`
marginBottom: ${(props) => props.theme.space[2]};
`;

const MainTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.h5};
fontWeight: bold;
textAlign: center;
marginBottom: 16;
`;

const AddButton = Styled(IconButton).attrs({
  padding: 0,
  IconButtonContentStyle: {
    width: 1,
    height: 1,
  },
  contentContainerStyle: {
    // padding: 12,
  },
})``;

const ListItem = Styled.View`
padding: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.darkInfo};
overFlow: hidden;
`;

// const CreateItem = Styled.View`
// padding: ${(props) => props.theme.space[3]};
// backgroundColor: ${(props) => props.theme.colors.bg.primary};
// borderBottomLeftRadius: "25em !important",
// borderBottomRightRadius: "25em",
// `;

const CreateItem = Styled(View).attrs({
  borderBottomLeftRadius: "25em !important",
  borderBottomRightRadius: "25em",
  flexDirection: "row",
  flex: 100,
  alignItems: "center",
  flexDirection: "column",
})`padding: ${(props) => props.theme.space[3]};  
backgroundColor: ${(props) => props.theme.colors.darkTwo};
color: ${(props) => props.theme.colors.bg.light}`;

const NoIgredients = Styled.View`
paddingBottom: ${(props) => props.theme.space[0]};
paddingTop: ${(props) => props.theme.space[4]};
textAlign: center;
`;

export const Allergysearch = ({ nutrientSearchList, updateNutrients }) => {
  // const { nutritionItems, isLoading, error, filters, searchFunction } =
  //   useContext(NutritionlItemsContext);

  const { allergies, isLoading, error, filters, searchFunction } = useContext(
    AllergiesSearchContext
  );
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchText, setSearchText] = useState(filters["search"]);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const { colors } = useTheme();
  //const {} = useContext(SearchFieldsContext);

  const PleaseSelect = (
    <NoIgredients style={{ color: `${colors.light}` }}>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 4,
          color: `${colors.light}`,
        }}
      >
        No Allergies{" "}
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 4,
          color: `${colors.light}`,
        }}
      >
        Use the search above to add your Allergies items
      </Text>
    </NoIgredients>
  );

  const addSearchText = (item) => {
    setSearchText(item);
  };

  const checkExists = (item) => {
    const check = selectedItems.some(
      (selectedItems) => selectedItems.id === item
    ); // true

    if (check === true) {
      return true;
    } else {
      return false;
    }
  };

  const setText = (item, text, label) => {
    // const filteredExisting = selectedItems.filter((selectedItems) => {
    //console.log(text);
    let el = selectedItems.map((selectedItem) => {
      if (selectedItem.id === item.id) {
        if (text === 0 || text == null) {
          selectedItem[label] = null;
        } else {
          selectedItem[label] = text;
        }
      }
      return selectedItem;
    });
    // set the previous list to the new list
    setSelectedItems(el);
    //console.log(el);
  };

  const newAllergy = (data) => {
    const newArray = [];
    var newList = {};
    setSearchActive(false);
    if (data) {
      // to print each of the titles
      newList["id"] = data;
      newList["name"] = data;
      //item.quantity = "40";
      //newArray.push(newList);

      setSelectedItems(() => [...selectedItems, newList]);
    }
  };

  const addToArrayFunction = (item) => {
    setSearchText(null);
    const included = selectedItems.some(
      (selectedItems) => selectedItems.name === item.name
    ); // true
    const filteredExisting = selectedItems.filter((selectedItems) => {
      return selectedItems !== item;
    });
    if (included === true) {
      const removedItem = filteredExisting;
      setSelectedItems(removedItem);
    } else {
      const newArray = { ...item };
      setSelectedItems(() => [...selectedItems, newArray]);
    }
    //props.allergySelection(allergySelection);
  };

  useEffect(() => {
    updateNutrients(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    //searchFunction({ ...filters, search: searchText });
    //console.log(nutritionItems);
    //nutrientSearchList(nutritionItems);

    if (searchText !== "" && searchText !== null) {
      setSearchActive(true);
      searchFunction({ ...filters, search: searchText });
      setSearchResults(allergies);
    } else {
      setSearchActive(false);
    }
  }, [searchText]);

  useEffect(() => {}, [searchText]);

  return (
    <SearchContainer>
      <SearchBar
        style={
          searchActive === true
            ? [styles.activeSearch, styles.searchBar]
            : [styles.searchBar]
        }
        placeholder="Add your allergies"
        // value={filters["search"]}
        placeholderTextColor="white"
        iconColor="white"
        onSubmitEditing={(text) => {
          addSearchText(text);
        }}
        onFocus={onFocus}
        onChangeText={(text) => {
          //addSearchText(text);
          addSearchText(text);
          //searchFunction(filterSearch);
        }}
      />

      {searchActive && (
        <SearchListWrapper
          style={{
            borderBottomLeftRadius: "25em",
            borderBottomRightRadius: "25em",
          }}
        >
          <SearchListContainer>
            <SearchList
              data={allergies}
              renderItem={({ item }) => {
                return (
                  <ListItem>
                    <View
                      style={{
                        flex: 2,
                        paddingHorizontal: 12,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          display: "flex",
                          alignSelf: "center",
                          color: colors.light,
                        }}
                        key={item.name}
                      >
                        {item.name}
                      </Text>
                      {<Text>{checkExists(item.name)}</Text>}
                      {
                        <AddButton
                          style={
                            checkExists(item.id)
                              ? { backgroundColor: colors.primary }
                              : { borderColor: colors.light }
                          }
                          iconColor={
                            checkExists(item.id) ? colors.light : colors.light
                          }
                          icon={checkExists(item.id) ? "check" : "plus"}
                          mode={checkExists(item.id) ? "contained" : "outlined"}
                          size={15}
                          onPress={() => addToArrayFunction(item)}
                        ></AddButton>
                      }
                    </View>
                  </ListItem>
                );
              }}
              keyExtractor={(item) => item.name}
            />
            <CreateItem>
              <Text
                style={{
                  alignSelf: "center",
                  marginBottom: 12,
                  color: colors.light,
                }}
              >
                {searchText}
              </Text>
              {[
                searchResults.length === 0 ? (
                  <Text
                    style={{
                      textAlign: "center",
                      alignSelf: "left",
                      padding: 12,
                      paddingTop: 0,
                      color: colors.light,
                    }}
                  >
                    Can’t find the allergy you’re looking for? Click the button
                    below to add it to your list
                  </Text>
                ) : null,

                <View>
                  <Button
                    mode="contained"
                    style={{ backgroundColor: colors.primary }}
                    onPress={() => newAllergy(searchText)}
                  >
                    Add allergy
                  </Button>
                </View>,
              ]}
            </CreateItem>
          </SearchListContainer>
        </SearchListWrapper>
      )}

      {selectedItems.length !== 0 ? null : PleaseSelect}
      <Spacer />

      <IngredientsList
        data={selectedItems}
        renderItem={({ item, key, index }) => {
          return (
            <NutrientList
              item={item}
              addToArrayFunction={addToArrayFunction}
              setText={setText}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SearchContainer>
  );
};
