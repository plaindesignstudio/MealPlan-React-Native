import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import Styled from "styled-components/native";
import { Flexrow } from "../../../components/spacer/flexrow.component";
import { useNavigation } from "@react-navigation/native";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

//import CheckoutForm from "./CheckoutForm";
import {
  SectionWrapper,
  Spacer,
} from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/Typography/text.component";
import { AuthenticationContext } from "../../../service/authentication/authentication.context";
import { MealPlanContext } from "../../Business/mealplan.context";
import { RestaurantsScreen } from "../../restaurants/screens/restaurants.screens";
import { colors } from "../../../infastructure/theme/colors";
import { FlatList } from "react-native-gesture-handler";
import { RestaurantsInfoCard } from "../../restaurants/components/restaurant-info-card";
import { UserCard } from "../../account/screens/components/userCard.screen";
import { SafeArea } from "../../../components/Utils/Safe-area.component";
//import ApiManager from "./axiosManager";

const FormWrapper = Styled(View).attrs({})`
paddingTop: 50%;
paddingBottom: ${(props) => props.theme.space[2]};
paddingLeft: ${(props) => props.theme.space[2]};
paddingRight: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.background};`;

export const UsersList = ({ users, route }) => {
  const navigation = useNavigation();

  // const { planDetails, isLoading, error } = useContext(MealPlanContext);

  // useEffect(() => {
  //   console.log(planDetails);
  // }, [planDetails]);

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: colors.light,
              paddingHorizontal: 22,
              paddingVertical: 16,
              borderRadius: 12,
              marginBottom: 16,
            }}
            onPress={() =>
              navigation.navigate("MealDetail", {
                meal: item,
              })
            }
          >
            <UserCard user={item} />
            {/* <RestaurantsInfoCard meals={item} displayRatings={false} /> */}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};
