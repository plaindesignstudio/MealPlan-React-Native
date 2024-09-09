import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";

export const AllergiesContext = createContext();

export const AllergiesContextProvider = ({ children }) => {
  const [allergies, setAllergies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllergies = () => {
    setLoading(true);
    setTimeout(() => {
      axiosGetRequest("/api/allergies", null, "GET")
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
    fetchAllergies();
  }, []);

  return (
    <AllergiesContext.Provider
      value={{
        isLoading,
        error,
        allergies,
      }}
    >
      {children}
    </AllergiesContext.Provider>
  );
};
