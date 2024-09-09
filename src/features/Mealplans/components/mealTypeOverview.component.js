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
import { colors } from "../../../infastructure/theme/colors";
import { FlatList } from "react-native-gesture-handler";
import { MealList } from "./mealList.component";
import { UsersList } from "./usersList.component";
//import ApiManager from "./axiosManager";

const FormWrapper = Styled(View).attrs({})`
paddingTop: 50%;
paddingBottom: ${(props) => props.theme.space[2]};
paddingLeft: ${(props) => props.theme.space[2]};
paddingRight: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.background};`;

export const MealTypeOverview = ({ mealTypesList }) => {
  // const navigation = useNavigation();

  const { planDetails, isLoading, error } = useContext(MealPlanContext);

  // useEffect(() => {
  //   console.log(mealPlanData);
  // }, [mealPlanData]);

  return (
    <>
      {mealTypesList && (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          data={mealTypesList}
          renderItem={(item) => (
            <>
              <SectionWrapper>
                <Text variant="h2">{item.item.name}</Text>
              </SectionWrapper>
              <MealList meals={item.item.meals} />
            </>
          )}
          keyExtractor={(item) => item.id}
        />
        // <UsersList users={planDetails.users} />
      )}
    </>
  );
};
