import React, { useState, setState, useContext, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import Styled from "styled-components/native";
import { Flexrow } from "../../../components/spacer/flexrow.component";
import { useNavigation } from "@react-navigation/native";
import momentTimezone from "moment-timezone";
import moment from "moment";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
momentTimezone.tz.setDefault("Australia/Melbourne");
//import CheckoutForm from "./CheckoutForm";
import {
  SectionWrapper,
  Spacer,
} from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/Typography/text.component";
import { AuthenticationContext } from "../../../service/authentication/authentication.context";
import { MealPlanContext } from "../../Business/mealplan.context";
import { RestaurantsScreen } from "../../restaurants/screens/restaurants.screens";
import { colors } from "../../../infastructure/theme/colors";
import { FlatList } from "react-native-gesture-handler";
import { RestaurantsInfoCard } from "../../restaurants/components/restaurant-info-card";
//import ApiManager from "./axiosManager";

const FormWrapper = Styled(View).attrs({})`
paddingTop: 50%;
paddingBottom: ${(props) => props.theme.space[2]};
paddingLeft: ${(props) => props.theme.space[2]};
paddingRight: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.background};`;

export const WeekDay = ({ meals, route, currentDay, currentDate }) => {
  // var date = new Date().getDate();
  const momentDate = moment().format("MMM DD, YYYY");

  const [todayDate, setTodayDate] = useState(null);
  const [clickedDay, setClickedDay] = useState(null);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const styles = StyleSheet.create({
    today: {
      backgroundColor: colors.primary,
      // color: colors.light,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
  });

  const TodayPill = Styled.View`
   backgroundColor: ${(props) => props.theme.colors.bg.light};
   color: ${(props) => props.theme.colors.bg.light};
   borderWidth: 2,
   borderColor: ${(props) => props.theme.colors.bg.primary};
   alignItems: center,
   justifyContent: center,
   borderRadius: 8,
   `;

  const StandardPill = Styled.View`
   backgroundColor: ${(props) => props.theme.colors.bg.light};
   borderWidth: 2,
   borderColor: ${(props) => props.theme.colors.bg.light};
   alignItems: center,
   justifyContent: center,
   borderRadius: 8,
   `;

  let week = [];

  for (let i = 0; i <= 6; i++) {
    const startOfWeek = moment().startOf("week");
    var weekDate = moment(startOfWeek).add(i, "days");
    var monthDay = moment(startOfWeek).add(i, "days").format("DD");
    var weekdayName = moment(startOfWeek).add(i, "days").format("ddd");
    var result = moment().isSame(weekDate, "day");
    var active = result;
    week.push({ id: i, date: monthDay, name: weekdayName, active: active });
  }

  const [items, setItems] = useState(week);

  const updateActive = (index, value) => {
    setClickedDay(moment().day(index).format("dddd"));

    const tempItems = [...items];
    tempItems.map((x, i) => {
      tempItems[i].active = false;
    });

    if (active !== true) {
      tempItems[index].active = true;
      // setItems(tempItems);
    } else {
      tempItems[index].active = false;
      // setItems(tempItems);
    }

    setItems(tempItems);
  };

  function StandardDayPill(item) {
    return (
      <StandardPill
        style={
          true === item.active
            ? {
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                borderWidth: 2,
                borderColor: colors.primary,
              }
            : {
                backgroundColor: colors.light,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              }
        }
      >
        <Spacer position="top" size="medium" />
        {/* <Spacer position="top" size="medium" /> */}
        <Text
          style={
            true === item.active
              ? {
                  color: colors.light,
                }
              : {
                  color: colors.dark,
                }
          }
        >
          {item.date}
        </Text>

        <Spacer position="top" size="small" />
        <Text
          style={
            true === item.active
              ? {
                  color: colors.light,
                }
              : {
                  color: colors.dark,
                }
          }
        >
          {item.name}
        </Text>

        <Spacer position="top" size="medium" />
        {/* <Spacer position="top" size="medium" /> */}
      </StandardPill>
    );
  }

  function ActiveDayPill(item) {
    return (
      <TodayPill
        style={
          true === item.active
            ? {
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              }
            : {
                backgroundColor: colors.light,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              }
        }
      >
        <Spacer position="top" size="medium" />
        {/* <Spacer position="top" size="medium" /> */}
        <Text
          style={
            true === item.active
              ? {
                  color: colors.light,
                }
              : {
                  color: colors.dark,
                }
          }
        >
          {item.date}
        </Text>
        <Spacer position="top" size="small" />
        <Text
          style={
            true === item.active
              ? {
                  color: colors.light,
                }
              : {
                  color: colors.dark,
                }
          }
        >
          {item.name}
        </Text>

        <Spacer position="top" size="medium" />
        {/* <Spacer position="top" size="medium" /> */}
      </TodayPill>
    );
  }

  useEffect(() => {
    currentDay(clickedDay);
  }, [clickedDay]);

  useEffect(() => {
    currentDate(todayDate);
  }, [todayDate]);

  useEffect(() => {
    const day = moment().format("dddd");

    if (day) {
      setClickedDay(day);
    }

    setTodayDate(momentDate);
  }, []);

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={items}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ width: 49, marginRight: 8, marginVertical: 8 }}
            onPress={() => updateActive(index, item.active)}
          >
            {momentDate == item.date
              ? ActiveDayPill(item)
              : StandardDayPill(item)}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};
