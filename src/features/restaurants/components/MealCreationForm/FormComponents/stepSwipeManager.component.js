import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import Styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { StepBlocks } from "./stepBlocks.component";
import { Swipeable } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  activeSearch: {
    borderBottomLeftRadius: "0em",
    borderBottomRightRadius: "0em",
  },
  displayBlock: {
    display: "block",
  },
  displayNone: {
    display: "none",
  },
  rowItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  formfield: {
    marginBottom: 16,
  },
  textArea: {
    height: 100,
  },
});

const ListContainer = Styled.ScrollView.attrs({
  position: "relative",
  backgroundColor: "#ffffff",
  zIndex: "100",
  marginBottom: 55,
  height: "90%",
})`
backgroundColor: ${(props) => props.theme.primaryContainer};
`;

const Title = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.title};
fontWeight: ${(props) => props.theme.fontWeights.bold};
textAlign: center;
marginBottom: 12;
`;

const MainTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.h5};
fontWeight: bold;
textAlign: center;
marginBottom: 16;
`;

const ListItem = Styled.View`
padding: ${(props) => props.theme.space[0]};
margin: ${(props) => props.theme.space[0]};
backgroundColor: ${(props) => props.theme.colors.bg.light};
`;

const Topheader = Styled.View`
padding: ${(props) => props.theme.space[1]};
paddingLeft: ${(props) => props.theme.space[1]};
paddingRight: ${(props) => props.theme.space[1]};
backgroundColor: ${(props) => props.theme.primaryContainer};
width: 100%;
marginBottom: ${(props) => props.theme.space[0]};
`;

const TouchableSection = Styled(TouchableOpacity).attrs({})`
padding: ${(props) => props.theme.space[0]};
paddingBottom: ${(props) => props.theme.space[0]};
marginBottom: ${(props) => props.theme.space[1]};
backgroundColor: ${(props) => props.theme.primaryContainer};
border: ${(props) => props.theme.colors.bg.dark};`;

export const StepSwipeManager = ({ addSteps, mealStepsList }) => {
  const [mealSteps, setMealSteps] = useState(mealStepsList);
  //const [showMore, setShowMore] = useState(mealSteps.map((mealSteps) => false));

  const addNewStep = (e) => {
    const arrayLength = mealSteps.length + 1;
    const mealId = mealSteps.length + 1;
    const newArray = {
      id: mealId,
      title: null,
      description: null,
      order: arrayLength,
      meal_id: 3,
      key: 0,
      openToggle: true,
    };

    setMealSteps(() => [...mealSteps, newArray]);
    // setMealSteps(mealStepsArray);
    // setData(mealSteps);
  };

  const removeStep = (item) => {
    //console.log(allergySelection);
    //item.persist();
    const included = mealSteps.includes(item);
    const filteredExisting = mealSteps.filter((mealSteps) => {
      return mealSteps.id !== item.id;
    });
    // console.log(included);
    // if (included === true) {
    const removedItem = filteredExisting;
    setMealSteps(removedItem);
    // }
  };

  const textChanges = (id, value, field) => {
    const newArrray = [];
    let mealStepsArray = mealSteps.map((item) => {
      const currentItem = item;
      if (currentItem.id === id) {
        return { ...currentItem, [field]: value }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });

    //newArrray.push(mealStepsArray);
    // const newmealStepsArray = [mealStepsArray];
    setMealSteps(mealStepsArray);
  };

  const setStepOrder = () => {
    const mealLength = mealSteps.length;
    for (let i = 0; i < mealLength; i++) {
      const currentItem = mealSteps[i];
      currentItem.order = i + 1;
    }
  };

  const [data, setData] = useState(mealSteps);

  useEffect(() => {
    // console.log(mealSteps);
    //toggleEditor(mealSteps);
    //changeOrder(mealSteps);
    //toggleEditor(mealSteps);
    addSteps(mealSteps);
    setStepOrder();
    setData(mealSteps);
    //addSearchText(ingredientsSearch);
    //setSelectedItems(ingredientsArray);
    //searchFunction({ ...filters, allergies: allergySelection });
    //setAllergySelection(() => [...allergySelection, filters]);
  }, [mealSteps]);

  const renderItem = ({
    item,
    index,
    drag,
    isActive,
  }: RenderItemParams<Item>) => {
    return (
      <StepBlocks
        item={item}
        drag={drag}
        isActive={isActive}
        handleUpdates={textChanges}
        removeStep={removeStep}
      />
    );
  };

  return (
    <ListContainer>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setMealSteps(data)}
        keyExtractor={(data, index) => index}
        renderItem={renderItem}
      />

      <Button onPress={() => addNewStep()}>+ Add Step</Button>
    </ListContainer>
  );
};
