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
//import { NutritionlItemsContextProvider } from "../../restaurants/nutrition.context";

const SectionWrapper = Styled.View`
paddingBottom: ${(props) => props.theme.space[4]};
backgroundColor: ${(props) => props.theme.colors.dark};
padding: ${(props) => props.theme.space[4]};
`;

export class Userallergies extends Component {
  //const { meal } = route.params;
  // const { colors } = useTheme();

  render() {
    const { values, colors, addAllergies, submitAllergies } = this.props;

    const addListAllergies = (allergy_list) => {
      //console.log(allergy_list);
      addAllergies(allergy_list);
    };

    return (
      <>
        <SafeArea
          style={{ color: colors.light, backgroundColor: colors.bg.dark }}
        >
          <SectionWrapper style={styles.wrapper}>
            <Spacer position="top" size="large" />
            <Text variant="h1" style={{ color: colors.light }}>
              Your Allergies
            </Text>
            {/* <AllergiesSearchContextProvider> */}
            <AllergiesSearchContextProvider>
              <Allergysearch updateNutrients={addListAllergies} />
            </AllergiesSearchContextProvider>
            {/* </AllergiesSearchContextProvider> */}

            <Spacer position="top" size="large" />
            <Spacer position="top" size="large" />
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
              <Button
                buttonColor={colors.primary}
                // disabled={values.ingredients.length === 0 ? true : false}
                icon="arrow-right"
                mode="contained"
                onPress={submitAllergies}
                contentStyle={{ flexDirection: "row-reverse" }}
              >
                Add allergies
              </Button>
            </View>
          </SectionWrapper>
        </SafeArea>
      </>
    );
  }
}
