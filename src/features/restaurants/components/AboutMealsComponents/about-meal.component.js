import React, { useState, useContext, useEffect, Component } from "react";
import Styled from "styled-components/native";
import { View, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { Text } from "../../../../components/Typography/text.component";
import {
  TextInput,
  Chip,
  ActivityIndicator,
  MD2Colors,
  FAB,
  ProgressBar,
} from "react-native-paper";
import { Button } from "react-native-paper";
import { DetailsContext } from "../../details.context";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../../../components/services/axiosGetRequest";
import {
  Info,
  RestaurantCard,
  RestaurantCardCover,
  Rating,
  FlexSpaceBetween,
  Open,
} from "../../components/restaurant-info-card.styles";
import { useTheme } from "react-native-paper";

import { SvgXml } from "react-native-svg";
import star from "../../../../../assets/star";
import starGrey from "../../../../../assets/starGrey";
import heart from "../../../../../assets/heart";
import prep from "../../../../../assets/prep";
import cook from "../../../../../assets/cook";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { NutritionalData } from "./detailsComponents/nutrition.component";

import { useNavigation } from "@react-navigation/native";
import { FormatSeconds } from "../../../../components/formatSeconds";
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

const ImageContainer = Styled.View`
height: 0px;
position: 'fixed',
top: 0,
left: 0,
right: 0,
bottom: 0,
`;

const ImageWrapper = Styled.Image`
padding: ${(props) => props.theme.space[2]};
height: 420px;
width: 100%;
position: fixed;
`;

const SectionWrapper = Styled.View`
paddingBottom: ${(props) => props.theme.space[4]};
padding: ${(props) => props.theme.space[2]};
`;

export const AboutMeal = ({ meal, meal_ingredients, deleteMeal }) => {
  const { colors } = useTheme();
  const { id } = meal;
  const [ingredients, setIngredients] = useState([]);
  const [allergies, setAllergies] = useState(null);
  const { details, isLoading, error, detailsFunction } =
    useContext(DetailsContext);
  const navigation = useNavigation();
  useEffect(() => {
    detailsFunction(id);
  }, [id]);

  // function startDeleteMeal(id) {
  //   deleteMeal(id);
  // }
  function deleteMeal(id) {
    axiosGetRequest(`/api/meals/${id}`, null, "DELETE");
    // navigation.navigate("Meals");
  }

  function findAllergies(data) {
    var allergies = [];

    if (data) {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          var allergy = data[i].ingredients.allergies;
          if (allergy) {
            for (let n = 0; n < allergy.length; n++) {
              setAllergies(allergy[n].name);
            }
          }
        }
      }
    }
    return allergies;
  }

  const ratingArray = Array.from(new Array(Math.floor(meal.rating)));
  const leftRatingArray = Array.from(new Array(Math.floor(5 - meal.rating)));

  return (
    <>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD2Colors.red300} />
        </LoadingContainer>
      )}

      {details && (
        <>
          <ImageContainer>
            <ImageWrapper
              source={{
                uri: `http://127.0.0.1:8000/storage/${details.data.image}`,
              }}
            ></ImageWrapper>
          </ImageContainer>
          <ScrollView
            contentContainerStyle={{
              position: "relative",
              paddingTop: 340,
              paddingBottom: 70,
              zIndex: 1,
              //backgroundColor: `${colors.background}`,
            }}
          >
            <View
              style={{
                backgroundColor: `${colors.background}`,
              }}
            >
              <SectionWrapper
                style={{
                  color: `${colors.text}`,
                }}
              >
                <Spacer position="top" size="small" />

                <FlexSpaceBetween>
                  <Text variant="displayLarge" style={{ marginBottom: 8 }}>
                    {details.data.name}
                  </Text>
                  <Pressable
                    style={{ marginBottom: 2 }}
                    onPress={() => console.log("heart")}
                  >
                    <SvgXml xml={heart} width="30" height="30" />
                  </Pressable>
                </FlexSpaceBetween>
                <Rating>
                  {ratingArray.map((_, i) => (
                    <SvgXml
                      key={`star-${id}-${i}`}
                      xml={star}
                      width="20"
                      height="20"
                    />
                  ))}
                  {leftRatingArray.map((_, i) => (
                    <SvgXml
                      key={`star-${id}-${i}`}
                      xml={starGrey}
                      width="20"
                      height="20"
                    />
                  ))}
                </Rating>
                <Spacer position="top" size="medium" />
                <Text variant="body" style={{ color: `${colors.text}` }}>
                  {details.data.description}
                </Text>
              </SectionWrapper>
              <SectionWrapper>
                <Spacer position="top" size="medium" />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                  }}
                >
                  <Rating
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Pressable
                      style={{ marginBottom: 4, marginRight: 12 }}
                      onPress={() => console.log("prep")}
                    >
                      <SvgXml xml={prep} width="30" height="30" />
                    </Pressable>
                    <Text
                      variant="label"
                      style={{ marginBottom: 0, alignContent: "center" }}
                    >
                      Prep: <FormatSeconds time={details.data.prep_time} />
                    </Text>
                  </Rating>
                  <Spacer position="left" size="large" />
                  <Spacer position="left" size="large" />
                  <Rating style={{ display: "flex", alignItems: "center" }}>
                    <Pressable
                      style={{ marginBottom: 4, marginRight: 12 }}
                      onPress={() => console.log("prep")}
                    >
                      <SvgXml xml={cook} width="30" height="30" />
                    </Pressable>
                    <Text
                      variant="label"
                      style={{ marginBottom: 0, alignContent: "center" }}
                    >
                      Cook: <FormatSeconds time={details.data.cook_time} />
                    </Text>
                  </Rating>
                </View>
              </SectionWrapper>

              {allergies ? (
                <SectionWrapper>
                  <Text variant="h5">Allergy warning</Text>
                  <Spacer position="top" size="medium" />
                  <View style={{ flexDirection: "row" }}>
                    <Chip
                      icon="information"
                      mode={"outlined"}
                      textColor={colors.error}
                      iconColor={colors.error}
                      style={{
                        marginRight: 5,
                        marginBottom: 5,
                        borderRadius: 25,
                        backgroundColor: colors.content,
                        borderColor: colors.error,
                        color: colors.error,
                      }}
                    >
                      <Text style={{ color: colors.error }}>
                        Contains: {allergies}
                      </Text>
                    </Chip>
                  </View>
                </SectionWrapper>
              ) : null}
              <Spacer position="top" size="large" />
              {
                <SectionWrapper>
                  <NutritionalData
                    ingredients={details.data.mealingredients}
                    mealCalories={details.data.calories}
                  />
                </SectionWrapper>
              }
              <SectionWrapper>
                <Spacer position="top" size="large" />
                <Button
                  onPress={() => {
                    deleteMeal(details.data.id);
                    navigation.navigate("Meals");
                  }}
                >
                  Remove Meal
                </Button>
              </SectionWrapper>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};
