import styled from "styled-components";
import React from "react";

const EmailInput = ({ handleOrderFormChange }) => {
  return (
    <Wrapper>
      <h4>EMAIL ADDRESS</h4>
      <hr />
      <input
        name="email"
        type="email"
        id="email"
        placeholder="john@smith.com"
        onChange={(e) => {
          handleOrderFormChange(e.target.value, "email");
        }}
        required
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  input {
    width: 40%;
  }
`;

export default EmailInput;
