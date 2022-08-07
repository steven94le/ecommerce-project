import React from "react";
import { useState } from "react";
import styled from "styled-components";

const defaultFormFields = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { fullName, email, password, confirmPassword } = formFields;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(true);
      errorMessage("Passwords do not match");
      return;
    }

    const response = await fetch("/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log("data:", data);
    const newUserData = data.data;

    if (!newUserData) {
      setError(true);
      setErrorMessage(data.message);
      return;
    } else {
      resetFormFields();
      setErrorMessage(data.message);
    }
  };

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
          name="fullName"
          value={fullName}
        ></StyledInput>
        <StyledLabel>Full Name</StyledLabel>

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
            {error && <h2>{errorMessage}</h2>}
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
`;
export default SignUpForm;
