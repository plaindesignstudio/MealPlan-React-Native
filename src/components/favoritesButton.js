// @src/App.js
import React, { useState, useContext, useEffect, Component } from "react";
import { axiosGetRequest } from "./services/axiosGetRequest";
import { Text, Pressable } from "react-native";
import heart from "../../assets/heart";
import heartGrey from "../../assets/heartGrey";
import { SvgXml } from "react-native-svg";
import { AuthenticationContext } from "../service/authentication/authentication.context";

export const FavoritesButton = ({ favoritesBoolCount, meal }) => {
  // const [hours, setHours] = useState(null);
  const [favoriteToggle, setFavoriteToggle] = useState("false");
  const { user } = useContext(AuthenticationContext);

  // uploadImage = async (link: string) => {
  const toggleFavorite = async () => {
    const response = await axiosGetRequest(
      `/api/meals/favorite/${meal}`,
      { user_id: user.id },
      "POST"
    );
    const data = await response;
    //console.log(data.data);
    setFavoriteToggle(data.data);
  };

  useEffect(() => {
    if (favoritesBoolCount > 0) {
      setFavoriteToggle(true);
    } else {
      setFavoriteToggle(false);
    }
  }, [favoritesBoolCount]);

  // function toggleFavorite() {
  //   const response = axiosGetRequest(
  //     `/api/meal/favorite/${meal}`,
  //     { user_id: user.data.user.id },
  //     "POST"
  //   );

  //   //const data = await response;
  //   console.log(response.data);
  // }

  return (
    <>
      {favoriteToggle ? (
        <Pressable onPress={() => toggleFavorite()}>
          <SvgXml xml={heart} width="30" height="30" />
        </Pressable>
      ) : (
        <Pressable onPress={() => toggleFavorite()}>
          <SvgXml xml={heartGrey} width="30" height="30" />
        </Pressable>
      )}
    </>
  );
};
