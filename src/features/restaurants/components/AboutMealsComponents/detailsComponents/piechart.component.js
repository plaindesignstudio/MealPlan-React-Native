import React, { useState, useContext, useEffect, Component } from "react";
import Styled from "styled-components/native";
import { View, StyleSheet, Image, Pressable, FlatList } from "react-native";
import { Text } from "../../../../../components/Typography/text.component";
import PieChartSVG from "../../../../../../assets/PieChartSVG";
import { useTheme } from "react-native-paper";

export const PieChart = ({ data, total }) => {
  const [piechartData, setpiechartData] = useState(null);
  const { colors } = useTheme();
  useEffect(() => {
    //findAllergies(details.data);
    console.log(piechartData);
    setpiechartData(data);
  }, [data]);

  const Item = ({ data }) => (
    <View
      style={{
        margin: 12,
        paddingHorizontal: 24,
        paddingVertical: 12,
        paddingEnd: 50,
        borderRadius: 16,
        backgroundColor: colors.light,
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 20,
            width: 20,
            padding: 12,
            backgroundColor: data.color,
            borderRadius: 25,
          }}
        ></View>
        <Text>
          {(Math.round(data.per_100_gram * 100) / 100).toFixed(2)}
          {data.short_name}
        </Text>
      </View>
      <Text variant="h3">
        {(Math.round(data.percentage * 100) / 100).toFixed(1)}%
      </Text>
      <Text variant="h5">{data.name}</Text>
    </View>
  );

  return (
    <>
      <FlatList
        style={{ marginTop: 24 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={piechartData}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};
