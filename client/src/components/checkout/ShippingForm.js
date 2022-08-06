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
          placeholder="John"
          onChange={(e) => {
            handleShippingFormChange(e.target.value, "givenName");
            handleOrderFormChange(e.target.value, "givenName");
          }}
          required
        />
        <p>Last Name</p>
        <input
          name="surname"
          type="text"
          placeholder="Smith"
          onChange={(e) => {
            handleShippingFormChange(e.target.value, "surname");
            handleOrderFormChange(e.target.value, "surname");
          }}
          required
        />
      </FormGroup>
      <FormGroup>
        <p>Address</p>
        <input
          name="address"
          type="text"
          placeholder="1007 Mountain Dr"
          onChange={(e) => handleShippingFormChange(e.target.value, "address")}
          required
        />
        <p>Phone Number</p>
        <input
          name="phoneNumber"
          type="text"
          placeholder="123-456-7890"
          onChange={(e) =>
            handleShippingFormChange(e.target.value, "phoneNumber")
          }
          required
        />
      </FormGroup>
      <FormGroup>
        <p>City</p>
        <input
          name="city"
          type="text"
          placeholder="Montreal"
          onChange={(e) => handleShippingFormChange(e.target.value, "city")}
          required
        />

        <p>Province</p>
        <input
          name="province"
          type="text"
          placeholder="Quebec"
          onChange={(e) => handleShippingFormChange(e.target.value, "province")}
          required
        />
      </FormGroup>
      <FormGroup>
        <p>Country</p>
        <input
          name="country"
          type="text"
          placeholder="Canada"
          onChange={(e) => handleShippingFormChange(e.target.value, "country")}
          required
        />
        <p>Postal Code</p>
        <input
          name="postalCode"
          type="text"
          placeholder="H1H1H1"
          onChange={(e) =>
            handleShippingFormChange(e.target.value, "postalCode")
          }
          required
          maxLength="6"
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
