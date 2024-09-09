import React, { useState, useContext, useEffect, Component } from "react";
import Styled from "styled-components/native";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../../components/Typography/text.component";
import {
  TextInput,
  Chip,
  ActivityIndicator,
  MD2Colors,
  FAB,
  Divider,
} from "react-native-paper";
import { Button } from "react-native-paper";
import { DetailsContext } from "../../details.context";
import { useTheme } from "react-native-paper";
import { center } from "../../../../infastructure/theme/spacing";
// const DetailsContextProvider = Styled.View`
// padding: ${(props) => props.theme.space[2]};
// backgroundColor: ${(props) => props.theme.colors.bg.backgroundOne};
// minHeight: 100%;
// `;

const Loading = Styled(ActivityIndicator)`
  margin-left: -25;
`;

const LoadingContainer = Styled.View`
position: absolute;
top: 50%;
left: 50%;`;

const ImageWrapper = Styled.View`
padding: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.bgOne};
height: 25%;
`;

const SectionWrapper = Styled.View`
paddingBottom: ${(props) => props.theme.space[4]};
padding: ${(props) => props.theme.space[2]};
`;

const styles = StyleSheet.create({
  formfield: {
    marginBottom: 16,
  },
  textArea: {},
});

const MainTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.h4};
fontWeight: bold;
marginBottom: 16;
`;

const SubTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.h5};
fontWeight: 800;
marginBottom: 8;
`;

export const Cookingsteps = ({ meal }) => {
  //const { id, ingredients, meal_steps } = meal;
  const [mealData, setMealData] = useState(null);
  const { details, isLoading, error, detailsFunction } =
    useContext(DetailsContext);

  const { colors } = useTheme();
  //console.log(details.data.cookingsteps);
  // useEffect(() => {
  //   detailsFunction(id);
  //   console.log(details);
  // });

  function displayIngredients(meal_steps) {
    var ingredientList = [];
    if (meal_steps) {
      for (let i = 0; i < meal_steps.length; i++) {
        ingredientList.push(
          <>
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                justifyContent: "space-start",
                alignItems: "top",
              }}
            >
              <View
                style={{
                  backgroundColor: colors.teal,
                  color: colors.content,
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                }}
              >
                <Text
                  variant="h4"
                  style={{ color: colors.light, marginBottom: 0 }}
                >
                  {meal_steps[i].order}
                </Text>
              </View>
              <View
                key={i}
                style={{ width: "auto", marginTop: 6, marginBottom: 22 }}
              >
                <Text variant="h5" style={{ width: "auto" }}>
                  {meal_steps[i].title}
                </Text>
                <Text style={{ width: "auto", margin: 0 }}>
                  {meal_steps[i].description}
                </Text>
              </View>
              <Divider style={{ width: "auto", marginBottom: 16 }} />
            </View>
          </>
        );
      }
    }
    return ingredientList;
  }

  return (
    <>
      {details && (
        <>
          <SectionWrapper>
            <Text variant="h2">How to...</Text>
            <SectionWrapper></SectionWrapper>
            {displayIngredients(details.data.cookingsteps)}
          </SectionWrapper>
        </>
      )}
    </>
  );
};
