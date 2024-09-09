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

export class Userdetails extends Component {
  //const { meal } = route.params;
  // const { colors } = useTheme();
  render() {
    const { values, colors, handleChange, submit } = this.props;
    return (
      <>
        <SafeArea
          style={{ color: colors.light, backgroundColor: colors.bg.dark }}
        >
          <SectionWrapper style={styles.wrapper}>
            <Spacer position="top" size="large" />
            <Text variant="h1" style={{ color: colors.light }}>
              Create an account
            </Text>
            <TextInput
              //onChangeText={handleChange("name")}
              //defaultValue={values.name}
              onChangeText={handleChange("first_name")}
              defaultValue={values.first_name}
              style={
                ([styles.formfield, styles.textArea],
                {
                  backgroundColor: colors.bg.dark,
                  borderColor: colors.light,
                  color: colors.light,
                })
              }
              outlineColor={colors.light}
              textColor={colors.light}
              theme={{
                colors: {
                  onSurfaceVariant: colors.light,
                },
              }}
              mode="outlined"
              label="First name"
              name="first_name"
              id="first_name"
            />
            <Spacer position="top" size="medium" />
            <TextInput
              //onChangeText={handleChange("name")}
              //defaultValue={values.name}
              onChangeText={handleChange("last_name")}
              defaultValue={values.last_name}
              style={
                ([styles.formfield, styles.textArea],
                {
                  backgroundColor: colors.bg.dark,
                  borderColor: colors.light,
                  color: colors.light,
                })
              }
              outlineColor={colors.light}
              textColor={colors.light}
              theme={{
                colors: {
                  onSurfaceVariant: colors.light,
                },
              }}
              mode="outlined"
              label="Last name"
              name="last_name"
              id="last_name"
            />
            <Spacer position="top" size="medium" />
            <TextInput
              //onChangeText={handleChange("name")}
              //defaultValue={values.name}
              onChangeText={handleChange("email")}
              defaultValue={values.email}
              style={
                ([styles.formfield, styles.textArea],
                {
                  backgroundColor: colors.bg.dark,
                  borderColor: colors.light,
                  color: colors.light,
                })
              }
              outlineColor={colors.light}
              textColor={colors.light}
              theme={{
                colors: {
                  onSurfaceVariant: colors.light,
                },
              }}
              keyboardType="email-address"
              mode="outlined"
              label="Email"
              name="email"
              id="email"
            />
            <Spacer position="top" size="medium" />
            <TextInput
              //onChangeText={handleChange("name")}
              //defaultValue={values.name}
              onChangeText={handleChange("password")}
              defaultValue={values.password}
              style={
                ([styles.formfield, styles.textArea],
                {
                  backgroundColor: colors.bg.dark,
                  borderColor: colors.light,
                  color: colors.light,
                })
              }
              outlineColor={colors.light}
              textColor={colors.light}
              theme={{
                colors: {
                  onSurfaceVariant: colors.light,
                },
              }}
              secureTextEntry={true}
              mode="outlined"
              label="Password"
              name="password"
              id="password"
            />
            <Spacer position="top" size="medium" />
            <TextInput
              //onChangeText={handleChange("name")}
              //defaultValue={values.name}
              onChangeText={handleChange("password_confirmation")}
              defaultValue={values.password_confirmation}
              style={
                ([styles.formfield, styles.textArea],
                {
                  backgroundColor: colors.bg.dark,
                  borderColor: colors.light,
                  color: colors.light,
                })
              }
              outlineColor={colors.light}
              textColor={colors.light}
              theme={{
                colors: {
                  onSurfaceVariant: colors.light,
                },
              }}
              secureTextEntry={true}
              mode="outlined"
              label="Password confirmation"
              name="password_confirmation"
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
                buttonColor={colors.primary}
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
