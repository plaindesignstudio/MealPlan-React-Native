import React, { useEffect, useState, useContext } from "react";
// import { PaymentElement } from "@stripe/react-stripe-js";
import { StyleSheet, View } from "react-native";
import {
  usePaymentSheet,
  CardField,
  confirmPayment,
} from "@stripe/stripe-react-native";
import { Button } from "react-native-paper";
import { axiosGetRequest } from "../../../components/services/axiosGetRequest";
import { PaymentIntentContext } from "../payment.context";

export const CheckoutForm = () => {
  const { filterReturn, intentFunction, filters } =
    useContext(PaymentIntentContext);

  const [intentArgs, setIntentArgs] = useState({
    currency: "aus",
    amount: 489,
  });
  //intentFunction(intentArgs);

  //console.log("fsdg" + filterReturn);

  const fetchPaymentIntentClientSecret = async () => {
    //const intentReturn = intentFunction(intentArgs);
    // let intentInfo = intentFunction(intentArgs);
    // setIntentReturn(intentReturn);
    //console.log("yes: " + intentReturn.json);
    // const { paymentIntent, ephemeralKey, customer } =
    //   await fetchPaymentSheetParams();
    // const { error } = await initPaymentSheet({
    //   customerId: customer,
    //   customerEphemeralKeySecret: ephemeralKey,
    //   paymentIntentClientSecret: paymentIntent,
    //   merchantDisplayName: "Example Inc.",
    //   allowsDelayedPaymentMethods: true,
    //   returnURL: null,
    // });

    //const { clientSecret } = intentReturn;
    //console.log(intentReturn);
    //return clientSecret;
    const response = await fetch("http://127.0.0.1:8000/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        currency: "aud",
        amount: 489,
      }),
    });

    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const billingDetails: BillingDetails = {
      email: "jenny.rosen@example.com",
      payment_method: "Card",
    };

    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      // type: "Card",
      billingDetails,
    });

    if (error) {
      console.log("Payment confirmation error", error);
    } else if (paymentIntent) {
      console.log("Success from promise", paymentIntent);
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log("cardDetails", cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
        onCardChange={(cardDetails) => console.log("cardDetails", cardDetails)}
      />
      <Button
        icon="camera"
        mode="contained"
        onPress={handlePayPress}
        title="Pay"
      >
        Press me
      </Button>
    </View>
  );
};

//export default CheckoutForm;
