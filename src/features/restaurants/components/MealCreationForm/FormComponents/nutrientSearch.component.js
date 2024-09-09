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
import { NutritionlItemsContext } from "../../../nutrition.context";
import { UnitItemsContext } from "../../../units.context";
import { useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { NutrientList } from "./nutrientList.component";
// import { SearchFieldsContext } from "../search.context";
// import { useEffect } from "react/cjs/react.development";
// import { AllergyFilter } from "./allergies.component";

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
  //backgroundColor: `${(props) => props.theme.colors.bg.info}`,
})`backgroundColor: ${(props) => props.theme.colors.bg.light}; 
marginBottom: ${(props) => props.theme.space[0]};
padding: ${(props) => props.theme.space[0]}`;

const SearchListWrapper = Styled(View).attrs({
  position: "relative",
  flex: 1,
  zIndex: "100",
})`marginBottom: ${(props) => props.theme.space[12]};`;

const SearchListContainer = Styled(View).attrs({
  position: "absolute",
  width: "100%",
  zIndex: 100,
  borderBottomLeftRadius: "25em",
  borderBottomRightRadius: "25em",
  backgroundColor: `${(props) => props.theme.colors.bg.info}`,
})``;

const IngredientsList = Styled(FlatList).attrs({
  width: "100%",
  borderBottomLeftRadius: "0em",
  borderBottomRightRadius: "0em",
  contentContainerStyle: {
    padding: 0,
    width: "100%",
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
backgroundColor: ${(props) => props.theme.colors.bg.info};
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
})`padding: ${(props) => props.theme.space[3]};  backgroundColor: ${(props) =>
  props.theme.colors.bg.infoLight}`;

const NoIgredients = Styled.View`
paddingBottom: ${(props) => props.theme.space[0]};
paddingTop: ${(props) => props.theme.space[4]};
textAlign: center;
`;

export const NutrientSearch = ({
  navigation,
  nutrientSearchList,
  updateNutrients,
}) => {
  const { nutritionItems, isLoading, error, filters, searchFunction } =
    useContext(NutritionlItemsContext);
  const { unitItems, retriveUnits } = useContext(UnitItemsContext);
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchText, setSearchText] = useState(filters["search"]);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [unit, setUnit] = useState("");
  const [unitList, setUnitList] = useState([]);
  const { colors } = useTheme();
  //const {} = useContext(SearchFieldsContext);

  const PleaseSelect = (
    <NoIgredients>
      <Text style={{ textAlign: "center", marginBottom: 4 }}>
        No nutritional table?{" "}
      </Text>
      <Text style={{ textAlign: "center", marginBottom: 4 }}>
        use the search above to add nutrition items
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
    console.log(text);
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

  const newUnitList = (data) => {
    // const filteredExisting = selectedItems.filter((selectedItems) => {
    let el = data.map((unitItem) => {
      unitItem["label"] = unitItem.short_name;
      unitItem["value"] = unitItem.id;
      return unitItems;
    });
    // set the previous list to the new list
    setUnitList(el[0]);
    //console.log(el);
  };

  const newNutrient = (data) => {
    const newArray = [];
    var newList = {};
    setSearchActive(false);
    if (data) {
      // to print each of the titles
      newList["id"] = data;
      newList["name"] = data;
      newList["per100Gram"] = null;
      newList["unit"] = null;
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
      const newArray = { ...item, quantity: 1 };
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
      setSearchResults(nutritionItems);
    } else {
      setSearchActive(false);
    }
  }, [searchText]);

  useEffect(() => {
    retriveUnits();
    newUnitList(unitItems);
  }, [searchText]);

  return (
    <SearchContainer>
      <SearchBar
        style={
          searchActive === true
            ? [styles.activeSearch, styles.searchBar]
            : [styles.searchBar]
        }
        placeholder="Search nutritional item"
        // value={filters["search"]}
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
              data={nutritionItems}
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
                        style={{ display: "flex", alignSelf: "center" }}
                        key={item.name}
                      >
                        {item.name}
                      </Text>
                      {<Text>{checkExists(item.name)}</Text>}
                      {
                        <AddButton
                          style={
                            checkExists(item.id)
                              ? { backgroundColor: colors.dark }
                              : { borderColor: colors.dark }
                          }
                          iconColor={
                            checkExists(item.id) ? colors.white : colors.dark
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
                    }}
                  >
                    Can’t find the nutrion item you’re looking for? Click the
                    button below to add it to your table
                  </Text>
                ) : null,

                <View>
                  <Button
                    mode="contained"
                    style={{ backgroundColor: colors.primary }}
                    onPress={() => newNutrient(searchText)}
                  >
                    Add nutrition
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
            // <NewItem
            //   keyExtractor={(item, index) => index}
            //   style={{
            //     marginBottom: 8,
            //     marginTop: 8,
            //     alignItem: "center",
            //   }}
            // >
            //   <View
            //     style={{
            //       flex: 3,
            //       flexDirection: "row",
            //       alignContent: "center",
            //       justifyContent: "space-between",
            //     }}
            //   >
            //     <View
            //       style={{
            //         height: "100%",
            //         justifyContent: "center",
            //       }}
            //     >
            //       <AddButton
            //         style={{ borderColor: colors.error, marginLeft: 12 }}
            //         iconColor={colors.error}
            //         icon="minus"
            //         mode="outlined"
            //         size={8}
            //         onPress={() => addToArrayFunction(item)}
            //       ></AddButton>
            //     </View>
            //     <View
            //       style={{
            //         height: "100%",
            //         flexGrow: 100,
            //         flex: 2,
            //         flexDirection: "row",
            //         justifyContent: "space-between",
            //         alignItems: "center",
            //       }}
            //     >
            //       <Text
            //         key={item.id}
            //         style={{
            //           // flexGrow: 100,
            //           // flexGrow: 80,

            //           marginLeft: 4,
            //           paddingLeft: 0,
            //           marginBottom: 0,
            //           alignItems: "center",
            //           alignContent: "center",
            //         }}
            //       >
            //         {item.name}
            //       </Text>
            //     </View>

            //     <TextInput
            //       defaultValue={null}
            //       value={null}
            //       type="number"
            //       onChangeText={(text) => setText(item, text, "per100Gram")}
            //       style={{
            //         backgroundColor: colors.info,
            //         borderColor: "transparent",
            //         padding: 1,
            //         margin: 1,
            //         //minWidth: 30,
            //         textAlign: "right",
            //         height: 40,
            //       }}
            //       name="per100Gram"
            //       mode="flat"
            //       underlineColor="transparent"
            //       outlineColor="transparent"
            //       activeOutlineColor="transparent"
            //       id={item.id}
            //       placeholder="00.0"
            //       placeholderTextColo={colors.infoLight}
            //     />
            //     <DropDown
            //       style={{
            //         backgroundColor: colors.white,
            //         borderColor: "transparent",
            //         padding: 1,
            //         marginRight: 3,
            //         marginBottom: 2,
            //         minWidth: 30,
            //         width: 40,
            //         maxWidth: 40,
            //         borderEndEndRadius: 8,
            //         textAlign: "left",
            //         height: 40,
            //       }}
            //       mode={"flat"}
            //       visible={showDropDown}
            //       showDropDown={() => setShowDropDown(true)}
            //       onDismiss={() => setShowDropDown(false)}
            //       value={unit}
            //       setValue={setUnit}
            //       list={unitList}
            //     />
            //   </View>
            // </NewItem>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SearchContainer>
  );
};
