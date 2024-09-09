import React, { useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { MealsContextProvider } from "./src/features/restaurants/meals.context";
import { AllergiesContextProvider } from "./src/features/restaurants/allergies.context";
import { NutritionlItemsContextProvider } from "./src/features/restaurants/nutrition.context";
import { MealPlanContextProvider } from "./src/features/Business/mealplan.context";
import { DefaultTheme as NavTheme } from "@react-navigation/native";
import { BusinessScreens } from "./src/infastructure/navigation/app.navigator";
//import { DetailsContextProvider } from "./src/features/restaurants/details.context";
import {
  useFonts as useOswald,
  Oswald_400Regular,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import {
  useFonts as useMontserrat,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import {
  useFonts as useLato,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";

import { papertheme, theme } from "./src/infastructure/theme";
import { Navigation } from "./src/infastructure/navigation";
import { DetailsContextProvider } from "./src/features/restaurants/details.context";
import { UnitItemsContextProvider } from "./src/features/restaurants/units.context";
import {
  DefaultTheme,
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useTheme } from "react-native-paper";
import { AuthenticationContextProvider } from "./src/service/authentication/authentication.context";
import { KeyboardHeight } from "./src/components/spacer/keyboardHeight.component";

export default function App() {
  const [dark, setDark] = useState(false);

  const [OswaldLoaded] = useOswald({
    Oswald_400Regular,
    Oswald_700Bold,
  });

  const [MontserratLoaded] = useMontserrat({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });

  const [LatoLoaded] = useLato({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!OswaldLoaded || !LatoLoaded || !MontserratLoaded) {
    return null;
  }
  // const NavigationTheme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     background: useTheme,
  //   },
  // };

  // const papertheme = {
  //   ...MD3LightTheme,
  //   myOwnProperty: true,
  //   colors: {
  //     ...MD3LightTheme.colors,
  //     brand: {
  //       primary: "#2182BD",
  //       secondary: "#5282BD",
  //       muted: "#C6DAF7",
  //     },
  //     ui: {
  //       primary: "#262626",
  //       secondary: "#757575",
  //       tertiary: "#F1F1F1",
  //       quaternary: "#FFFFFF",
  //       disabled: "#DEDEDE",
  //       error: "#D0421B",
  //       success: "#138000",
  //     },
  //     bg: {
  //       primary: "#fb8500",
  //       darkPrimary: "#EB8802",
  //       secondary: "#8ecae6",
  //       bgTwo: "#F1F1F1",
  //       bgOne: "#ffffff",
  //       info: "#F1F3F9",
  //       darkInfo: "#444460",
  //       infoLight: "#EAECF7",
  //       dark: "#232336",
  //       light: "#EDF0F4",
  //       textLight: "#D7DCF8",
  //       background: "#ffffff",
  //       success: "#319D46",
  //       text: "#444460",
  //     },
  //     dark: "#232336",
  //     // fonts: {
  //     //   // text: `${paperColors.success}`,
  //     //   // primary: "#262626",
  //     //   // secondary: "#757575",
  //     //   // disabled: "#9C9C9C",
  //     //   // inverse: "#FFFFFF",
  //     //   // error: "#D0421B",
  //     //   // success: "#138000",
  //     // },

  //     primaryContainer: "#ffffff",
  //     secondary: "#00FF00",
  //     secondaryContainer: "#000",

  //     error: "#F03C1C",
  //     white: "#ffffff",

  //     teal: "#27B5BA",
  //     primary: "#fb8500",
  //     darkPrimary: "#EB8802",

  //     bgTwo: "#F1F1F1",
  //     bgOne: "#ffffff",
  //     info: "#F1F3F9",
  //     darkInfo: "#444460",
  //     infoLight: "#EAECF7",
  //     light: "#EDF0F4",
  //     textLight: "#D7DCF8",
  //     background: "#ffffff",
  //     success: "#319D46",
  //     text: "#444460",
  //     // tertiary: "#800080",
  //     // tertiaryContainer: "#FFA500",
  //     surface: "#444460",
  //     // surfaceVariant: "#008080",
  //     // surfaceDisabled: "#808080",
  //     // background: "#FFFFFF",
  //     // error: "#A52A2A",
  //     // errorContainer: "#808080",
  //     // onPrimary: "#00FFFF",
  //     // onPrimaryContainer: "#FFFFFF",
  //     // onSecondary: "#00FF00",
  //     // onSecondaryContainer: "#808000",
  //     // onTertiary: "#800000",
  //     // onTertiaryContainer: "#000080",
  //     onSurface: "#444460",
  //     // onSurfaceVariant: "#FFD700",
  //     // onSurfaceDisabled: "#808080",
  //     // onError: "#4B0082",
  //     // onErrorContainer: "#FF7F50",
  //     // onBackground: "#F5F5DC",
  //     // outline: "#CD853F",
  //     // outlineVariant: "#708090",
  //     // inverseSurface: "#7FFFD4",
  //     // inverseOnSurface: "#BDB76B",
  //     // inversePrimary: "#DA70D6",
  //     // shadow: "#E6E6FA",
  //     // scrim: "#D8BFD8",
  //     // backdrop: "#808080",
  //   },
  // };

  const paperDarktheme = {
    ...MD3DarkTheme,
    myOwnProperty: true,
    colors: {
      ...MD3DarkTheme.colors,
      bg: {
        primary: "#fb8500",
        darkPrimary: "#EB8802",
        secondary: "#8ecae6",
        bgTwo: "#F1F1F1",
        bgOne: "#ffffff",
        info: "#F1F3F9",
        darkInfo: "#444460",
        infoLight: "#EAECF7",
        dark: "#232336",
        light: "#EDF0F4",
        textLight: "#D7DCF8",
        background: "#ffffff",
        success: "#319D46",
        text: "#444460",
      },
      dark: "#232336",
      // primary: theme.colors.bg.darkPrimary,
      // primaryContainer: theme.colors.bg.dark,
      // secondary: "#00FF00",
      // secondaryContainer: "#000",
      // info: theme.colors.bg.darkInfo,
      // error: "#F03C1C",
      // white: "#ffffff",
      // light: theme.colors.bg.light,
      // dark: theme.colors.bg.dark,
      // success: theme.colors.bg.success,
      // background: theme.colors.bg.dark,
      // text: theme.colors.bg.textLight,
      // inactiveTintColor: theme.colors.bg.dark,
      // // inactiveTintColor: theme.colors.bg.light,
      // // tertiary: "#800080",
      // // tertiaryContainer: "#FFA500",
      // surface: theme.colors.bg.info,
      // // surfaceVariant: theme.colors.bg.light,
      // // surfaceDisabled: "#808080",
      // // background: "#FFFFFF",
      // // error: "#A52A2A",
      // // errorContainer: "#808080",
      // // onPrimary: "#00FFFF",
      // // onPrimaryContainer: "#FFFFFF",
      // // onSecondary: "#00FF00",
      // // onSecondaryContainer: "#808000",
      // // onTertiary: "#800000",
      // // onTertiaryContainer: "#000080",
      // onSurface: theme.colors.bg.infoLight,
      // // onSurfaceVariant: "#FFD700",
      // // onSurfaceDisabled: "#808080",
      // // onError: "#4B0082",
      // // onErrorContainer: "#FF7F50",
      // // onBackground: "#F5F5DC",
      // // outline: "#CD853F",
      // // outlineVariant: "#708090",
      // // inverseSurface: "#7FFFD4",
      // // inverseOnSurface: "#BDB76B",
      // // inversePrimary: "#DA70D6",
      // // shadow: "#E6E6FA",
      // // scrim: "#D8BFD8",
      // // backdrop: "#808080",
    },
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <PaperProvider theme={dark ? paperDarktheme : papertheme}>
          <AuthenticationContextProvider>
            <ExpoStatusBar style="auto" />
            <MealsContextProvider>
              <MealPlanContextProvider>
                <AllergiesContextProvider>
                  <DetailsContextProvider>
                    <NutritionlItemsContextProvider>
                      <UnitItemsContextProvider>
                        <Navigation />
                      </UnitItemsContextProvider>
                    </NutritionlItemsContextProvider>
                  </DetailsContextProvider>
                </AllergiesContextProvider>
              </MealPlanContextProvider>
            </MealsContextProvider>
          </AuthenticationContextProvider>
        </PaperProvider>
      </ThemeProvider>
    </>
  );
}
