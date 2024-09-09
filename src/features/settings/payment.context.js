import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";

export const PaymentIntentContext = createContext();

export const PaymentIntentContextProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    currency: "aus",
    amount: 445,
  });
  const [filterReturn, setFilterReturn] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onIntent = (intentFilters) => {
    setFilters(intentFilters);
    retrivePaymentIntent(intentFilters);
  };

  const retrivePaymentIntent = (intentFilters) => {
    setLoading(true);
    setTimeout(() => {
      axiosGetRequest("/api/payment", intentFilters, "POST")
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
    <PaymentIntentContext.Provider
      value={{ filterReturn, isLoading, error, intentFunction: onIntent }}
    >
      {children}
    </PaymentIntentContext.Provider>
  );
};
