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

export class PaymentCompany extends Component {
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
            <Text variant="h1">Payment details</Text>
            <TextInput
              onChangeText={handleChange("company_id")}
              defaultValue={values.company_id}
              mode="outlined"
              label="Company name"
              name="name"
              id="name"
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
