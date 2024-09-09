import React, { useEffect, useState } from "react";
// import { PaymentElement } from "@stripe/react-stripe-js";
import { StyleSheet, View } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { Button } from "react-native-paper";
import { axiosGetRequest } from "../../../components/services/axiosGetRequest";

export const CheckoutForm = () => {
  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        currency: "aus",
        amount: 345,
      },
    });
    // const response = await axiosGetRequest(
    //   "/api/payment",
    //   {
    //     currency: "aus",
    //     amount: 345,
    //   },
    //   "POST"
    // );

    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const { confirmPayment, loading } = useConfirmPayment();

  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const billingDetails: BillingDetails = {
      email: "jenny.rosen@example.com",
      paymentMethodType: "Card",
    };

    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    console.log("from-laravel " + clientSecret);
    // Confirm the payment with the card details
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
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
