import styled from "styled-components";
import React, { useContext } from "react";
import { FormsContext } from "../contexts/FormsContext";

const ShippingForm = () => {
  const { handleShippingFormChange, handleOrderFormChange } =
    useContext(FormsContext);

  return (
    <div>
      <h4>SHIPPING ADDRESS</h4>
      <hr />
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
        <p>Address</p>
        <input
          name="address"
          type="text"
          onChange={(e) => handleShippingFormChange(e.target.value, "address")}
        />

        <p>Phone Number</p>
        <input
          name="phoneNumber"
          type="text"
          onChange={(e) =>
            handleShippingFormChange(e.target.value, "phoneNumber")
          }
        />
      </FormGroup>
      <FormGroup>
        <p>City</p>
        <input
          name="city"
          type="text"
          onChange={(e) => handleShippingFormChange(e.target.value, "city")}
        />

        <p>Province</p>
        <input
          name="province"
          type="text"
          onChange={(e) => handleShippingFormChange(e.target.value, "province")}
        />
      </FormGroup>
      <FormGroup>
        <p>Country</p>
        <input
          name="country"
          type="text"
          onChange={(e) => handleShippingFormChange(e.target.value, "country")}
        />
        <p>Postal Code</p>
        <input
          name="postalCode"
          type="text"
          onChange={(e) =>
            handleShippingFormChange(e.target.value, "postalCode")
          }
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

export default ShippingForm;
