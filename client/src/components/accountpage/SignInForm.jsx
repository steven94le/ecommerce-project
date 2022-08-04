import React from "react";
import { useState } from "react";
import styled from "styled-components";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const signInWithGoogle = async () => {
    // await signInWithGooglePopup();
    console.log("Signed In with Google");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetFormFields();
    console.log("Hi, Im working");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  console.log(formFields);
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
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <BtnWrapper type="submit">Sign In</BtnWrapper>
          <BtnWrapper
            className="googleSignIn"
            buttonType="google"
            type="button"
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </BtnWrapper>
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
  padding: 10px 10px 10px 5px;
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
