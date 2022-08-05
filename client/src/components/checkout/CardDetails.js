import styled from "styled-components";
import React, { useContext } from "react";
import { FormsContext } from "../contexts/FormsContext";

const CardDetails = () => {
  const { handleOrderFormChange } = useContext(FormsContext);

  return (
    <div>
      <h4>CARD DETAILS</h4>
      <hr />
      <FormGroup>
        <p>Card Number</p>
        <input
          name="creditCard"
          type="text"
          onChange={(e) => handleOrderFormChange(e.target.value, "creditCard")}
        />
        <p>Expiration</p>
        <input
          name="expiration"
          type="text"
          onChange={(e) => handleOrderFormChange(e.target.value, "expiration")}
        />
      </FormGroup>
    </div>
  );
};

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;

  > input {
    width: 25%;
  }
`;

export default CardDetails;
