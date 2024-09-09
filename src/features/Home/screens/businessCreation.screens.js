import React, { useState, useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Styled from "styled-components/native";
import { Flexrow } from "../../../components/spacer/flexrow.component";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

//import CheckoutForm from "./CheckoutForm";
import {
  SectionWrapper,
  Spacer,
} from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/Typography/text.component";
import { AuthenticationContext } from "../../../service/authentication/authentication.context";
import { RestaurantsScreen } from "../../restaurants/screens/restaurants.screens";
import { FormContoller } from "../components/FormContoller.component";
//import ApiManager from "./axiosManager";

const FormWrapper = Styled(View).attrs({})`
paddingTop: 50%;
paddingBottom: ${(props) => props.theme.space[2]};
paddingLeft: ${(props) => props.theme.space[2]};
paddingRight: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.background};`;

// const stripePromise = loadStripe(
//   `pk_test_51NJuT4EyCPQFGb9955g9rq75H12WyG3NOn8tBhUxsOXRwEyveIQcQjEfMbuAZTxotbN9mEdOv8p6KQRuFXodVWxT00tauYOvvb`
// );

//sk_test_51NJuT4EyCPQFGb99aIdw8rhaY5N0GxXBCJDLJsmwnV9jxsia1r75WRBQi9FFsUVHAbI3ni7fQvkHA5LVgImiuoRY00EyXJc04v
export const BusinessCreation = (props) => {
  // const resultsTransform = (results) => {
  //     console.log("yes");
  //     const mappedResults = results.data.map((data) => {
  //       return { ...data };
  //     });
  //     const newResult = camelize(mappedResults);
  //     return newResult;
  //   };

  // return (
  //   <Elements stripe={stripePromise} options={options}>
  //     <CheckoutForm {...props} />
  //   </Elements>
  // );
  const { user, token } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const { colors } = useTheme();
  console.log(token.token);
  return <FormContoller user={user} colors={colors} navigation={navigation} />;
};
