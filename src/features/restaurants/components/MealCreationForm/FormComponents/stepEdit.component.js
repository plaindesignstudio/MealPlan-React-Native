import React, { useState, useContext, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Fonts } from "../../../../../infastructure/theme/fonts";
import Styled from "styled-components/native";
import { Text } from "../../../../../components/Typography/text.component";

import {
  Searchbar,
  Modal,
  Portal,
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
import { RotateInDownLeft } from "react-native-reanimated";

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

export const StepEdit = ({ stepItem, titleUpdate, descriptionUpdate }) => {
  const [visible, setVisible] = useState(false);
  const [mealStepDetails, setMealStepDetails] = useState(stepItem);
  const [stepTitle, setStepTitle] = useState(mealStepDetails.title);
  const [saveItem, setSaveItem] = useState(0);
  const [stepDescription, setStepDescription] = useState(
    mealStepDetails.description
  );

  const { colors } = useTheme();
  const hideDialog = () => {
    setVisible(false);
  };

  // const editDescription = () => {
  //   titleUpdate(stepItem.id, stepDescription, "description");
  //   descriptionUpdate(stepItem.id, stepTitle, "title");
  //   // handleUpdates(stepItem.id, value, "description");
  // };

  function saveStep() {
    setSaveItem(saveItem + 1);
    // titleUpdate(stepItem.id, stepTitle, "title");
    descriptionUpdate(stepItem.id, stepDescription, "description");
    hideDialog();
  }

  const setDialogue = () => {
    setVisible(true);
    setMealStepDetails(stepItem);
  };

  useEffect(() => {
    titleUpdate(stepItem.id, stepTitle, "title");
    hideDialog();
  }, [saveItem]);

  useEffect(() => {
    setMealStepDetails(stepItem);
    // console.log(mealStepDetails.order);
  }, [mealStepDetails.order]);

  return (
    <>
      <Portal style={{ width: "100%", height: "100%" }}>
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
            <Text variant="h2">Step {stepItem.order} information</Text>
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
              {mealStepDetails ? (
                <>
                  <TextInput
                    style={styles.formfield}
                    mode="outlined"
                    //value={mealStepDetails.title}
                    defaultValue={mealStepDetails.title}
                    onChangeText={(text) => setStepTitle(text)}
                    name="title"
                    label="Step Title"
                    id={mealStepDetails.id}
                  />
                  <Spacer position="top" size="large" />
                  <TextInput
                    style={{
                      height: 200,
                      textAlignVertical: "top",
                    }}
                    mode="outlined"
                    // label="Step Description"
                    name="description"
                    numberOfLines="10"
                    placeholder="Add step description here..."
                    //value={mealStepDetails.description}
                    defaultValue={mealStepDetails.description}
                    multiline={true}
                    onChangeText={(text) => setStepDescription(text)}
                    id={mealStepDetails.id}
                  />
                </>
              ) : (
                <></>
              )}
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
                  mode="outlined"
                  style={{ borderColor: colors.text }}
                  textColor={colors.text}
                  onPress={() => hideDialog()}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  style={{ backgroundColor: colors.success }}
                  onPress={() => saveStep()}
                >
                  Save step
                </Button>
              </View>
            </ScrollView>

            <Spacer position="top" size="small" />
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
      <View>
        <IconButton
          icon="square-edit-outline"
          mode="default"
          onPress={() => setDialogue(true)}
        />
      </View>
    </>
  );
};
