import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import Styled from "styled-components/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { SafeArea } from "../../../components/Utils/Safe-area.component";
import { Text } from "../../../components/Typography/text.component";
import { DetailsContext } from "../details.context";

const MealTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.h4};
fontWeight: ${(props) => props.theme.fontWeights.bold};
marginBottom: ${(props) => props.theme.space[2]};
`;

const MealDescription = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.body};
fontWeight: ${(props) => props.theme.fontWeights.bold};
`;

const TitlePadding = Styled(View).attrs({})`
paddingTop: 25%;
paddingBottom: ${(props) => props.theme.space[2]};
paddingLeft: ${(props) => props.theme.space[2]};
paddingRight: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.primary};`;

const BodyPadding = Styled(View).attrs({})`
Height: 100%;
paddingBottom: ${(props) => props.theme.space[4]};
paddingLeft: ${(props) => props.theme.space[2]};
paddingRight: ${(props) => props.theme.space[2]};
paddingTop: ${(props) => props.theme.space[4]};
backgroundColor: ${(props) => props.theme.colors.bg.secondary};`;

const Loading = Styled(ActivityIndicator)`
  margin-left: -25;
`;

const LoadingContainer = Styled.View`
position: absolute;
top: 50%;
left: 50%;`;

export const MealsIngredientsScreen = ({ mealId }) => {
  const [mealID, setMealID] = useState(mealId);
  const { details, isLoading, error, detailsFunction } =
    useContext(DetailsContext);

  // const [data, setData] = useState([]);

  useEffect(() => {
    detailsFunction(mealID);
  }, [mealID]);

  return (
    <>
      <SafeArea>
        {details.data && (
          <View>
            <TitlePadding>
              <MealTitle>{details.data.name}</MealTitle>
            </TitlePadding>
            <BodyPadding>
              <MealDescription>{details.data.description}</MealDescription>
            </BodyPadding>
          </View>
        )}
        {isLoading && (
          <LoadingContainer>
            <Loading size={50} animating={true} color={MD2Colors.red300} />
          </LoadingContainer>
        )}
      </SafeArea>
    </>
  );
};
