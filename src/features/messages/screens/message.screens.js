import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
//import { Card } from "react-native-paper";
//import Styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/Typography/text.component";

export const MapScreen = () => {
  return (
    <>
      <Spacer position="bottom" size="large">
        <Text>Maps</Text>
      </Spacer>
    </>
  );
};
