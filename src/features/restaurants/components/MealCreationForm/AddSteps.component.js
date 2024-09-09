import React, { useState, useContext, useEffect, Component } from "react";
import Styled from "styled-components/native";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { StepSwipeManager } from "./FormComponents/stepSwipeManager.component";

const FormContainer = Styled.View`
padding: ${(props) => props.theme.space[2]};
paddingBottom: ${(props) => props.theme.space[3]};
backgroundColor: ${(props) => props.theme.colors.bg.background};
height: 100%;
`;

const MainTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.h5};
fontWeight: bold;
textAlign: center;
marginBottom: 16;
`;

const styles = StyleSheet.create({
  formfield: {
    marginBottom: 16,
  },
});

export class AddSteps extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  formChange = (name) => (value) => {};

  render() {
    const { values, addNewMealSteps, nextStep, prevStep } = this.props;

    return (
      <FormContainer>
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            justifyContent: "space-between",
          }}
        >
          <MainTitle>Create meal steps</MainTitle>
          <Text>{values.step}/4</Text>
        </View>

        <StepSwipeManager
          addSteps={addNewMealSteps}
          mealStepsList={values.meal_steps}
          style={{
            maxHeight: "50%",
          }}
        />
        <View>
          <View
            style={{
              zIndex: "90",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button icon="arrow-left" mode="contained" onPress={prevStep}>
              Back
            </Button>

            <Button
              icon="arrow-right"
              mode="contained"
              onPress={nextStep}
              contentStyle={{ flexDirection: "row-reverse" }}
            >
              Next
            </Button>
          </View>
        </View>
      </FormContainer>
    );
  }
}
