import React, { useState, useContext, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Fonts } from "../../../../../infastructure/theme/fonts";
import Styled from "styled-components/native";
import {
  Searchbar,
  Modal,
  Portal,
  Text,
  Button,
  IconButton,
  TextInput,
  Dialog,
  PaperProvider,
} from "react-native-paper";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../../../../components/services/axiosGetRequest";
import { View, FlatList, StyleSheet } from "react-native";
//import { NavigationContainer } from "@react-navigation/native";
import { IngredientsEdit } from "../FormComponents/ingredientsEdit.component";
import { IngredientsCreation } from "./ingredientsCreation.component";
import { useTheme } from "react-native-paper";
import { AddIngredientContext } from "../../../addIngredient.context";
import { UnitItemsContext } from "../../../units.context";
// import { SearchFieldsContext } from "../search.context";
// import { useEffect } from "react/cjs/react.development";
// import { AllergyFilter } from "./allergies.component";

const SearchContainer = Styled.View`
`;

const AlergiesContainer = Styled.View`
padding: ${(props) => props.theme.space[2]};`;

const styles = StyleSheet.create({
  activeSearch: {
    borderBottomLeftRadius: "0em",
    borderBottomRightRadius: "0em",
  },
});

const SearchBar = Styled(Searchbar).attrs({
  //backgroundColor: `${(props) => props.theme.colors.bg.info}`,
})`backgroundColor: ${(props) => props.theme.colors.bg.light}; 
marginBottom: ${(props) => props.theme.space[0]}`;

const SearchListWrapper = Styled(View).attrs({
  position: "relative",
  flex: 1,
  zIndex: "100",
})`marginBottom: ${(props) => props.theme.space[12]};`;

const SearchListContainer = Styled(View).attrs({
  position: "absolute",
  width: "100%",
  zIndex: "100",
  borderBottomLeftRadius: "25em",
  borderBottomRightRadius: "25em",
  backgroundColor: `${(props) => props.theme.colors.bg.info}`,
})``;

