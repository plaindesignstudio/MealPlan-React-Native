import React, { useContext } from "react";
import { axiosGetRequest } from "../../../components/services/axiosGetRequest";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Styled from "styled-components/native";
import {
  ActivityIndicator,
  MD2Colors,
  Button,
  FAB,
  Searchbar,
} from "react-native-paper";
import { Platform, FlatList } from "react-native";
import { SafeArea } from "../../../components/Utils/Safe-area.component";
import { RestaurantsInfoCard } from "../components/restaurant-info-card";
import { MealsContext } from "../meals.context";
import { AuthenticationContext } from "../../../service/authentication/authentication.context";
import { colors } from "../../../infastructure/theme/colors";
import { useEffect, useState } from "react/cjs/react.development";
import { Search } from "../components/search.component";

const RestaurantList = Styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`backgroundColor: ${(props) => props.theme.primaryContainer};`;

const Loading = Styled(ActivityIndicator)`
  margin-left: -25;
`;

const LoadingContainer = Styled.View`
position: absolute;
top: 50%;
left: 50%;`;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "#000",
    color: "white",
    alignSelf: "flex-start",
    margin: 16,
    bottom: 0,
    right: 0,
  },
});

export const RestaurantsScreen = ({ route, navigation }) => {
  const { isLoading, error, meals, reloadFunction } = useContext(MealsContext);

  function refreshMeals(reload) {
    reloadFunction(reload);
  }

  useEffect(() => {
    refreshMeals(true);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      refreshMeals(true);
    }, [])
  );

  return (
    <>
      <SafeArea>
        <View style={{ padding: 10 }}>
          <Pressable onPress={() => navigation.navigate("MealFilter")}>
            <Searchbar
              placeholder="Search meals"
              onPressIn={() => navigation.navigate("MealFilter")}
            />
          </Pressable>
        </View>
        {/* <Button onPress={() => refreshMeals(true)}>Refresh results</Button> */}

        <RestaurantList
          data={meals}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MealDetail", {
                    meal: item,
                  })
                }
              >
                <RestaurantsInfoCard meals={item} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />

        {isLoading && (
          <LoadingContainer>
            <Loading size={50} animating={true} color={MD2Colors.red300} />
          </LoadingContainer>
        )}
        <Button
          icon="plus"
          mode="contained"
          style={styles.button}
          color="white"
          onPress={() => navigation.navigate("MealCreate")}
        >
          Add Recipe
        </Button>
      </SafeArea>
    </>
  );
};
