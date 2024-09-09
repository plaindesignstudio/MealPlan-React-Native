import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";

export const NutritionlItemsContext = createContext();

export const NutritionlItemsContextProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    search: "",
  });

  const [nutritionItems, setNutritionItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchFilters) => {
    setFilters(searchFilters);
    retriveNutrients(searchFilters);
  };

  const retriveNutrients = (searchFilters) => {
    console.log(searchFilters);
    setLoading(true);
    setTimeout(() => {
      //axiosGetRequest("/api/meals/search", null, filters, "POST")
      axiosGetRequest("/api/nutinfos/search", searchFilters, "POST")
        .then(resultsTransform)
        .then((results) => {
          setLoading(false);
          setNutritionItems(results);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }, 0);
  };

  useEffect(() => {
    //retriveMeals(filters);
    //console.log(filters);
  }, [filters]);

  return (
    <NutritionlItemsContext.Provider
      value={{
        nutritionItems,
        filters,
        isLoading,
        error,
        searchFunction: onSearch,
      }}
    >
      {children}
    </NutritionlItemsContext.Provider>
  );
};
