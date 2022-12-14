import React from "react";
import { useState, useContext } from "react";
import styled from "styled-components";
import { EmailSignInContext } from "../../components/Contexts/EmailSignInContext";
import { FormsContext } from "../../components/Contexts/FormsContext";

const defaultFormFields = {
  givenName: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { givenName, surname, email, password, confirmPassword } = formFields;
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { setCurrentUser } = useContext(EmailSignInContext);
  const { orderForm, setOrderForm } = useContext(FormsContext);

  const newUserEmail = email.toLowerCase();
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Passwords do not match");
      return;
    }

    const response = await fetch("/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        givenName,
        surname,
        email: newUserEmail,
        password,
      }),
    });
    const data = await response.json();
    const newUserData = data.data;

    if (!newUserData) {
      setError(true);
      setErrorMessage(data.message);
      return;
    } else {
      setError(false);
      resetFormFields();
      setErrorMessage(data.message);
      setCurrentUser(newUserData);
      setOrderForm({
        ...orderForm,
        email: newUserData.email,
        givenName: newUserData.givenName,
        surname: newUserData.surname,
      });
    }
  };
  //Store value to formFields State
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Container>
      <h2 style={{ margin: "10px 0", color: "black" }}>
        Don't have an account?
      </h2>
      <span style={{ textAlign: "center" }}>
        Sign up with your email and password
      </span>
      <form onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          required
          onChange={handleChange}
          name="givenName"
          value={givenName}
        ></StyledInput>
        <StyledLabel>First Name</StyledLabel>
        <StyledInput
          type="text"
          required
          onChange={handleChange}
          name="surname"
          value={surname}
        ></StyledInput>
        <StyledLabel>Last Name</StyledLabel>

        <StyledInput
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        ></StyledInput>
        <StyledLabel>Email</StyledLabel>

        <StyledInput
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        ></StyledInput>
        <StyledLabel>Password</StyledLabel>

        <StyledInput
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        ></StyledInput>
        <StyledLabel>Confirm Password</StyledLabel>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            {error ? (
              <h2 style={{ color: "red" }}>{errorMessage}</h2>
            ) : (
              <h2 style={{ color: "green" }}>{errorMessage}</h2>
            )}
          </div>
          <BtnWrapper type="submit">Sign Up</BtnWrapper>
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
  min-width: 120px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  padding: 0 5px 0 5px;
  font-size: 15px;
  background: var(--button-gradient-blue);
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
    opacity: 0.7;
  }

  &:active {
    background: lightblue;
  }
`;
export default SignUpForm;
