import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Styled from "styled-components/native";

import { StripeProvider, CardField } from "@stripe/stripe-react-native";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

//import CheckoutForm from "./CheckoutForm";
import { Text } from "../../../components/Typography/text.component";
import { PaymentElement } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { PaymentIntentContextProvider } from "../payment.context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SectionWrapper } from "../../../components/spacer/spacer.component";

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
export const SettingScreen = (props) => {
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

  return (
    <SectionWrapper>
      <PaymentIntentContextProvider>
        <StripeProvider publishableKey="pk_test_51NJuT4EyCPQFGb9955g9rq75H12WyG3NOn8tBhUxsOXRwEyveIQcQjEfMbuAZTxotbN9mEdOv8p6KQRuFXodVWxT00tauYOvvb">
          <CheckoutForm />
        </StripeProvider>
      </PaymentIntentContextProvider>
    </SectionWrapper>
  );
};
