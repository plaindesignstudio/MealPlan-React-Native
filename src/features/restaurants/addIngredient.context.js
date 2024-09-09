import React, { useState, createContext, useEffect, useMemo } from "react";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../components/services/axiosGetRequest";

export const AddIngredientContext = createContext();

export const ingredientTransform = (results) => {
  const data = results.data;
  //console.log(data);
  const newArray = [];
  var newList = {};
  if (data) {
    // to print each of the titles
    newList["id"] = data.id;
    newList["name"] = data.name;
    newList["amount"] = 0;
    newList["quantity_display"] = 0;
    newList["quantity"] = 1;
    newList["unit_id"] = 1;
    newList["short_name"] = "g";
    newList["unit_name"] = "grams";
    //item.quantity = "40";
    //console.log(newList);
    //newArray.push(newList);
    //[data];
  }
  //console.log(newList);
  return newList;
};

export const AddIngredientProvider = ({ children }) => {
  // const [filters, setFilters] = useState(null);

  const [ingredientItemsAPI, setIngredientItemsAPI] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(false);

  const newIngredient = (ingrdeientDetails) => {
    const result = addIngredient(ingrdeientDetails);
    setIngredientItemsAPI(result);
  };

  const addIngredient = (ingrdeientDetails) => {
    setLoading(true);
    setTimeout(() => {
      axiosGetRequest("/api/ingredients", ingrdeientDetails, "POST")
        //.then(resultsTransform)
        .then(ingredientTransform)
        .then((results) => {
          setLoading(false);
          setIngredientItemsAPI(results);
          //return results;
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    }, 0);
  };

  useEffect(() => {
    console.log(ingredientItemsAPI);
  }, [ingredientItemsAPI]);

  return (
    <AddIngredientContext.Provider
      value={{
        ingredientItemsAPI,
        isLoading,
        error,
        response,
        addIngredientFunction: newIngredient,
      }}
    >
      {children}
    </AddIngredientContext.Provider>
  );
};
