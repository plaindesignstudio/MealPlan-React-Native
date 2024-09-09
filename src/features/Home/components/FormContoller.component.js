import React, { useState, useContext, useEffect, Component } from "react";
import { Companydetails } from "./companydetails.component";
import { PaymentCompany } from "./paymentCompany.component";

// import {
//   axiosGetRequest,
//   resultsTransform,
// } from "../../../../components/services/axiosGetRequest";
import {
  axiosGetRequest,
  resultsTransform,
} from "../../../components/services/axiosGetRequest";

// import { SearchFieldsContext } from "../search.context";
// import { useEffect } from "react/cjs/react.development";
// import { AllergyFilter } from "./allergies.component";

export class FormContoller extends Component {
  state = {
    step: 1,
    name: "Plain Nutrition",
    phone: "0405782812",
    email: this.props.user.email,
    user_id: this.props.user.id,
    description: null,
    image: null,
    company_id: null,
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

  submitAccount = async (data) => {
    const { step } = this.state;
    // console.log(this.state);
    const response = await axiosGetRequest(
      "/api/companies",
      this.state,
      "POST"
    );
    const userResponse = await response.data;
    console.log(userResponse);
    this.setState({
      step: step + 1,
      company_id: userResponse.id,
    });
  };

  submitAllergies = async (data) => {
    const { step, allergies } = this.state;
    const response = await axiosGetRequest(
      "/api/user/allergies",
      this.state,
      "POST"
    );
    const allergyResponse = await response.data;
    console.log(allergyResponse);
    this.setState({
      step: step + 1,
    });
  };

  uploadImage = async (link: string) => {
    const { image, user_id, bio, email, password } = this.state;
    // if (image) {
    //   this.removeImage(image);
    // }
    let formData = new FormData();
    const filename = image.split("/").pop();
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `${match[1]}` : "image";
    formData.append("user", user_id);
    formData.append("bio", bio);
    formData.append("files", {
      uri: image,
      name: filename,
      type: type,
    });
    const response = await axiosGetRequest("/api/user/image", formData, "POST");
    const data = await response.data;
    //console.log(data);
    this.props.navigation.navigate("Login", {
      email: email,
      password: password,
    });

    //navigation.navigate("Meals");
    // // this.setState({ ["image"]: data.data });
    // const { step } = this.state;
    // this.setState({
    //   step: step + 1,
    // });
    // return "data";
  };

  // removeImage = async (link: string) => {
  //   const response = await axiosGetRequest(
  //     "/api/meals/image",
  //     {
  //       image_path: link,
  //     },
  //     "POST"
  //   );
  //   const data = await response;

  // };

  //Add File
  // addFile = (e) => {
  //   this.setState({
  //     files: e,
  //   });
  // };

  removeImage = async (link: string) => {
    const response = await axiosGetRequest(
      "/api/user/image",
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
      image: e,
    });
  };

  //Handle fields change
  handleChange = (name) => (value) => {
    console.log("fp");
    this.setState({ [name]: value });
    // console.log(value);
  };

  addAllergies = (item) => {
    this.setState({ ["allergies"]: item });
    //const { allergies } = this.state;
    console.log(this.state);
  };

  render() {
    //const { step } = this.state;
    const {
      step,
      name,
      image,
      email,
      description,
      phone,
      user_id,
      company_id,
    } = this.state;

    const values = {
      step,
      name,
      image,
      phone,
      email,
      description,
      user_id,
      company_id,
    };

    switch (step) {
      case 1:
        return (
          <Companydetails
            colors={this.props.colors}
            //nextStep={this.nextStep}
            handleChange={this.handleChange}
            // addFile={this.addFile}
            submit={this.submitAccount}
            values={values}
          />
        );
      case 2:
        return (
          <PaymentCompany
            colors={this.props.colors}
            handleChange={this.handleChange}
            //nextStep={this.nextStep}
            //submitAllergies={this.submitAllergies}
            // addFile={this.addFile}
            // addAllergies={this.addAllergies}
            values={values}
          />
        );
      case 3:
        return (
          <Companydetails
            colors={this.props.colors}
            // nextStep={this.nextStep}
            handleChange={this.handleChange}
            // addFile={this.addFile}
            uploadInfo={this.uploadImage}
            values={values}
          />
        );
    }
  }
}
