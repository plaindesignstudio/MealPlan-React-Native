import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
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
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { MealTypeOverview } from "./mealTypeOverview.component";
import { UsersList } from "./usersList.component";
//import ApiManager from "./axiosManager";

const FormWrapper = Styled(View).attrs({})`
paddingTop: 50%;
paddingBottom: ${(props) => props.theme.space[2]};
paddingLeft: ${(props) => props.theme.space[2]};
paddingRight: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.background};`;

export const MealPlanOverview = ({ route, navigation }) => {
  // const navigation = useNavigation();

  const { planDetails, isLoading, error } = useContext(MealPlanContext);

  useEffect(() => {
    // console.log(planDetails);
  }, []);
  return (
    <>
      {planDetails && (
        <>
          <MealTypeOverview mealTypesList={planDetails.mealtype} />
          <SectionWrapper
            style={{
              flex: 1,
            }}
          >
            <Text variant="h4">Users on this plan</Text>
            <UsersList users={planDetails.users} />
          </SectionWrapper>
        </>
      )}
    </>
  );
};