const IngredientsList = Styled(FlatList).attrs({
  width: "100%",
  borderBottomLeftRadius: "25em",
  borderBottomRightRadius: "25em",
  contentContainerStyle: {
    padding: 6,
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
padding: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.info};
borderRadius: 12;
marginBottom: ${(props) => props.theme.space[2]};
`;

const Spacer = Styled.View`
marginBottom: ${(props) => props.theme.space[2]};
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
padding: ${(props) => props.theme.space[4]};

textAlign: center;
`;

export const IngredientsSearch = ({
  listUpdate,
  ingredientsArray,
  existingIngredients,
  Navigation,
}) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [ingredientUpdate, setIngrdeientUpdate] = useState([]);
  const [createdIngrdient, setCreatedIngrdient] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { ingredientItemsAPI } = useContext(AddIngredientContext);
  //const { un}
  // setSelectedItems(ingredientsArray);
  const { colors } = useTheme();
  const noResults = <Text>No ingredients found</Text>;
  const PleaseSelect = (
    <NoIgredients>
      <Title>No ingredients found</Title>
      <Text>
        Search for ingredients and add them to the list for this meal.
      </Text>
    </NoIgredients>
  );

  //Dialogue
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  //const {} = useContext(SearchFieldsContext);
  // const [filterSearch, setFilters] = useState({
  //   allergies: {},
  // });
  // const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIngredients = (item) => {
    //setLoading(true);
    setTimeout(() => {
      axiosGetRequest(`/api/ingredients/search/${item}`, null, null, "GET")
        .then(resultsTransform)
        .then((results) => {
          //setLoading(false);
          setSearchData(results);
        })
        .catch((err) => {
          //setLoading(false);
          setError(err);
        });
    }, 0);
  };

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

  const addToArrayFunction = (item) => {
    setSearchText(null);

    if (item) {
      const included = selectedItems.some(
        (selectedItems) => selectedItems.id === item.id
      ); // true
      const filteredExisting = selectedItems.filter((selectedItems) => {
        return selectedItems !== item;
      });

      if (included === true) {
        const removedItem = filteredExisting;
        setSelectedItems(removedItem);
      } else {
        const newArray = {
          ...item,
          quantity: 1,
          quantity_display: 0,
          amount: null,
          short_name: null,
          unit_id: null,
          unit_name: null,
        };
        setSelectedItems(() => [...selectedItems, newArray]);
      }
    }
    //props.allergySelection(allergySelection);
  };

  const setText = (item) => {
    let el = selectedItems.map((selectedItem) => {
      if (selectedItem.id === item.id) {
        selectedItem.quantity = item.quantity;
        selectedItem.amount = item.amount;
        // selectedItem.units = item.units;
        selectedItem.quantity_display = item.quantity_display;
        selectedItem.short_name = item.short_name;
        selectedItem.unit_name = item.unit_name;
        selectedItem.unit_id = item.unit_id;
      }
      return selectedItem;
    });

    // set the previous list to the new list
    setSelectedItems(el);
  };

  useEffect(() => {
    //addSearchText(ingredientsSearch);
    if (searchText !== null && searchText !== "") {
      setSearchActive(true);
      fetchIngredients(searchText);
    } else {
      setSearchActive(false);
      fetchIngredients(searchText);
    }
    listUpdate(selectedItems);
  }, [searchText, selectedItems]);

  useEffect(() => {
    if (ingredientItemsAPI) {
      if (ingredientItemsAPI.length !== 0) {
        addToArrayFunction(ingredientItemsAPI);
      } else {
        console.log("item not set");
      }
    }
  }, [ingredientItemsAPI]);

  useEffect(() => {
    const length = existingIngredients.length;
    if (length > 0) {
      setSelectedItems(existingIngredients);
    } else {
      //console.log("no existing items");
    }
  }, []);

  useEffect(() => {
    //console.log(existingIngredients);
  }, []);

  return (
    <SearchContainer>
      <SearchBar
        style={
          searchActive === true
            ? [styles.activeSearch, styles.searchBar]
            : [styles.searchBar]
        }
        placeholder="Find Ingredient"
        onSubmitEditing={(text) => {
          addSearchText(text);
        }}
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
              data={searchData}
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
                      <Text>{checkExists(item.id)}</Text>
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
                    </View>
                  </ListItem>
                );
              }}
              keyExtractor={(item) => item.id}
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
                searchData.length < 1 ? (
                  <Text
                    style={{
                      textAlign: "center",
                      alignSelf: "left",
                      paddingBottom: 12,
                      paddingLeft: 12,
                      paddingRight: 12,
                    }}
                  >
                    Can’t find the ingredient you’re looking for? Click the
                    button below to add this ingredient to your list
                  </Text>
                ) : null,
              ]}

              <View>
                <IngredientsCreation
                  name={searchText}
                  searchText={setSearchText}
                  //onPress={setSearchText("")}
                  //addToList={setCreatedIngrdient()}
                />
              </View>
            </CreateItem>
          </SearchListContainer>
        </SearchListWrapper>
      )}
      {selectedItems.length !== 0 ? null : PleaseSelect}
      <Spacer />
      <IngredientsList
        data={selectedItems}
        renderItem={({ item, index }) => {
          return (
            <NewItem
              style={{
                marginBottom: 8,
                alignItem: "center",
              }}
            >
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <AddButton
                    style={{ borderColor: colors.error }}
                    iconColor={colors.error}
                    icon="minus"
                    mode="outlined"
                    size={10}
                    onPress={() => addToArrayFunction(item)}
                  ></AddButton>
                </View>
                <View
                  style={{
                    height: "100%",
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    key={item.id}
                    style={{
                      margin: 2,
                      marginLeft: 4,
                      paddingLeft: 0,
                      marginBottom: 0,
                    }}
                  >
                    {item.quantity_display === 0 ? (
                      <Text>
                        {item.name} {item.amount * 1}
                        {item.short_name}
                      </Text>
                    ) : (
                      <Text>
                        {item.quantity} {item.name}
                        <Text style={{ opacity: 0.6, marginLeft: 12 }}>
                          {" "}
                          ({item.amount * item.quantity}
                          {item.short_name})
                        </Text>
                      </Text>
                    )}
                  </Text>
                  {/* <TextInput
                    defaultValue={`${item.quantity}`}
                    value={`${item.quantity}`}
                    onChangeText={(text) => setText(text, item)}
                    name="quantity"
                    mode="outlined"
                    label="quantity"
                    id={item.id}
                    right={<TextInput.Affix text="grams" />}
                  /> */}
                </View>
                <IngredientsEdit ingredient={item} setText={setText} />
              </View>
            </NewItem>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SearchContainer>
  );
};
