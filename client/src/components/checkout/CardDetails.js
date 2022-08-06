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
          placeholder="0000-0000"
          onChange={(e) => handleOrderFormChange(e.target.value, "creditCard")}
          required
          maxLength="8"
        />
        <p>Expiration</p>
        <input
          name="expiration"
          type="text"
          placeholder="MMYY"
          onChange={(e) => handleOrderFormChange(e.target.value, "expiration")}
          required
          maxLength="4"
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
