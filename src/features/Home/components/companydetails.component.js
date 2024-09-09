import React, { useContext, Component } from "react";
import { View, StyleSheet } from "react-native";
import Styled from "styled-components/native";
import { SafeArea } from "../../../components/Utils/Safe-area.component";
import { Text } from "../../../components/Typography/text.component";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { AuthenticationContext } from "../../../service/authentication/authentication.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useTheme } from "react-native-paper";
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
});

const SectionWrapper = Styled.View`
paddingBottom: ${(props) => props.theme.space[4]};
backgroundColor: ${(props) => props.theme.colors.dark};
padding: ${(props) => props.theme.space[4]};
`;

export class Companydetails extends Component {
  //const { meal } = route.params;
  // const { colors } = useTheme();
  render() {
    const { values, handleChange, nextStep, submit } = this.props;
    return (
      <>
        <SafeArea
        // style={{ color: colors.light, backgroundColor: colors.bg.dark }}
        >
          <SectionWrapper style={styles.wrapper}>
            <Text variant="h1">Company details</Text>
            <TextInput
              onChangeText={handleChange("name")}
              defaultValue={values.name}
              mode="outlined"
              label="Company name"
              name="name"
              id="name"
            />
            <Spacer position="top" size="large" />
            <TextInput
              onChangeText={handleChange("description")}
              defaultValue={values.description}
              mode="outlined"
              label="Short description"
              name="description"
              id="description"
            />
            <Spacer position="top" size="large" />
            <TextInput
              onChangeText={handleChange("email")}
              defaultValue={values.email}
              keyboardType="email-address"
              mode="outlined"
              label="Company email"
              name="email"
              id="email"
            />
            <Spacer position="top" size="large" />
            <TextInput
              onChangeText={handleChange("phone")}
              defaultValue={values.phone}
              mode="outlined"
              label="phone"
              name="password"
              id="password"
            />

            <Spacer position="top" size="large" />
            <Spacer position="top" size="large" />
            {/* <Button
              icon="account"
              mode="contained"
              onPress={() => navigation.navigate("Login")}
            >
              Create an Account
            </Button> */}

            <View
              style={{
                zIndex: "90",
                flexDirection: "row",
                justifyContent: "end",
              }}
            >
              <Button
                // buttonColor={colors.primary}
                // disabled={values.ingredients.length === 0 ? true : false}
                icon="arrow-right"
                mode="contained"
                onPress={submit}
                contentStyle={{ flexDirection: "row-reverse" }}
              >
                Create account
              </Button>
            </View>
          </SectionWrapper>
        </SafeArea>
      </>
    );
  }
}
