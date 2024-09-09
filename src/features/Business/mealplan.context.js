import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";

export const MealPlanContext = createContext();

export const detailsTransform = (results) => {
  const mappedResults = results.data.map((data) => {
    return { ...data };
  });
  //const newResult = camelize(mappedResults);
  return mappedResults;
};

export const MealPlanContextProvider = ({ children }) => {
  const [planId, setPlanId] = useState(null);
  const [filters, setFilters] = useState({
    day: "sunday",
  });
  const [planDetails, setPlanDetails] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchPlan = (id) => {
    setPlanId(id);
    // retrivePlan(id);
  };

  const updateFilters = (day) => {
    setFilters({
      day: day,
    });
  };

  const retrivePlan = (id) => {
    setLoading(true);
    setTimeout(() => {
      axiosGetRequest(`/api/mealplan/${id}?day=${filters.day}`, null, "GET")
        //.then(resultsTransform)
        .then((results) => {
          setLoading(false);
          setPlanDetails(results.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }, 0);
  };

  useEffect(() => {
    retrivePlan(planId);
  }, [planId, filters]);

  // return (
  //   <DetailsContext.Provider
  //     value={{ mealDetails, isLoading, error, detailsFunction: onDetails }}
  //   >
  //     {children}
  //   </DetailsContext.Provider>
  // );
  return (
    <MealPlanContext.Provider
      value={{
        planDetails,
        isLoading,
        error,
        filters,
        searchPlan: searchPlan,
        updateFilters: updateFilters,
      }}
    >
      {children}
    </MealPlanContext.Provider>
  );
};
