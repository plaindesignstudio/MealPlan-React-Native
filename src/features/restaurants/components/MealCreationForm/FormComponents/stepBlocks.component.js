import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import SwipeableItem from "react-native-swipeable-item";
import Styled from "styled-components/native";
import { Button, TextInput, Title, IconButton } from "react-native-paper";
import { back } from "react-native/Libraries/Animated/Easing";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useTheme } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { StepEdit } from "./stepEdit.component";
import { Text } from "../../../../../components/Typography/text.component";

const styles = StyleSheet.create({
  activeSearch: {
    borderBottomLeftRadius: "0em",
    borderBottomRightRadius: "0em",
  },
  displayBlock: {
    display: "block",
    padding: 12,
  },
  displayNone: {
    display: "none",
  },
  rowItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: `${(props) => props.theme.colors.bg.light}`,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  formWrapper: { backgroundColor: "#F1F1F1" },
  openEditor: {
    backgroundColor: "#F1F1F1",
  },
  closedEditor: {
    backgroundColor: "#ffffff",
  },
  formfield: {
    marginBottom: 16,
  },

  textArea: {
    padding: 0,
  },
  halfOpacity: {
    opacity: 0.3,
  },
  actionText: {
    color: "white",
    marginBottom: 0,
    marginTop: 6,
    padddingBottom: 0,
    textAlign: "center",
  },
  deleteWrapper: {
    borderRadius: 0,
    marginTop: 0,
    padding: 0,
  },
});

const StepTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.title};
fontWeight: bold;
textAlign: left;
marginBottom: 0;
maxWidth: 230
`;

const StepOrderNumber = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.order};
fontWeight: bold;
textAlign: left;
marginBottom: 0;
`;

const ListItem = Styled.View`
padding: ${(props) => props.theme.space[2]};
margin: ${(props) => props.theme.space[0]};
backgroundColor: ${(props) => props.theme.colors.bg.light};
`;

const Topheader = Styled.View`
flexDirection: "row",
flexWrap: "wrap",
alignItems: "center",
justifyContent: "center",
paddingTop: ${(props) => props.theme.space[0]};
paddingBottom: ${(props) => props.theme.space[0]};
paddingLeft: ${(props) => props.theme.space[3]};
paddingRight: ${(props) => props.theme.space[1]};
width: 100%;
marginBottom: ${(props) => props.theme.space[0]};
`;

const TouchableSection = Styled(TouchableOpacity).attrs({})`
padding: ${(props) => props.theme.space[0]};
paddingBottom: ${(props) => props.theme.space[0]};
marginBottom: ${(props) => props.theme.space[1]};
backgroundColor: ${(props) => props.theme.colors.bg.white};`;

export const StepBlocks = ({
  item,
  drag,
  isActive,
  handleUpdates,
  removeStep,
}) => {
  const [stepEditor, setStepEditor] = useState(false);
  const { colors } = useTheme();
  const toggleEditor = (toggle) => {
    toggle === true ? setStepEditor(false) : setStepEditor(true);
  };
  const [stepItem, setStepItem] = useState(item);
  const [stepDescription, setStepDescription] = useState(stepItem.description);
  const [stepTitle, setStepTitle] = useState(stepItem.title);

  const descriptionUpdate = (id, value, label) => {
    handleUpdates(id, value, label);
  };

  const titleUpdate = (id, value, label) => {
    handleUpdates(id, value, label);
  };

  useEffect(() => {
    setStepItem(item);
    //  handleUpdates(id, value, "title");
    //   handleUpdates(id, value, "description");
  }, [handleUpdates, item]);

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <Button
        style={
          ([styles.deleteWrapper],
          {
            backgroundColor: colors.error,
            borderRadius: 0,
            alignItems: "center",
            display: "flex",
          })
        }
        onPress={() => removeStep(item)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: colors.error,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 0,
          }}
        >
          <Animated.Text
            style={[
              styles.actionText,
              {
                transform: [{ translateX: trans }],
              },
            ]}
          >
            Delete
          </Animated.Text>
        </View>
      </Button>
    );
  };

  useEffect(() => {
    //toggleEditor(mealSteps);
    //hangeOrder(mealSteps);
    //addSearchText(ingredientsSearch);
    //setSelectedItems(ingredientsArray);
    //searchFunction({ ...filters, allergies: allergySelection });
    //setAllergySelection(() => [...allergySelection, filters]);
  }, [item, drag]);

  useEffect(() => {}, [handleUpdates]);

  return (
    <ScaleDecorator>
      <TouchableSection
        style={
          ({
            borderRadius: 0,
            overflow: "hidden",
          },
          [
            styles.formWrapper,
            stepEditor === true ? styles.openEditor : styles.closedEditor,
          ])
        }
        activeOpacity={1}
        onLongPress={drag}
        disabled={isActive}
      >
        <Swipeable renderLeftActions={renderLeftActions}>
          <Topheader
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.info,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "noWrap",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderRadius: "25em",
                  maxWidth: 30,
                  maxHeight: 30,
                  width: 30,
                  height: 30,
                  padding: 1,
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "noWrap",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Text
                  variant="h5"
                  style={{ color: colors.text, marginBottom: 0 }}
                >
                  {stepItem.order}
                </Text>
              </View>

              <Text
                variant="body"
                style={[
                  { color: colors.text, marginBottom: 0 },

                  !item.title ? styles.halfOpacity : null,
                ]}
              >
                {(styles.formWrapper, !item.title ? "No title" : item.title)}
              </Text>
            </View>
            {/* <StepEdit onPress={() => toggleEditor(stepItem)}> */}
            <StepEdit
              size={20}
              stepItem={stepItem}
              titleUpdate={titleUpdate}
              descriptionUpdate={descriptionUpdate}
            />
          </Topheader>
        </Swipeable>
        <ListItem
          style={[
            stepEditor === true ? styles.displayBlock : styles.displayNone,
          ]}
        >
          {/* <TextInput
            style={styles.formfield}
            mode="outlined"
            value={stepItem.title}
            defaultValue={stepItem.title}
            onChangeText={(text) => handleTitle(text, stepItem.id)}
            name="title"
            label="Step title"
            id={stepItem.id}
          />

          <TextInput
            style={{ height: 100, textAlidsfgnVertical: "top" }}
            mode="outlined"
            label="Step Description"
            name="title"
            value={stepItem.description}
            defaultValue={stepItem.description}
            multiline={true}
            onChangeText={(text) => handleDescription(text, stepItem.id)}
            id={stepItem.id}
          /> */}
        </ListItem>
      </TouchableSection>
    </ScaleDecorator>
  );

  //return { renderItem };

  // return (
  //   <ScaleDecorator>
  //     <TouchableOpacity
  //       onLongPress={drag}
  //       disabled={isActive}
  //       style={[{ backgroundColor: isActive ? "red" : item.backgroundColor }]}
  //     >
  //       <Text>{item[0].title}jksahkdjh</Text>
  //     </TouchableOpacity>
  //   </ScaleDecorator>
  // );

  // return (
  //   <View>
  //     <Text>Helllo</Text>
  //   </View>
  // );
};
