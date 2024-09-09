import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";

export const UnitItemsContext = createContext();

export const UnitItemsContextProvider = ({ children }) => {
  const [unitItems, setUnitItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const retriveUnits = () => {
    setLoading(true);
    setTimeout(() => {
      //axiosGetRequest("/api/meals/search", null, filters, "POST")
      axiosGetRequest("/api/units", null, "GET")
        //.then(resultsTransform)
        .then((results) => {
          setLoading(false);
          setUnitItems(results.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }, 0);
  };

  useEffect(() => {
    retriveUnits();
    //console.log(filters);
  }, []);

  return (
    <UnitItemsContext.Provider
      value={{
        unitItems,
        isLoading,
        error,
        retriveUnits: retriveUnits,
      }}
    >
      {children}
    </UnitItemsContext.Provider>
  );
};
