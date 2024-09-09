import React, { useState, useContext } from "react";
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
import { RestaurantsScreen } from "../../restaurants/screens/restaurants.screens";
import { colors } from "../../../infastructure/theme/colors";
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
export const BusinessPortal = (props) => {
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
  const { user } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  return (
    <SectionWrapper>
      <View
        style={{
          justifyContent: "center", //Centered vertically
        }}
      >
        <View
          style={{
            justifyContent: "center", //Centered vertically
          }}
        >
          {user.companies ? (
            <View
              style={{
                backgroundColor: colors.light,
                paddingHorizontal: 22,
                paddingVertical: 16,
                borderRadius: 12,
              }}
            >
              <Text variant="h2">{user.companies.name}</Text>
              <Text>{user.companies.description}</Text>
              <Button
                mode="contained"
                onPress={() => navigation.navigate("BusinessHome")}
              >
                Manage business Section
              </Button>
            </View>
          ) : (
            <Button
              title="Go to Home"
              onPress={() => navigation.navigate("BusinessFromCreation")}
            >
              Create business page
            </Button>
          )}
        </View>
      </View>
    </SectionWrapper>
  );
};
