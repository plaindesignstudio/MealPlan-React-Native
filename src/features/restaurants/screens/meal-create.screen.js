import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import Styled from "styled-components/native";
import { SafeArea } from "../../../components/Utils/Safe-area.component";
import { Text } from "../../../components/Typography/text.component";
import { FormContoller } from "../components/MealCreationForm/FormContoller.component";

const styles = StyleSheet.create({
  center: {
    minHeight: "90%",
    backgroundColor: "white",
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
  },
  wrapper: {
    width: "100%",
  },
});

export const MealCreateScreen = ({ route, navigation }) => {
  //const { meal } = route.params;

  return (
    <>
      <SafeArea>
        <View style={styles.center}>
          <View style={styles.wrapper}>
            <FormContoller />
          </View>
        </View>
      </SafeArea>
    </>
  );
};
