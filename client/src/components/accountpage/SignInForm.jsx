import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import { GoogleUserContext } from "../contexts/GoogleUserContext";
import { FormsContext } from "../contexts/FormsContext";
import { EmailSignInContext } from "../contexts/EmailSignInContext";
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
  const { setCurrentUser, error, setError } = useContext(EmailSignInContext);

  useEffect(() => {
    const handleCallbackResponse = (response) => {
      let userObj = jwt_decode(response.credential);

      setGoogleUserData(userObj);
      setOrderForm({
        ...orderForm,
        email: userObj.email,
        givenName: userObj.given_name,
        surname: userObj.family_name,
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
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const history = useHistory();
  const routeChange = () => {
    let path = `/`;

    history.push(path);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    const userData = data.data;

    if (!userData) {
      return setError(true);
    } else {
      setCurrentUser(userData);
      routeChange();
      resetFormFields();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

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
          {error && <h3 style={{ color: "red" }}>User does not exist!</h3>}
          <BtnWrapper type="submit">Sign In</BtnWrapper>

          <div id="signInDiv"></div>
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
export default SignInForm;
