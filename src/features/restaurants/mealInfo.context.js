import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";

export const MealInfoContext = createContext();

export const detailsTransform = (results) => {
  const mappedResults = results.data.map((data) => {
    return { ...data };
  });
  //const newResult = camelize(mappedResults);
  return mappedResults;
};

export const MealInfoContextProvider = ({ children }) => {
  const [mealId, setMealId] = useState(1);
  const [mealDetails, setMealDetails] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDetails = (mealId) => {
    //setDetails("Function ID= " + mealId);
    retriveDetails(mealId);
  };

  const retriveDetails = (mealId) => {
    setLoading(true);
    setTimeout(() => {
      axiosGetRequest(`/api/meals/${mealId}`, null, "GET")
        .then((results) => {
          setLoading(false);
          setMealDetails(results);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }, 0);
  };

  // useEffect(() => {
  //   retriveDetails(mealId);
  // }, []);

  // return (
  //   <DetailsContext.Provider
  //     value={{ mealDetails, isLoading, error, detailsFunction: onDetails }}
  //   >
  //     {children}
  //   </DetailsContext.Provider>
  // );
  return (
    <MealInfoContext.Provider value={{ isLoading, error }}>
      {children}
    </MealInfoContext.Provider>
  );
};
