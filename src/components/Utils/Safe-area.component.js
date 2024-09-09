import { SafeAreaView, Platform, StatusBar, children } from "react-native";
import Styled from "styled-components/native";
import { useTheme } from "react-native-paper";

const isAndroid = Platform.OS === "android";

export const SafeArea = Styled(SafeAreaView)`
    marginTop: ${isAndroid ? StatusBar.currentHeight : 0}px;
    height: 100%;
    width: 100%;
    `;
