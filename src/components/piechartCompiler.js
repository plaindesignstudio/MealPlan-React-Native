// @src/App.js
import React, { useState, useContext, useEffect, Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import PieChartSVG from "../../assets/PieChartSVG";

export const PieChartCompile = ({ data, total, mealCalories }) => {
  const [pieChartArgs, setPieChartArgs] = useState(null);
  const [pieCalories, setCalories] = useState(mealCalories);

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

  const addPieData = (pieData, circle, total_data) => {
    // var pieData = pieData.sort(
    //   ({ per_100_gram: a }, { per_100_gram: b }) => b - a
    // );
    const degreePerData = 360 / total_data;
    console.log("total: " + degreePerData);
    const pieArray = [];
    let offset = 0;
    if (pieData) {
      for (let k = 0; k < pieData.length; k++) {
        var rotationAngle = 0;
        const per_100_gram = parseFloat(pieData[k].per_100_gram);
        const sectionDegree = degreePerData * per_100_gram;
        offset = offset + sectionDegree;
        const stroke_dash_offset = offset;
        pieData[k]["stroke_dash_offset"] =
          circle - (circleCircumference * pieData[k].percentage) / 100;
        pieData[k]["angle"] = offset - (per_100_gram / total) * 360;
        pieArray.push(pieData[k]);
      }

      const myData = pieArray.sort((a, b) => a.per_100_gram - b.per_100_gram);

      console.log(myData);
      return myData;
    }
  };

  useEffect(() => {
    const pieFunction = addPieData(data, circleCircumference, total);
    setPieChartArgs(pieFunction);
    setCalories(mealCalories);
  }, [data, total, mealCalories]);

  return (
    <>
      {pieChartArgs && (
        <PieChartSVG data={pieChartArgs} total={total} calories={pieCalories} />
      )}
    </>
  );
};

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
  label: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 24,
  },
});
