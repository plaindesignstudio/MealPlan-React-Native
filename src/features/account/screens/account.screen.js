import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Styled from "styled-components/native";
import { SafeArea } from "../../../components/Utils/Safe-area.component";
import { Text } from "../../../components/Typography/text.component";
import { Button } from "react-native-paper";
import { AuthenticationContext } from "../../../service/authentication/authentication.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import mealplanOrange from "../../../../assets/logo/meal-plan-orange";
const styles = StyleSheet.create({
  center: {
    minHeight: "80%",
    // backgroundColor: "white",
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    alignContent: "center",
  },
  wrapper: {
    width: "100%",
  },
});

const SectionWrapper = Styled.View`
paddingBottom: ${(props) => props.theme.space[4]};
padding: ${(props) => props.theme.space[2]};
`;

export const AccountScreen = ({ router, navigation }) => {
  //const { meal } = route.params;
  const { colors } = useTheme();
  const { isAuthenticated, onLogin, user } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("jjs1990creative@gmail.com");
  const [password, setPassword] = useState("Worldsworlds.1");

  //   useEffect(() => {
  //     console.log(user);
  //     // onLogin(email, password);
  //   }, [user]);
  return (
    <>
      <SafeArea
        style={{ color: colors.light, backgroundColor: colors.bg.dark }}
      >
        <View style={styles.center}>
          <SectionWrapper style={styles.wrapper}>
            <View style={styles.center}>
              <SvgXml xml={mealplanOrange} width="100%" height="40%" />
            </View>

            <Spacer position="top" size="large"></Spacer>

            <Spacer position="top" size="large"></Spacer>
            <Spacer position="top" size="medium"></Spacer>
            <Button
              icon="account"
              mode="contained"
              onPress={() => navigation.navigate("Login")}
            >
              Sign in
            </Button>
            <Spacer position="top" size="medium"></Spacer>
            <Button
              mode="Outlined"
              buttonColor="transparent"
              textColor={colors.light}
              onPress={() => navigation.navigate("Registration")}
              // buttonColor={colors.light}
            >
              Create an account
            </Button>
          </SectionWrapper>
        </View>
      </SafeArea>
    </>
  );
};
