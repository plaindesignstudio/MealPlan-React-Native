import { colors } from "./colors";
import { space, lineHeights } from "./spacing";
import { sizes } from "./sizes";
import { fonts, fontWeights, fontSizes } from "./fonts";
import {
  DefaultTheme,
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
// import { useTheme } from "react-native-paper";
// import { ThemeProvider } from "styled-components/native";

export const theme = {
  roundness: 2,
  colors,
  space,
  lineHeights,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
};

export const papertheme = {
  ...MD3LightTheme,
  myOwnProperty: true,
  colors,
  // roundness: 2,
  // space,
  // lineHeights,
  // sizes,
  // fonts,
  // fontSizes,
  // fontWeights,
};
