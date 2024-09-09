// @src/App.js
import React, { useState, useContext, useEffect, Component } from "react";
import { Text } from "react-native";

export const FormatSeconds = ({ time }) => {
  const [hours, setHours] = useState(null);

  const [minutes, setMinutes] = useState(null);

  function secondsToHours(e) {
    const d = Number(e);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    setHours(`${h}`);
    setMinutes(`${m}`);
  }

  useEffect(() => {
    secondsToHours(time);
  }, []);

  return (
    <>
      {hours > 0 && <Text>{hours}hrs </Text>}
      {minutes > 0 && <Text>{minutes}mins </Text>}
    </>
  );
};
