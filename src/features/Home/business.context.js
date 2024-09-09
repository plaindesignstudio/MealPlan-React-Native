import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";

export const BusinessCreatorContext = createContext();

export const BusinessCreatorContextProvider = ({ children }) => {
  const [filters, setFilters] = useState([]);
  const [filterReturn, setFilterReturn] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onCreate = (companyFilters) => {
    setFilters(companyFilters);
    createCompany(companyFilters);
  };

  const createCompany = (companyFilters) => {
    setLoading(true);
    setTimeout(() => {
      axiosGetRequest("/api/companies", companyFilters, "POST")
        //.then(resultsTransform)
        .then((results) => {
          console.log(results.data);
          setLoading(false);
          setFilterReturn(results);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }, 0);
  };

  return (
    <BusinessCreatorContext.Provider
      value={{ filterReturn, isLoading, error, createFunction: onCreate }}
    >
      {children}
    </BusinessCreatorContext.Provider>
  );
};
