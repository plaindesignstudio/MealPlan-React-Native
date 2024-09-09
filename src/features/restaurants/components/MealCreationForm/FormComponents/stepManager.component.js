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
  item: {
    backgroundColor: "#5282BD",
  },
  formfield: {
    marginBottom: 16,
  },
  textArea: {
    height: 100,
  },
});

const ListContainer = Styled.View.attrs({
  position: "relative",
  backgroundColor: "#ffffff",
  zIndex: "100",
  marginBottom: 55,
  height: "87%",
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
backgroundColor: ${(props) => props.theme.colors.bg.dark};
width: 100%;
marginBottom: ${(props) => props.theme.space[0]};
`;

const TouchableSection = Styled(TouchableOpacity).attrs({})`
padding: ${(props) => props.theme.space[0]};
paddingBottom: ${(props) => props.theme.space[0]};
marginBottom: ${(props) => props.theme.space[1]};
backgroundColor: ${(props) => props.theme.colors.bg.secondary};
border: ${(props) => props.theme.colors.bg.dark};`;

export const StepManager = ({ addSteps, mealStepsList }) => {
  const [mealSteps, setMealSteps] = useState(mealStepsList);
  //const [showMore, setShowMore] = useState(mealSteps.map((mealSteps) => false));

  const addNewStep = (e) => {
    const CurrentMealSteps = mealSteps;
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

    //setMealSteps(() => [...mealSteps, newArray]);

    setMealSteps(() => [...mealSteps, newArray]);
    // setMealSteps(mealStepsArray);
    // setData(mealSteps);
  };

  const changeOrder = (e) => {
    setMealSteps(e);
    // const mealStepsArray = mealSteps;
    // mealStepsArray.map((currElement, index) => {
    //   let item_order = currElement.order;
    //   let order_number = index + 1;
    //   item_order = order_number;
    //   return currElement; //equivalent to list[index]
    //   setMealSteps(() => [...mealSteps, newArray]);
    // });
    //setMealSteps(mealStepsArray);
    setStepOrder();
  };

  function textChanges(id, value, field) {
    // console.log("this" + id);
    console.log(field);
    // const newArrray = [];
    let mealStepsArray = mealSteps.map((item) => {
      const currentItem = item;
      if (currentItem.id === id) {
        return [{ ...currentItem, [field]: value }]; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });

    //newArrray.push(mealStepsArray);
    // const newmealStepsArray = [mealStepsArray];
    setMealSteps(mealStepsArray);
  }

  const setStepOrder = () => {
    const mealLength = mealSteps.length;
    for (let i = 0; i < mealLength; i++) {
      const currentItem = mealSteps[i];
      currentItem.order = i + 1;
    }
  };

  const [data, setData] = useState(CurrentMealSteps);

  useEffect(() => {
    //toggleEditor(mealSteps);
    //changeOrder(mealSteps);
    //toggleEditor(mealSteps);
    //setStepOrder();
    setData(CurrentMealSteps);
    setStepOrder();
    addSteps(CurrentMealSteps);
    //console.log(mealSteps);
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
      />
    );
  };

  return (
    <ListContainer>
      <MainTitle>Create meal steps</MainTitle>
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
