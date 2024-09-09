import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Styled from "styled-components/native";
import { SafeArea } from "../../../components/Utils/Safe-area.component";
import { Text } from "../../../components/Typography/text.component";
import { Button } from "react-native-paper";
import { AuthenticationContext } from "../../../service/authentication/authentication.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TextInput } from "react-native-paper";
import { useTheme, colors } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import mealplanOrange from "../../../../assets/logo/meal-plan-circle-orange";
const styles = StyleSheet.create({
  center: {
    minHeight: "40%",
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
  },
  wrapper: {
    width: "100%",
  },
});

const SectionWrapper = Styled.View`
paddingBottom: ${(props) => props.theme.space[4]};
padding: ${(props) => props.theme.space[2]};
`;
export const LoginScreen = ({ navigation, ...props }) => {
  //const { meal } = route.params;
  const { colors } = useTheme();
  const { isAuthenticated, onLogin, user } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("admin@plaindesignstudio.com");
  const [password, setPassword] = useState("Worldsworlds.1");

  //   useEffect(() => {
  //     console.log(user);
  //     // onLogin(email, password);
  //   }, [user]);
  return (
    <>
      <SafeArea
        style={{ color: colors.light, backgroundColor: colors.bg.background }}
      >
        <View style={styles.center}>
          <SectionWrapper style={styles.wrapper}>
            <Spacer position="top" size="large"></Spacer>
            <Spacer position="top" size="large"></Spacer>
            <View style={styles.center}>
              <SvgXml xml={mealplanOrange} width="100%" height="100%" />
            </View>
            <Spacer position="top" size="small"></Spacer>
            <TextInput
              style={{
                backgroundColor: colors.info,
              }}
              autoCapitalize="none"
              label="Email"
              value={email}
              keyboardType="email-address"
              name="Email"
              mode="outlined"
              onChangeText={(u) => setEmail(u)}
            />
            <Spacer position="top" size="medium"></Spacer>
            <TextInput
              style={{
                backgroundColor: colors.info,
              }}
              value={password}
              textContentType="password"
              label="Password"
              secureTextEntry
              name="Password"
              mode="outlined"
              onChangeText={(u) => setPassword(u)}
            />
            <Spacer position="top" size="large"></Spacer>
            <Spacer position="top" size="medium"></Spacer>
            <Button
              icon="account"
              mode="contained"
              onPress={() => onLogin(email, password)}
            >
              Login
            </Button>
            <Spacer position="top" size="medium"></Spacer>
            <Button
              mode="Outlined"
              onPress={() => navigation.navigate("Registration")}
            >
              Create an Account
            </Button>
          </SectionWrapper>
        </View>
      </SafeArea>
    </>
  );
};
