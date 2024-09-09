import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
//import { Card } from "react-native-paper";
//import Styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/Typography/text.component";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import starGrey from "../../../../assets/starGrey";
import heart from "../../../../assets/heart";
import heartGrey from "../../../../assets/heartGrey";
import open from "../../../../assets/open";
import {
  Info,
  RestaurantCard,
  RestaurantCardCover,
  Rating,
  FlexSpaceBetween,
  Open,
} from "./restaurant-info-card.styles";
import { FavoritesButton } from "../../../components/favoritesButton";

export const RestaurantsInfoCard = ({ meals = {}, displayRatings }) => {
  const { id, name, image, rating, favoritesBoolCount } = meals;
  console.log(displayRatings);
  const ratingArray = Array.from(new Array(Math.floor(rating)));
  const leftRatingArray = Array.from(new Array(Math.floor(5 - rating)));
  // console.log(favorites_bool_count);
  return (
    <>
      <Spacer position="bottom" size="large">
        <RestaurantCard style={{ color: "white" }} mode={"elevation: 3"}>
          <RestaurantCardCover
            borderRadius={25}
            source={{
              uri: `http://127.0.0.1:8000/storage/${image}`,
            }}
          />
          <Info>
            <FlexSpaceBetween>
              <Text variant="h4" style={{ marginBottom: 0 }}>
                {name}
              </Text>
              <FavoritesButton
                favoritesBoolCount={favoritesBoolCount}
                meal={id}
              />
              {/* {favoritesBoolCount > 0 ? (
                <Pressable onPress={() => console.log("heart")}>
                  <SvgXml xml={heart} width="30" height="30" />
                </Pressable>
              ) : (
                <Pressable onPress={() => console.log("heart")}>
                  <SvgXml xml={heartGrey} width="30" height="30" />
                </Pressable>
              )} */}
            </FlexSpaceBetween>
            {displayRatings !== false && (
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
                <Text> | 300 kcla</Text>
              </Rating>
            )}
          </Info>
        </RestaurantCard>
      </Spacer>
    </>
  );
};
