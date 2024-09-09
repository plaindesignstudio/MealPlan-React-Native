import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";

export const DetailsContext = createContext();

export const detailsTransform = (results) => {
  const mappedResults = results.data.map((data) => {
    return { ...data };
  });
  //const newResult = camelize(mappedResults);
  return mappedResults;
};

export const DetailsContextProvider = ({ children }) => {
  const [mealId, setMealId] = useState(null);
  const [details, setDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const onDetails = (mealId) => {
    setLoading(true);
    setMealId(mealId);
    //retriveDetails(mealId);
  };

  const refreshSearch = (e) => {
    setRefresh(true);
    setRefresh(false);
  };

  const retriveDetails = (mealId) => {
    setDetails(null);
    setLoading(true);
    setTimeout(() => {
      axiosGetRequest(`/api/meals/${mealId}`, null, "GET")
        //.then(resultsTransform)
        .then((results) => {
          setLoading(false);
          setDetails(results);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }, 0);
  };

  useEffect(() => {
    retriveDetails(mealId);
  }, [mealId, refresh]);

  return (
    <DetailsContext.Provider
      value={{
        details,
        isLoading,
        error,
        detailsFunction: onDetails,
        reloadFunction: refreshSearch,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
  // return (
  //   <DetailsContext.Provider value={{ isLoading, error }}>
  //     {children}
  //   </DetailsContext.Provider>
  // );
};
