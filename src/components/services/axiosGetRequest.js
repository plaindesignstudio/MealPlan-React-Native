import React, { useState, useEffect } from "react";
import camelize from "camelize";
import ApiManager from "./axiosManager";

export const axiosGetRequest = (url, filter, method) => {
  return new Promise((resolve, reject) => {
    if (!url && !method) {
      reject("not found");
    }
    if (!filter) {
      const apiResult = ApiManager({
        url,
        method: method,
      });
      resolve(apiResult);
    } else {
      const apiResult = ApiManager({
        url,
        data: filter,
        method: method,
      });
      resolve(apiResult);
    }
  });
};

export const resultsTransform = (results) => {
  const mappedResults = results.data.map((data) => {
    return { ...data };
  });
  const newResult = camelize(mappedResults);

  return newResult;
};
