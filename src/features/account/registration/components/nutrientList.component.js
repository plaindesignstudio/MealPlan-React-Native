import React, { useState, useContext, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Styled from "styled-components/native";
import {
  Searchbar,
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  TextInput,
  IconButton,
} from "react-native-paper";
import { View, FlatList, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
// import { SearchFieldsContext } from "../search.context";
// import { useEffect } from "react/cjs/react.development";
// import { AllergyFilter } from "./allergies.component";

const SearchContainer = Styled.View`
padding: ${(props) => props.theme.space[0]};
backgroundColor: ${(props) => props.theme.primaryContainer};
zIndex: 100
`;

const styles = StyleSheet.create({
  activeSearch: {
    borderBottomLeftRadius: "0em",
    borderBottomRightRadius: "0em",
  },
});

const SearchBar = Styled(Searchbar).attrs({
  //backgroundColor: `${(props) => props.theme.colors.bg.info}`,
})`backgroundColor: ${(props) => props.theme.colors.bg.light}; 
marginBottom: ${(props) => props.theme.space[0]};
padding: ${(props) => props.theme.space[0]}`;

const SearchListWrapper = Styled(View).attrs({
  position: "relative",
  flex: 1,
  zIndex: "100",
})`marginBottom: ${(props) => props.theme.space[12]};`;

const SearchListContainer = Styled(View).attrs({
  position: "absolute",
  width: "100%",
  zIndex: 100,
  borderBottomLeftRadius: "25em",
  borderBottomRightRadius: "25em",
  backgroundColor: `${(props) => props.theme.colors.bg.info}`,
})``;

const IngredientsList = Styled(FlatList).attrs({
  width: "100%",
  borderBottomLeftRadius: "0em",
  borderBottomRightRadius: "0em",
  contentContainerStyle: {
    padding: 0,
    width: "100%",
  },
})``;

const Title = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.title};
fontWeight: ${(props) => props.theme.fontWeights.bold};
textAlign: center;
marginBottom: 12;
`;

const AddButton = Styled(IconButton).attrs({
  padding: 0,
  IconButtonContentStyle: {
    width: 1,
    height: 1,
  },
  contentContainerStyle: {
    // padding: 12,
  },
})``;

const NewItem = Styled.View`
padding: ${(props) => props.theme.space[0]};
borderRadius: 8;
borderWidth: 0.8;
borderColor: ${(props) => props.theme.colors.bg.dark};
marginBottom: ${(props) => props.theme.space[2]};
`;

const Spacer = Styled.View`
marginBottom: ${(props) => props.theme.space[2]};
`;

const ListItem = Styled.View`
padding: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.info};
overFlow: hidden;
`;

// const CreateItem = Styled.View`
// padding: ${(props) => props.theme.space[3]};
// backgroundColor: ${(props) => props.theme.colors.bg.primary};
// borderBottomLeftRadius: "25em !important",
// borderBottomRightRadius: "25em",
// `;

const CreateItem = Styled(View).attrs({
  borderBottomLeftRadius: "25em !important",
  borderBottomRightRadius: "25em",
  flexDirection: "row",
  flex: 100,
  alignItems: "center",
  flexDirection: "column",
})`padding: ${(props) => props.theme.space[3]};  backgroundColor: ${(props) =>
  props.theme.colors.bg.infoLight}`;

const NoIgredients = Styled.View`
paddingBottom: ${(props) => props.theme.space[0]};
paddingTop: ${(props) => props.theme.space[4]};
textAlign: center;
`;

export const NutrientList = ({ item, addToArrayFunction, setText }) => {
  const [nutrition, setNutrition] = useState(item);

  const { colors } = useTheme();
  //const {} = useContext(SearchFieldsContext);

  useEffect(() => {
    //retriveUnits();
  }, []);

  useEffect(() => {
    console.log(nutrition);
  }, [nutrition]);

  return (
    <NewItem
      keyExtractor={(item, index) => index}
      style={{
        marginBottom: 8,
        marginTop: 8,
        alignItem: "center",
      }}
    >
      <View
        style={{
          flex: 3,
          padding: 1,
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            height: "100%",
            justifyContent: "center",
          }}
        >
          <AddButton
            style={{ borderColor: colors.error, marginLeft: 12 }}
            iconColor={colors.error}
            backgroundColor={colors.dark}
            icon="close"
            mode="outlined"
            size={16}
            onPress={() => addToArrayFunction(item)}
          ></AddButton>
        </View>
        <View
          style={{
            height: "100%",
            flexGrow: 100,
            flex: 2,

            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            key={item.id}
            style={{
              // flexGrow: 100,
              // flexGrow: 80,
              fontSize: 18,
              color: colors.light,
              marginLeft: 4,
              paddingLeft: 0,
              marginBottom: 0,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            {item.name}
          </Text>
        </View>

        <View
          style={{
            height: "100%",
            flexGrow: 80,
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingEnd: 8,
          }}
        ></View>
      </View>
    </NewItem>
  );
};
