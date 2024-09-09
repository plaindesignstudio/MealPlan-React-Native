import React, { useState, useContext, useEffect, Component } from "react";
import Styled from "styled-components/native";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Button, Divider } from "react-native-paper";
import { colors } from "../../../../infastructure/theme/colors";
import { Spacer } from "../../../../components/spacer/spacer.component";

const FormContainer = Styled.View`
padding: ${(props) => props.theme.space[2]};
`;

const MainTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.h5};
fontWeight: bold;
textAlign: left;
marginBottom: 16;
`;

const Description = Styled.Text`
fontSize: ${(props) => props.theme.fontSizes.p};
textAlign: left;
marginBottom: 16;
`;
//backgroundColor: ${(props) => props.theme.colors.bg.primary};

const styles = StyleSheet.create({
  formfield: {
    marginBottom: 16,
  },
  textArea: {
    height: 100,
  },
});

export class Confirmation extends Component {
  // continue = (e) => {
  //   e.preventDefault();
  //   this.props.nextStep();
  // };

  submit = async (e) => {
    e.preventDefault();
    //Process Form
    this.props.submitEmail(this.props.values);
  };

  formChange = (name) => (value) => {};

  render() {
    const { values, prevStep, nextStep, submitEmail } = this.props;

    const nextStepFunction = () => {
      //e.preventDefault();
      //Process Form
      this.props.uploadImage(`${this.props.values.files}`);
      //console.log(url);
      //this.props.submitEmail(this.props.values);
    };

    let imageBlock;
    let descriptionBlock;
    let ingredientsBlock;

    if (values.files) {
      imageBlock = (
        <Image
          source={{ uri: values.files }}
          style={{ width: "100%", height: 200, marginBottom: 18 }}
        />
      );
    } else {
      imageBlock = null;
    }

    if (values.description) {
      descriptionBlock = <Description>{values.description}</Description>;
    } else {
      descriptionBlock = null;
    }

    function displayIngredients(ingredients) {
      var ingredientList = [];
      if (ingredients) {
        for (let i = 0; i < ingredients.length; i++) {
          ingredientList.push(
            <>
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ width: "auto", marginBottom: 18 }}>
                  {ingredients[i]["name"]}
                </Text>
                <Text style={{ width: "auto", margin: 5 }}>
                  {ingredients[i].quantity}g
                </Text>
              </View>
            </>
          );
        }
      }
      return ingredientList;
    }

    return (
      <FormContainer>
        <ScrollView>
          <View
            style={{
              zIndex: "90",
              margin: 5,
              justifyContent: "space-between",
              marginBottom: 28,
            }}
          >
            <MainTitle>{values.name}</MainTitle>
            <Text>Cooking time: {values.cook_time}</Text>
            <Text>Prep time: {values.prep_time}</Text>
            <Spacer position="top" size="large"></Spacer>
            <Text>{descriptionBlock}</Text>
            <Spacer position="top" size="large"></Spacer>
            <MainTitle>Ingredients</MainTitle>
            {displayIngredients(values.ingredients)}
          </View>
          <View
            style={{
              zIndex: "90",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              icon="arrow-left"
              mode="contained"
              onPress={prevStep}
              //onPress={backStepFunction}
            >
              Back
            </Button>
            <Button
              buttonColor={colors.light}
              disabled={values.ingredients.length === 0 ? true : false}
              icon="arrow-right"
              mode="contained"
              onPress={this.submit}
              contentStyle={{ flexDirection: "row-reverse" }}
            >
              Save Meal
            </Button>
          </View>
        </ScrollView>
      </FormContainer>
    );
  }
}
