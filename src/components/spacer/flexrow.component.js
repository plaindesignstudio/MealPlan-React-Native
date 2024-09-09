import React from "react";
import { View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import Styled from "styled-components";

export const Flex = Styled.View`
flex-direction: row;
position: relative;
`;

export const Flexrow = ({ children }) => {
  return <Flex>{children}</Flex>;
};
