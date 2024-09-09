import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";

export const AllergiesSearchContext = createContext();

export const AllergiesSearchContextProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    search: null,
  });

  const [allergies, setAllergies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchFilters) => {
    setFilters(searchFilters);
    fetchAllergies(searchFilters);
  };

  const fetchAllergies = (searchFilters) => {
    console.log(searchFilters);
    setLoading(true);
    setTimeout(() => {
      axiosGetRequest("/api/allergies/search", searchFilters, "POST")
        .then(resultsTransform)
        .then((results) => {
          setLoading(false);
          setAllergies(results);
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
    <AllergiesSearchContext.Provider
      value={{
        allergies,
        isLoading,
        error,
        filters,
        searchFunction: onSearch,
      }}
    >
      {children}
    </AllergiesSearchContext.Provider>
  );
};
