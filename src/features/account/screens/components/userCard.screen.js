import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import Styled from "styled-components/native";
import { Button } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import { Text } from "../../../../components/Typography/text.component";
import { Flex, Flexrow } from "../../../../components/spacer/flexrow.component";
import { Spacer } from "../../../../components/spacer/spacer.component";

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

export const UserCard = ({ router, navigation, user }) => {
  //const { meal } = route.params;
  const { colors } = useTheme();

  //   useEffect(() => {
  //     console.log(user);
  //     // onLogin(email, password);
  //   }, [user]);

  return (
    <>
      <View>
        <Flexrow>
          <Image
            style={{ width: 50, height: 50, borderRadius: 100 }}
            size={42}
            source={{
              uri: `http://127.0.0.1:8000/storage/${user.image}`,
            }}
          />
          <Spacer size="small" position="left"></Spacer>
          <Spacer size="large" position="left"></Spacer>

          <View
            style={{
              justifyContent: "center", //Centered vertically
            }}
          >
            <Text variant="h4" style={{ marginBottom: 8 }}>
              {user.first_name}
              {user.last_name}
            </Text>
            <Text style={{ width: 240 }}>{user.bio}</Text>
          </View>
        </Flexrow>
      </View>
    </>
  );
};
