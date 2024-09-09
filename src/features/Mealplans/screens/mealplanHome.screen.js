import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button } from "react-native-paper";
import Styled from "styled-components/native";
import { Flexrow } from "../../../components/spacer/flexrow.component";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker"; // import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

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
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { MealPlanOverview } from "../components/mealplanOverview.component";
import { SafeArea } from "../../../components/Utils/Safe-area.component";
import { MealList } from "../components/mealList.component";
import { WeekDay } from "../components/weekDay.component";
//import ApiManager from "./axiosManager";

const FormWrapper = Styled(View).attrs({})`
paddingTop: 50%;
paddingBottom: ${(props) => props.theme.space[2]};
paddingLeft: ${(props) => props.theme.space[2]};
paddingRight: ${(props) => props.theme.space[2]};
backgroundColor: ${(props) => props.theme.colors.bg.background};`;

export const MealPlanHome = ({ route, navigation }) => {
  const [mealPlanid, setMealPlanId] = useState(null);
  const [mealPlanData, setMealPlanData] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);
  const { mealplan } = useContext(MealPlanContext);
  // const navigation = useNavigation();
  // var date = new Date().getDate();
  const { planDetails, isLoading, error, filters, searchPlan, updateFilters } =
    useContext(MealPlanContext);
  // var day = new Date().getDay();

  const { id } = route.params;

  useEffect(() => {
    setMealPlanId(id);
  }, []);

  useEffect(() => {
    console.log(currentDay);
    updateFilters(currentDay);
  }, [currentDay]);

  useEffect(() => {
    //console.log(currentDate);
  }, [currentDate]);

  useEffect(() => {
    if (mealPlanid !== null && filters) {
      searchPlan(mealPlanid, { day: "sunday" });
    }
  }, [mealPlanid]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <SectionWrapper
          style={{
            flex: 1,
          }}
        >
          <Text variant="h1">{planDetails.name}</Text>
          <Text>Today: {currentDate}</Text>
          <Spacer position="top" size="medium"></Spacer>
          <WeekDay currentDay={setCurrentDay} currentDate={setCurrentDate} />
          <Spacer position="top" size="medium"></Spacer>
        </SectionWrapper>

        <View
          style={{
            flex: 4,
          }}
        >
          <MealPlanOverview
            style={{
              flex: 2,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
