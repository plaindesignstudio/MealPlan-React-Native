import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useContext,
} from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";
import { AuthenticationContext } from "../../service/authentication/authentication.context";

export const MealsContext = createContext();

export const MealsContextProvider = ({ children }) => {
  //const { user } = useContext(AuthenticationContext);
  const [filters, setFilters] = useState({
    search: null,
    allergies: [],
    // user: user.data.user.id,
  });
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);

  const refreshSearch = (e) => {
    if (e) {
      retriveMeals(filters);
    }
  };

  const onSearch = (searchFilters) => {
    setFilters(searchFilters);
    retriveMeals(searchFilters);
  };

  const retriveMeals = (searchFilters) => {
    setLoading(true);
    setTimeout(() => {
      axiosGetRequest("/api/meals/search", searchFilters, "POST")
        .then(resultsTransform)
        .then((results) => {
          setLoading(false);
          setMeals(results);
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }, 0);
  };

  useEffect(() => {
    retriveMeals(filters);
  }, [filters]);

  useEffect(() => {
    refreshSearch(true);
  }, [refresh]);

  return (
    <MealsContext.Provider
      value={{
        meals,
        filters,
        isLoading,
        error,
        searchFunction: onSearch,
        reloadFunction: refreshSearch,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
};
