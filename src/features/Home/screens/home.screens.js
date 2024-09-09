import React, { useState, useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import Styled from "styled-components/native";
import { Flexrow } from "../../../components/spacer/flexrow.component";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

//import CheckoutForm from "./CheckoutForm";
import {
  SectionWrapper,
  Spacer,
} from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/Typography/text.component";
import { ProfileTabs } from "../../../infastructure/navigation/profileTabs.navigator";
import { colors } from "../../../infastructure/theme/colors";
import { AuthenticationContext } from "../../../service/authentication/authentication.context";
import { CreatedMeals } from "./createdmeals.screens";
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
export const HomeScreen = (props) => {
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

  return (
    <>
      <SectionWrapper>
        <Flexrow>
          <Image
            style={{ width: 120, height: 120, borderRadius: 100 }}
            size={42}
            source={{
              uri: `http://127.0.0.1:8000/storage/${user.image}`,
            }}
          />
          <Spacer size="small" position="left"></Spacer>
          <Spacer size="large" position="left"></Spacer>
          <View
            style={{
              justifyContent: "center", //Centered vertically
            }}
          >
            <Text variant="h1" style={{ marginBottom: 8 }}>
              {user.first_name}
              {user.last_name}
            </Text>
            <Text style={{ width: 240 }}>{user.bio}</Text>
          </View>
        </Flexrow>
      </SectionWrapper>
      <View style={{ height: "100%" }}>
        <ProfileTabs />
      </View>
    </>
  );
};
