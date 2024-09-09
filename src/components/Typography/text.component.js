import styled from "styled-components/native";
//import { useTheme as _useTheme } from "react-native-paper";
import { Children } from "react";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.fonts.default};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const displayLarge = (theme) => `
margin-bottom: 20;
font-family: ${theme.fonts.heading};
font-weight: ${theme.fontWeights.semiBold};
color: ${theme.colors.fonts.default};
font-size: 28;
`;

const h1 = (theme) => `
margin-bottom: 16;
font-family: ${theme.fonts.heading};
font-weight: ${theme.fontWeights.semiBold};
font-size: 24;

`;

const h2 = (theme) => `
margin-bottom: 14;
font-family: ${theme.fonts.heading};
font-weight: ${theme.fontWeights.semiBold};
font-size: 22;

`;

const h3 = (theme) => `
margin-bottom: 12;
font-family: ${theme.fonts.heading};
font-weight: ${theme.fontWeights.semiBold};

font-size: 20;

`;

const h4 = (theme) => `
margin-bottom: 10;
font-family: ${theme.fonts.heading};
font-weight: ${theme.fontWeights.semiBold};
font-size: 18;
`;

const h5 = (theme) => `
margin-bottom: 8;
font-family: ${theme.fonts.heading};
font-weight: ${theme.fontWeights.semiBold};
font-size: 16;

`;

const body = (theme) => `
font-family: ${theme.fonts.body};
font-size: 14;
line-height: 18;
`;

const medium_body = (theme) => `
font-family: ${theme.fonts.body};
font-size: 16;
line-height: 18;
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const variants = {
  displayLarge,
  h1,
  h2,
  h3,
  h4,
  h5,
  body,
  label,
  caption,
  error,
  hint,
  medium_body,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
