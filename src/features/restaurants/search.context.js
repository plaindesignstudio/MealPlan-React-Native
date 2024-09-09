import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";

export const SearchFieldsContext = createContext();

export const SearchFieldsContextProvider = ({ children }) => {
  const [filterFields, setFilterFields] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const retriveFilterFields = () => {
    setLoading(true);
    setTimeout(() => {
      axiosGetRequest("/api/meals/filterFields")
        .then(resultsTransform)
        .then((results) => {
          setLoading(false);
          setFilterFields(results);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }, 0);
  };

  useEffect(() => {
    retriveFilterFields();
  }, []);

  return (
    <SearchFieldsContext.Provider value={{ filterFields, isLoading, error }}>
      {children}
    </SearchFieldsContext.Provider>
  );
};
