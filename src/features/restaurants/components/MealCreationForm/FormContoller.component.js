import React, { useState, useContext, useEffect, Component } from "react";
import { AddMeal } from "./AddMeal.component";
import { AddIngredients } from "./AddIngredients.component";
import { AddSteps } from "./AddSteps.component";
import { Confirmation } from "./Confirmation.component";
import { UploadImage } from "./UploadImage.component";

import {
  axiosGetRequest,
  resultsTransform,
} from "../../../../components/services/axiosGetRequest";
// import { SearchFieldsContext } from "../search.context";
// import { useEffect } from "react/cjs/react.development";
// import { AllergyFilter } from "./allergies.component";

export class FormContoller extends Component {
  state = {
    step: 1,
    meal_id: this.props.meal ? this.props.meal.data.id : null,
    name: this.props.meal ? `${this.props.meal.data.name}` : "",
    description: this.props.meal ? `${this.props.meal.data.description}` : "",
    prep_time: this.props.meal ? `${this.props.meal.data.prep_time}` : null,
    cook_time: this.props.meal ? `${this.props.meal.data.cook_time}` : null,
    files: null,
    image: this.props.meal ? this.props.meal.data.image : null,
    //ingredients: this.props.meal ? this.props.meal.data.ingredients : [],
    ingredients: this.props.ingredientData ? this.props.ingredientData : [],
    meal_steps: this.props.meal ? this.props.meal.data.cookingsteps : [],
    user_id: 1,
  };

  //Go next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
    //window.scrollTo(0, 0);
    //this.props.currentSteps(step + 1);
  };

  //Go back to prev
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
    //window.scrollTo(0, 0);
    //this.props.currentSteps(step - 1);
  };

  submitMeal = async (data) => {
    var response = null;
    const { meal_id, step } = this.state;
    console.log(this.state);
    if (meal_id === null) {
      response = await axiosGetRequest("/api/meals", this.state, "POST");
    } else {
      response = await axiosGetRequest(
        `/api/meals/${meal_id}`,
        this.state,
        "PUT"
      );
    }
    const meal_response = await response.data;
    console.log(meal_response);
    this.setState({
      meal_id: meal_response.id,
      step: step + 1,
    });
  };

  uploadImage = async (link: string) => {
    const { image, files, meal_id } = this.state;
    // if (image) {
    //   this.removeImage(image);
    // }

    let formData = new FormData();
    const filename = files.split("/").pop();
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `${match[1]}` : "image";
    formData.append("meal", meal_id);
    // console.log(filename);
    formData.append("files", {
      uri: files,
      name: filename,
      type: type,
    });
    const response = await axiosGetRequest("/api/meal/image", formData, "POST");

    //const data = await response.data;
    this.props.navigation.navigate("MealDetail", {
      meal: response.data,
    });

    //navigation.navigate("Meals");
    // // this.setState({ ["image"]: data.data });
    // const { step } = this.state;
    // this.setState({
    //   step: step + 1,
    // });
    // return "data";
  };

  removeImage = async (link: string) => {
    const response = await axiosGetRequest(
      "/api/meals/image",
      {
        image_path: link,
      },
      "POST"
    );
    const data = await response;
    console.log(data.data);
  };

  //Add File
  addFile = (e) => {
    this.setState({
      files: e,
    });
  };

  //Handle fields change
  handleChange = (name) => (value) => {
    this.setState({ [name]: value });
    console.log(value);
  };

  addIngredients = (item) => {
    this.setState({ ["ingredients"]: item });
    const { ingredients } = this.state;
  };

  addNewMealSteps = (item) => {
    this.setState({ ["meal_steps"]: item });
  };

  render() {
    //const { step } = this.state;
    const {
      step,
      meal_id,
      name,
      description,
      prep_time,
      cook_time,
      user_id,
      files,
      image,
      ingredients,
      meal_steps,
    } = this.state;

    const values = {
      step,
      meal_id,
      name,
      description,
      prep_time,
      cook_time,
      user_id,
      files,
      image,
      ingredients,
      meal_steps,
    };

    switch (step) {
      case 1:
        return (
          <AddMeal
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            addFile={this.addFile}
            values={values}
          />
        );
      case 2:
        return (
          <AddIngredients
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            addIngredients={this.addIngredients}
            values={values}
          />
        );
      case 3:
        return (
          <AddSteps
            setNewDate={this.setNewDate}
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            addNewMealSteps={this.addNewMealSteps}
            values={values}
          />
        );

      case 4:
        return (
          <Confirmation
            prevStep={this.prevStep}
            submitEmail={this.submitMeal}
            values={values}
            // removeImage={this.removeImage}
          />
        );

      case 5:
        return (
          <UploadImage
            prevStep={this.prevStep}
            uploadImage={this.uploadImage}
            addFile={this.addFile}
            values={values}
            removeImage={this.removeImage}
          />
        );
    }
  }
}
