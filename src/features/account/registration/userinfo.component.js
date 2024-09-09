import React, { useContext, Component } from "react";
import { View, StyleSheet } from "react-native";
import Styled from "styled-components/native";
import { SafeArea } from "../../../components/Utils/Safe-area.component";
import { Text } from "../../../components/Typography/text.component";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
//import { AuthenticationContext } from "../../../service/authentication/authentication.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useTheme } from "react-native-paper";
import { Allergysearch } from "./components/allergySearch.component";
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
});
//import { AddIngredientProvider } from "../../restaurants/addIngredient.context";
import { AllergiesSearchContextProvider } from "../../restaurants/allergiesSearch.context";
import { FileUploads } from "./components/FileUploads";
//import { NutritionlItemsContextProvider } from "../../restaurants/nutrition.context";

const SectionWrapper = Styled.View`
paddingBottom: ${(props) => props.theme.space[4]};
backgroundColor: ${(props) => props.theme.colors.dark};
padding: ${(props) => props.theme.space[4]};
`;

export class Userinfo extends Component {
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

  //const { meal } = route.params;
  // const { colors } = useTheme();
  render() {
    const { values, colors, handleChange, uploadInfo } = this.props;
    return (
      <>
        <SafeArea
          style={{ color: colors.light, backgroundColor: colors.bg.dark }}
        >
          <SectionWrapper style={styles.wrapper}>
            <Spacer position="top" size="large" />
            <Text
              variant="h1"
              style={{ color: colors.light, textAlign: "center" }}
            >
              Your Information
            </Text>
            <FileUploads FileArray={this.addFileArray} />
            <Spacer position="top" size="medium" />

            {/* <Button
              icon="account"
              mode="contained"
              onPress={() => navigation.navigate("Login")}
            >
              Create an Account
            </Button> */}
            <View
              style={{
                width: "100%",
                zIndex: "90",
                flexDirection: "column",
                justifyContent: "end",
              }}
            >
              <TextInput
                //onChangeText={handleChange("name")}
                //defaultValue={values.name}
                onChangeText={handleChange("bio")}
                defaultValue={values.bio}
                style={
                  ([styles.formfield, styles.textArea],
                  {
                    backgroundColor: colors.bg.dark,
                    borderColor: colors.light,
                    color: colors.light,
                  })
                }
                outlineColor={colors.light}
                textColor={colors.light}
                theme={{
                  colors: {
                    onSurfaceVariant: colors.light,
                  },
                }}
                multiline={true}
                mode="outlined"
                label="Description"
                name="bio"
                id="bio"
              />
              <Spacer position="top" size="large" />
              <Spacer position="top" size="large" />

              <Button
                buttonColor={colors.primary}
                // disabled={values.ingredients.length === 0 ? true : false}
                icon="arrow-right"
                mode="contained"
                onPress={uploadInfo}
                contentStyle={{ flexDirection: "row-reverse" }}
              >
                Add information
              </Button>
            </View>
          </SectionWrapper>
        </SafeArea>
      </>
    );
  }
}
