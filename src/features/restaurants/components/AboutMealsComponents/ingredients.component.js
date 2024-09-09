import React, { useState, useContext, useEffect, Component } from "react";
import Styled from "styled-components/native";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "../../../../components/Typography/text.component";
import {
  TextInput,
  Chip,
  ActivityIndicator,
  MD2Colors,
  FAB,
  Divider,
} from "react-native-paper";
import { Button } from "react-native-paper";
import { DetailsContext } from "../../details.context";
import { Spacer } from "../../../../components/spacer/spacer.component";

// const DetailsContextProvider = Styled.View`
// padding: ${(props) => props.theme.space[2]};
// backgroundColor: ${(props) => props.theme.colors.bg.backgroundOne};
// minHeight: 100%;
// `;

const Loading = Styled(ActivityIndicator)`
  margin-left: -25;
`;

const LoadingContainer = Styled.View`
position: absolute;
top: 50%;
left: 50%;`;

const ImageWrapper = Styled.View`
padding: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.bgOne};
height: 25%;
`;

const SectionWrapper = Styled.View`
paddingBottom: ${(props) => props.theme.space[4]};
padding: ${(props) => props.theme.space[2]};
`;

const styles = StyleSheet.create({
  formfield: {
    marginBottom: 16,
  },
  textArea: {},
});

const IngredientsList = Styled(FlatList).attrs({
  width: "100%",
  contentContainerStyle: {
    width: "100%",
  },
})``;

const NewItem = Styled.View`
borderRadius: 12;
marginBottom: ${(props) => props.theme.space[12]};
`;

const MainTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.h4};
fontWeight: bold;
marginBottom: 16;
`;

const SubTitle = Styled.Text`
fontFamily: ${(props) => props.theme.fonts.heading};
fontSize: ${(props) => props.theme.fontSizes.title};
fontWeight: bold;
marginBottom: 8;
`;

export const Ingredients = ({ ingredients }) => {
  // const { details, isLoading, error, detailsFunction } =
  // useContext(DetailsContext);

  useEffect(() => {
    // console.log(ingredients);
  });

  function displayIngredients(ingredients) {
    var ingredientList = [];
    if (ingredients) {
      for (let i = 0; i < ingredients.length; i++) {
        ingredientList.push(
          <>
            <View
              key={i}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ width: "auto" }}>{ingredients[i].name}</Text>
              <Text style={{ width: "auto" }}>
                {ingredients[i].amount}
                {ingredients[i].short_name}
              </Text>
            </View>
            <Divider />
          </>
        );
      }
    }
    return ingredientList;
  }

  return (
    <>
      <>
        <SectionWrapper>
          <Text variant="h2">Ingredients</Text>
          <Spacer position="top" size="large"></Spacer>
          <IngredientsList
            data={ingredients}
            renderItem={({ item, index }) => {
              return (
                <NewItem
                  style={{
                    marginBottom: 19,
                    alignItem: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        justifyContent: "center",
                      }}
                    ></View>
                    <View
                      style={{
                        height: "100%",
                        flexGrow: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        variant="medium_body"
                        key={item.id}
                        style={{
                          paddingLeft: 0,
                          marginBottom: 0,
                        }}
                      >
                        {item.quantity_display === 0 ? (
                          <Text variant="medium_body">
                            {item.name} {item.amount * 1}
                            {item.short_name}
                          </Text>
                        ) : (
                          <Text variant="medium_body">
                            {item.quantity} {item.name}
                            <Text
                              variant="medium_body"
                              style={{ opacity: 0.6 }}
                            >
                              {" "}
                              ({item.amount * item.quantity}
                              {item.short_name})
                            </Text>
                          </Text>
                        )}
                      </Text>
                      {/* <TextInput
                    defaultValue={`${item.quantity}`}
                    value={`${item.quantity}`}
                    onChangeText={(text) => setText(text, item)}
                    name="quantity"
                    mode="outlined"
                    label="quantity"
                    id={item.id}
                    right={<TextInput.Affix text="grams" />}
                  /> */}
                    </View>
                  </View>
                </NewItem>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </SectionWrapper>
      </>
    </>
  );
};
