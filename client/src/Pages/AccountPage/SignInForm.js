import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import { GoogleUserContext } from "../../components/Contexts/GoogleUserContext";
import { FormsContext } from "../../components/Contexts/FormsContext";
import { EmailSignInContext } from "../../components/Contexts/EmailSignInContext";
import { useHistory } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setGoogleUserData } = useContext(GoogleUserContext);
  const { orderForm, setOrderForm } = useContext(FormsContext);
  const { currentUser, setCurrentUser, error, setError } =
    useContext(EmailSignInContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //Redirects to homepage whenever someone signs-in
  const history = useHistory();
  const routeChange = () => {
    let path = `/`;

    history.push(path);
  };

  //Store value to formFields State
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  //Sends login information to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
      }),
    });

    const data = await response.json();
    const userData = data.data;
    console.log("userData:", userData);

    if (!userData) {
      setCurrentUser(data.message);
      return setError(true);
    } else {
      setCurrentUser(userData);
      resetFormFields();
      setOrderForm({
        ...orderForm,
        email: userData.email,
      });
      routeChange();
    }
  };
  // Initialize Google Sign-In API
  useEffect(() => {
    const handleCallbackResponse = (response) => {
      //Decode the JWT into an object so that we can use the data
      let userObj = jwt_decode(response.credential);
      console.log("userObj:", userObj);

      setGoogleUserData(userObj);
      setOrderForm({
        ...orderForm,
        email: userObj.email,
      });
    };
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "666226095597-4b4nrr17vj9m2irpkaejn0fic0jo55v7.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, [setGoogleUserData, setOrderForm, orderForm]);

  return (
    <Container>
      <h2 style={{ margin: "10px 0", color: "black" }}>
        Already have an account?
      </h2>
      <span style={{ textAlign: "center" }}>
        Sign in with your email and password
      </span>
      <form onSubmit={handleSubmit}>
        <StyledInput
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <StyledLabel>Email</StyledLabel>

        <StyledInput
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <StyledLabel>Password</StyledLabel>

        <div
          style={{
            display: " flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          {error && <h3 style={{ color: "red" }}>{currentUser}</h3>}
          <BtnWrapper type="submit">Sign In</BtnWrapper>

          <GoogAuth>
            <span>Or Continue With</span>
            <div id="signInDiv"></div>
          </GoogAuth>
        </div>
      </form>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  width: 380px;
  padding: 15px;
`;

const StyledInput = styled.input`
  background: none;
  background-color: white;
  color: black;
  font-size: 18px;
  padding: 0 5px;

  display: block;
  width: 80%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid black;
  margin: 5px 0;

  &:focus {
    outline: none;
  }
`;

const StyledLabel = styled.label`
  color: black;
  font-size: 16px;
  font-weight: normal;
  left: 5px;
  top: 10px;
`;
const BtnWrapper = styled.button`
  margin-top: 20px;
  min-width: 120px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  padding: 0 5px 0 5px;
  font-size: 15px;
  background-color: green;
  color: white;
  text-transform: uppercase;
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  &:hover {
    background-color: white;
    color: green;
    border: 1px solid green;
  }

  &.googleSignIn {
    background-color: #4285f4;
    color: white;

    &:hover {
      background-color: #357ae8;
      border: none;
    }
  }
`;

const GoogAuth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  div {
    padding-top: 10px;
  }
`;
export default SignInForm;
