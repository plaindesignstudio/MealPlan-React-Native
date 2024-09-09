// @src/App.js
import React, { useState, useContext, useEffect, Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { PieChart } from "../src/features/restaurants/components/AboutMealsComponents/detailsComponents/piechart.component";

const PieChartSVG = ({ data, total, calories }) => {
  const [pieChartArgs, setPieChartArgs] = useState(data);

  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  // const groceries = 15;
  // const bills = 372;
  // const regular = 188;

  // const groceriesPercentage = (groceries / total) * 100;
  // const billsPercentage = (bills / total) * 100;
  // const regularPercentage = (regular / total) * 100;

  // const groceriesStrokeDashoffset =
  //   circleCircumference - (circleCircumference * groceriesPercentage) / 100;
  // const billsStrokeDashoffset =
  //   circleCircumference - (circleCircumference * billsPercentage) / 100;
  // const regularStrokeDashoffset =
  //   circleCircumference - (circleCircumference * regularPercentage) / 100;

  // const groceriesAngle = (groceries / total) * 360;
  // const billsAngle = (bills / total) * 360;
  // const regularAngle = groceriesAngle + billsAngle;

  useEffect(() => {}, [pieChartArgs]);

  const segmant = ({ segData }) =>
    pieChartArgs.map((x) => (
      <>
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={x.color}
          fill="transparent"
          strokeWidth="40"
          strokeDasharray={circleCircumference}
          strokeDashoffset={x.stroke_dash_offset}
          rotation={x.angle}
          originX="90"
          originY="90"
        />
      </>
    ));

  return (
    <>
      {pieChartArgs && (
        <View style={styles.container}>
          <View style={styles.graphWrapper}>
            <Svg height="260" width="260" viewBox="0 0 180 180">
              <G rotation={-90} originX="90" originY="90">
                {total === 0 ? (
                  <Circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="#a9a9a9a9"
                    fill="transparent"
                    strokeWidth="40"
                  />
                ) : (
                  <>{segmant(pieChartArgs)}</>
                )}
              </G>
            </Svg>
            <View style={styles.centered}>
              <Text style={styles.label}>Calories</Text>
              <Text style={styles.total}>{calories}</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default PieChartSVG;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  total: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 28,
  },
  label: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
  },
  centered: {
    position: "absolute",
  },
});
