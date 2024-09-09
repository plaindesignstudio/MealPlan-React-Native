import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import Styled from "styled-components/native";
import { SafeArea } from "../../../components/Utils/Safe-area.component";
import { Text } from "../../../components/Typography/text.component";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { AuthenticationContext } from "../../../service/authentication/authentication.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useTheme } from "react-native-paper";
import { FormContoller } from "../registration/FormContoller.component";

export const RegistrationScreen = ({ route, navigation }) => {
  //const { meal } = route.params;
  const { colors } = useTheme();
  return (
    <>
      <FormContoller colors={colors} navigation={navigation} />
    </>
  );
};
