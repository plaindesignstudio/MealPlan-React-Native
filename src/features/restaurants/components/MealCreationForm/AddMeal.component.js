import React, { useState, useContext, useEffect, Component } from "react";
import Styled from "styled-components/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { FileUploads } from "./FormComponents/FileUploads";
import { CleanTime } from "./FormComponents/cleanTime.component";
import { KeyboardHeight } from "../../../../components/spacer/keyboardHeight.component";

const FormContainer = Styled.View`
padding: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.background};
height: 100%;
`;

const styles = StyleSheet.create({
  formfield: {
    marginBottom: 16,
  },
  textArea: {},
  formfieldWidth: {
    flexGrow: 1,
  },
});

const MainTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.h5};
fontWeight: bold;
textAlign: left;
marginBottom: 16;
`;
export class AddMeal extends Component {
  // continue = (e) => {
  //   e.preventDefault();
  //   this.props.nextStep();
  // };

  // cookingTime = (e) => {
  //   console.log("cooking: " + e);
  // };

  addFileArray = (file) => {
    this.props.addFile(file);
  };

  removeFile = (index) => {
    const { fileArray } = this.state;
    console.log(fileArray[index].name);
    if (index !== -1) {
      fileArray.splice(index, 1);
      this.setState({ fileArray: fileArray });
    }
    this.props.addFile(fileArray);
  };

  formChange = (name) => (value) => {};

  render() {
    const { values, handleChange, nextStep } = this.props;
    console.log("prep:" + values.prep_time);
    console.log("cook:" + values.cook_time);
    return (
      <>
        <FormContainer>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                gap: 12,
                justifyContent: "space-between",
              }}
            >
              <MainTitle>Meal details</MainTitle>
              <Text>{values.step}/4</Text>
            </View>
            <View>
              <TextInput
                onChangeText={handleChange("name")}
                defaultValue={values.name}
                style={[styles.formfield, styles.textArea]}
                mode="outlined"
                label="Name"
                name="name"
                id="name"
              />
              <TextInput
                multiline={true}
                onChangeText={handleChange("description")}
                defaultValue={values.description}
                style={[styles.formfield, styles.textArea]}
                mode="outlined"
                label="Description"
                id="description"
                name="description"
              />

              <CleanTime
                handleChange={handleChange("prep_time")}
                defaultValue={values.prep_time}
                time={values.prep_time}
                label="Prep time"
                input_id="prep_time"
                name="prep_time"
              />
              <CleanTime
                handleChange={handleChange("cook_time")}
                defaultValue={values.cook_time}
                time={values.cook_time}
                label="Cooking time"
                input_id="cook_time"
                name="cook_time"
              />

              {/* <FileUploads FileArray={this.addFileArray} /> */}
              <View
                style={{
                  zIndex: "90",
                  flexDirection: "row-reverse",
                }}
              >
                <Button
                  disabled={values.name.length === 0 ? true : false}
                  icon="arrow-right"
                  mode="contained"
                  onPress={nextStep}
                  contentStyle={{ flexDirection: "row-reverse" }}
                >
                  Next
                </Button>
              </View>
            </View>
          </ScrollView>
          <KeyboardHeight />
        </FormContainer>
      </>
    );
  }
}
