import React, { useState, useContext, useEffect, Component } from "react";
import Styled from "styled-components/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { FileUploads } from "./FormComponents/FileUploads";

const FormContainer = Styled.View`
padding: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.background};
height: 100%;
`;

const styles = StyleSheet.create({
  formfield: {
    marginBottom: 16,
  },
  textArea: {
    height: 100,
  },
});

const MainTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.h5};
fontWeight: bold;
textAlign: left;
marginBottom: 16;
`;

export class UploadImage extends Component {
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

  backStepFunction = async () => {
    this.props.removeImage(this.props.values.image);
    this.props.prevStep();
  };

  formChange = (name) => (value) => {};

  render() {
    const { values, prevStep, uploadImage } = this.props;
    return (
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
            <Text>{values.step}/5</Text>
          </View>
          <View>
            <FileUploads FileArray={this.addFileArray} />
            <View
              style={{
                zIndex: "90",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {/* <Button
                icon="arrow-left"
                mode="contained"
                // onPress={prevStep}
                onPress={() => this.props.navigation.navigate("Meals")}
                //onPress={this.backStepFunction}
              >
                Back
              </Button> */}

              <Button
                disabled={values.ingredients.length === 0 ? true : false}
                icon="arrow-right"
                mode="contained"
                onPress={uploadImage}
                contentStyle={{ flexDirection: "row-reverse" }}
              >
                Save image
              </Button>
            </View>
          </View>
        </ScrollView>
      </FormContainer>
    );
  }
}
