import React, { useState, useContext, useEffect } from "react";
import Styled from "styled-components/native";
import { StyleSheet, View } from "react-native";
import { Text } from "../../../../../components/Typography/text.component";
import { TextInput } from "react-native-paper";

import { useTheme } from "react-native-paper";
import { Spacer } from "../../../../../components/spacer/spacer.component";
// import { AllergiesContext } from "../../../allergies.context";

const styles = StyleSheet.create({
  formfield: {
    marginBottom: 16,
  },
  textArea: {},
  formfieldWidth: {
    flexGrow: 1,
  },
});

export const CleanTime = ({
  time,
  handleChange,
  name,
  label,
  input_id,
  defaultValue,
}) => {
  const { colors } = useTheme();
  // const [initialTime, setInitialTime] = useState(time);
  const [timeNew, setTimeNew] = useState(time);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  // const [inintHours, setInitHours] = useState(null);
  // const [initMinutes, setInitMinutes] = useState(null);

  const timeToSeconds = () => {
    const hoursInSeconds = 3600 * hours;
    const minutsInSeconds = 60 * minutes;
    const secondsTotal = hoursInSeconds + minutsInSeconds;
    setTimeNew(secondsTotal);
    //handleChange(secondsTotal);
  };

  //   function splitDecimal(n) {
  //     return (n + "").split(".")[1];
  // }

  function secondsToHours(e) {
    // const convertedsecToHr = e / 60;
    // var converted = (Math.round(convertedsecToHr * 100) / 100).toFixed(2);
    // //var converted = convertedsecToHr;

    // const hr = (converted + "").split(".")[0];
    // const min = (converted + "").split(".")[1];
    // const number = parseInt("1000", 10);
    const d = Number(e);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    setHours(`${h}`);
    setMinutes(`${m}`);
    // timeToSeconds();
    //console.log("prep hours: " + converted);
  }

  useEffect(() => {
    // console.log("de:" + defaultValue);
    secondsToHours(defaultValue);
  }, []);

  useEffect(() => {
    timeToSeconds();
    // console.log(hours);
  }, [minutes, hours]);

  useEffect(() => {
    // timeToSeconds();
    handleChange(timeNew);
    // console.log(hours);
  }, [timeNew]);

  return (
    <>
      <Text>{label}</Text>
      <Spacer size="small" position="top"></Spacer>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => setHours(text)}
          defaultValue={hours}
          value={hours}
          style={[styles.formfield, styles.formfieldWidth]}
          mode="outlined"
          label="hours"
          id={input_id}
          name="hours"
          // placeholder="00"
        />
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => setMinutes(text)}
          defaultValue={minutes}
          value={minutes}
          style={[styles.formfield, styles.formfieldWidth]}
          mode="outlined"
          label="minutes"
          id={input_id}
          name="minutes"
        />
      </View>
    </>
  );
};
