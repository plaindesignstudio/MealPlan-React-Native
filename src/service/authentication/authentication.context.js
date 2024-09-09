import React, { useState, createContext, useEffect } from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setLoading(true);
    setTimeout(() => {
      //axiosGetRequest("/api/meals/search", null, filters, "POST")
      axiosGetRequest(
        "/api/login",
        { email: email, password: password },
        "POST"
      )
        //.then(resultsTransform)
        .then((u) => {
          setLoading(false);
          setUser(u.data.user);
          console.log(u.data.user);
          setToken(u.data);
        })
        .catch((err) => {
          console.log(error);
          setLoading(false);
          setError(err);
        });
    }, 0);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        token,
        isLoading,
        error,
        onLogin: onLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
