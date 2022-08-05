import styled from "styled-components";
import React, { useContext } from "react";
import { FormsContext } from "../contexts/FormsContext";

const ShippingForm = () => {
  const { handleShippingFormChange, handleOrderFormChange } =
    useContext(FormsContext);

  return (
    <>
      <FormGroup>
        <p>First Name</p>
        <input
          name="givenName"
          type="text"
          onChange={(e) => {
            handleShippingFormChange(e.target.value, "givenName");
            handleOrderFormChange(e.target.value, "givenName");
          }}
        />
        <p>Last Name</p>
        <input
          name="surname"
          type="text"
          onChange={(e) => {
            handleShippingFormChange(e.target.value, "surname");
            handleOrderFormChange(e.target.value, "surname");
          }}
        />
      </FormGroup>
      <FormGroup>
        <div>Address</div>
        <input
          name="address"
          type="text"
          onChange={(e) => handleShippingFormChange(e.target.value, "address")}
        />
        <div>Phone Number</div>
        <input
          name="phoneNumber"
          type="text"
          onChange={(e) =>
            handleShippingFormChange(e.target.value, "phoneNumber")
          }
        />
      </FormGroup>
      <FormGroup>
        <div>City</div>
        <input
          name="city"
          type="text"
          onChange={(e) => handleShippingFormChange(e.target.value, "city")}
        />
        <div>Province</div>
        <input
          name="province"
          type="text"
          onChange={(e) => handleShippingFormChange(e.target.value, "province")}
        />
      </FormGroup>
      <FormGroup>
        <div>Country</div>
        <input
          name="country"
          type="text"
          onChange={(e) => handleShippingFormChange(e.target.value, "country")}
        />
        <div>Postal Code</div>
        <input
          name="postalCode"
          type="text"
          onChange={(e) =>
            handleShippingFormChange(e.target.value, "postalCode")
          }
        />
      </FormGroup>
    </>
  );
};

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;

  > input {
    width: 25%;
  }
`;

export default ShippingForm;
