import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../service/authentication/authentication.context";

export const BearerToken = ({}) => {
  const { token, onLogin, user } = useContext(AuthenticationContext);
  return token;
  // return(headers: { Authorization: `Bearer ${isAuthenticated.BearerToken}` })
};

const ApiManager = axios.create({
  //baseURL: "https://0808-14-2-34-126.ngrok-free.app/",
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${BearerToken}`,
  },
  withCredentials: true,
  //Authorization: `Bearer ${BearerToken}`,
  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
  //contentType: "multipart/form-data",
  Accept: "application/json",
});

export default ApiManager;
