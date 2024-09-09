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
  MD3Colors,
  overlay,
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
// import { SearchFieldsContext } from "../search.context";
// import { useEffect } from "react/cjs/react.development";
// import { AllergyFilter } from "./allergies.component";
import DropDown from "react-native-paper-dropdown";
import { UnitItemsContext } from "../../../units.context";
import { Spacer } from "../../../../../components/spacer/spacer.component";

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
marginBottom: 16;
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

export const IngredientsEdit = ({ ingredient, setText }) => {
  const [ingredientID, setIngredientID] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [displayQuatity, setDisplayQuatity] = useState(false);
  const [measurement, setMeasurement] = useState(0);
  const [unitId, setUnitId] = useState(ingredient.unit_id);
  const [unit, setUnit] = useState();
  const [quantity, setQuantity] = useState(1);
  const [showDropDown, setShowDropDown] = useState(false);
  const { unitItems, retriveUnits } = useContext(UnitItemsContext);
  const [unitList, setUnitList] = useState([]);
  const { colors } = useTheme();
  const hideDialog = () => {
    setVisible(false);
    setIngredientID([]);
  };

  const setIngrdeient = (item) => {
    if (item) {
      const newArray = {
        ...item,
        quantity: quantity,
        quantity_display: displayQuatity,
        amount: measurement,
        short_name: unit.short_name,
        unit_id: unit.id,
        unit_name: unit.name,
      };
      console.log(newArray);
      setIngredientID(newArray);
      setText(newArray);
    }
  };

  const unitSelection = (id) => {
    const unitArray = unitList.find((x) => x.id === id);
    setUnit(unitArray);
  };

  const setDialogue = () => {
    setVisible(true);
    setIngredientID(ingredient);
  };

  useEffect(() => {
    unitSelection(ingredient.id);
    setMeasurement(ingredient.amount);
    setQuantity(ingredient.quantity);
    setDisplayQuatity(ingredient.quantity_display);
  }, []);

  useEffect(() => {
    if (unit && measurement) {
      setIngrdeient(ingredient);
    }
  }, [unit, measurement, quantity, displayQuatity]);

  useEffect(() => {
    unitSelection(unitId);
    console.log(unitId);
  }, [unitId]);

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

  useEffect(() => {
    retriveUnits();
    newUnitList(unitItems);
  }, []);

  return (
    <>
      <Portal
        style={{
          width: "100%",
          height: "100%",
        }}
      >
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
            backgroundColor: "white",
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
            Ingredient amount
          </Dialog.Title>

          <Dialog.ScrollArea
            style={{
              padding: 0,
              backgroundColor: "white",
              borderColor: "white",
            }}
          >
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 0,
              }}
            >
              <Text style={{ marginBottom: 12 }}>
                Add measurement information for this ingredient
              </Text>
              <View
                style={{
                  height: "100%",
                  flexGrow: 100,
                  width: "100%",
                  flex: 1,
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  // paddingEnd: 8,
                }}
              >
                <TextInput
                  defaultValue={null}
                  keyboardType="numeric"
                  value={measurement}
                  type="number"
                  onChangeText={(text) => setMeasurement(text)}
                  style={{
                    flexGrow: 1,
                    backgroundColor: colors.info,
                    borderColor: "transparent",
                    padding: 3,
                    margin: 1,
                    top: 0,
                    textAlign: "right",
                    height: 50,
                    position: "relative",
                  }}
                  name="per100Gram"
                  //mode="outlined"
                  // underlineColor="transparent"
                  // outlineColor="transparent"
                  // activeOutlineColor="transparent"
                  // id={item.id}
                  //label="Amount"
                  placeholder="00.0"
                  outlineColor={colors.info}
                  placeholderTextColo={colors.infoLight}
                />
                <DropDown
                  style={{
                    backgroundColor: colors.info,
                    borderColor: "transparent",
                    padding: 1,
                    marginRight: 3,
                    marginBottom: 2,
                    marginRight: 4,
                    minWidth: 30,
                    width: 40,
                    maxWidth: 40,
                    borderEndEndRadius: 8,
                    textAlign: "left",
                    height: 40,
                    overflow: "hidden",
                  }}
                  onChangeText={(text) => unitSelection(text)}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={unitId}
                  setValue={setUnitId}
                  list={unitList}
                  placeholder="Unit"
                  inputProps={{
                    backgroundColor: colors.info,
                    minWidth: 20,
                    right: 1,
                    top: 0,
                    borderEndEndRadius: 0,
                    padding: 5,
                    overflow: "hidden",
                  }}
                  dropDownStyle={{ minWidth: 100 }}
                />
                {/* <DropDown
                  // defaultValue={`${item.quantity}`}
                  // value={`${item.quantity}`}
                  onChangeText={(text) => setText(item, text, "unit")}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  style={{
                    backgroundColor: colors.white,
                    borderColor: "transparent",
                    padding: 1,
                    marginRight: 3,
                    marginBottom: 2,
                    minWidth: "fitcontent",
                    maxWidth: 40,
                    borderEndEndRadius: 8,
                    textAlign: "left",
                    height: 40,
                  }}
                  name="unit"
                  mode="flat"
                  underlineColor="transparent"
                  outlineColor="transparent"
                  activeOutlineColor="transparent"
                  id={item.id}
                  list={unitItems}
                  placeholder="g"
                  placeholderTextColor={colors.dark}
                /> */}
                {/* <IngredientsEdit ingredient={item} /> */}
              </View>

              <View
                style={
                  measurement === null || measurement <= 0
                    ? //styles.activebutton,
                      [
                        {
                          opacity: 0.2,
                        },
                      ]
                    : [
                        {
                          opacity: 1,
                        },
                      ]
                }
              >
                <Spacing></Spacing>
                <Title>
                  Display
                  {/* {ingredientID.name} */}
                </Title>
                <Text style={{ marginBottom: 8 }}>
                  This is how your ingreient will be displayed:
                </Text>
                <NewItem
                  style={{
                    marginBottom: 12,
                    marginTop: 0,

                    alignItem: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      padding: 12,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        flexGrow: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Title
                        style={{
                          margin: 2,
                          marginLeft: 4,
                          paddingLeft: 0,
                          marginBottom: 0,
                        }}
                      >
                        {displayQuatity === 0 ? (
                          <Text>
                            {ingredient.name} {measurement * 1}
                            {ingredient.short_name}
                          </Text>
                        ) : (
                          <Text>
                            {quantity} {ingredient.name}
                            <Text style={{ opacity: 0.6, marginLeft: 12 }}>
                              {" "}
                              ({measurement * quantity}
                              {ingredient.short_name})
                            </Text>
                          </Text>
                        )}
                      </Title>
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
                  </View>
                </NewItem>

                <View style={{ flex: 2, flexDirection: "row" }}>
                  <Pressable
                    style={
                      displayQuatity === 0
                        ? //styles.activebutton,
                          [
                            {
                              backgroundColor: colors.primary,
                              borderColor: colors.primary,
                              borderWidth: 1,
                              borderStyle: "solid",
                            },
                            styles.measurementbutton,
                          ]
                        : [
                            {
                              backgroundColor: colors.white,
                              borderColor: colors.dark,
                              borderWidth: 1,
                              borderStyle: "solid",
                            },
                            styles.measurementbutton,
                          ]
                    }
                    mode="outlined"
                    onPress={() => {
                      setDisplayQuatity(0);
                    }}
                  >
                    <Text
                      style={
                        displayQuatity === 1
                          ? //styles.activebutton,
                            [
                              {
                                color: colors.dark,
                              },
                            ]
                          : [
                              {
                                color: colors.white,
                              },
                            ]
                      }
                    >
                      Measurement
                    </Text>
                  </Pressable>
                  <Pressable
                    style={
                      displayQuatity === 1
                        ? //styles.activebutton,
                          [
                            {
                              borderColor: colors.primary,
                              borderWidth: 1,
                              borderStyle: "solid",
                              backgroundColor: colors.primary,
                              color: colors.white,
                            },
                            styles.quantityButton,
                          ]
                        : [
                            {
                              backgroundColor: colors.white,
                              borderColor: colors.dark,
                              borderWidth: 1,
                              borderStyle: "solid",
                              color: colors.dark,
                            },
                            styles.quantityButton,
                          ]
                    }
                    mode="outlined"
                    onPress={() => {
                      setDisplayQuatity(1);
                    }}
                  >
                    <Text
                      style={
                        displayQuatity === 1
                          ? //styles.activebutton,
                            [
                              {
                                color: colors.white,
                              },
                            ]
                          : [
                              {
                                color: colors.dark,
                              },
                            ]
                      }
                    >
                      Quantity
                    </Text>
                    <View
                      style={
                        displayQuatity === 1
                          ? //styles.activebutton,
                            [
                              {
                                flexDirection: "row",
                                alignItems: "center",
                              },
                            ]
                          : [
                              {
                                width: 12,
                                overflow: "hidden",
                                flexDirection: "row",
                                alignItems: "center",
                              },
                            ]
                      }
                    >
                      <AddButton
                        style={{ borderColor: colors.white }}
                        iconColor={colors.white}
                        icon="minus"
                        mode="outlined"
                        size={10}
                        onPress={() => {
                          if (quantity > 1) {
                            setQuantity((current) => current - 1);
                          } else {
                            setQuantity(1);
                          }
                        }}
                      />
                      <Text style={{ color: colors.white }}>{quantity}</Text>
                      <IconButton
                        style={{ borderColor: colors.white }}
                        iconColor={colors.white}
                        icon="plus"
                        mode="outlined"
                        size={10}
                        onPress={() => {
                          setQuantity((current) => current + 1);
                        }}
                      />
                    </View>
                  </Pressable>
                </View>

                <Spacing></Spacing>

                <Text
                  style={
                    displayQuatity === 1
                      ? { display: "block" }
                      : { display: "block" }
                  }
                >
                  Use quantity to multiply the ingredient measurments for single
                  item foods e.g 2 Apples or 3 Avacados (you still need the
                  measurement for 1 single item)
                </Text>
                <View
                  style={{
                    marginBottom: 8,
                  }}
                ></View>
              </View>

              <Spacer position="top" size="large" />
              <View
                style={{
                  marginBottom: 8,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 12,
                }}
              >
                <Button
                  mode="contained"
                  style={{ backgroundColor: colors.success }}
                  onPress={() => hideDialog()}
                >
                  Save quantity
                </Button>
              </View>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>

      <View>
        <IconButton
          icon="square-edit-outline"
          mode="default"
          onPress={() => setDialogue(ingredient)}
        />
      </View>
    </>
  );
};
