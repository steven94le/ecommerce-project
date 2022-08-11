import styled from "styled-components";
import React, { useContext } from "react";
import { FormsContext } from "../../components/Contexts/FormsContext";

const ShippingForm = () => {
  const { handleShippingFormChange, handleOrderFormChange } =
    useContext(FormsContext);

  return (
    <div>
      <h4>SHIPPING ADDRESS</h4>
      <hr />
      <FormGroup>
        <div>
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
        </div>
        <div>
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
        </div>
      </FormGroup>
      <FormGroup>
        <div>
          <p>Address</p>
          <input
            name="address"
            type="text"
            placeholder="1007 Mountain Dr"
            onChange={(e) =>
              handleShippingFormChange(e.target.value, "address")
            }
            required
          />
        </div>
        <div>
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
        </div>
      </FormGroup>
      <FormGroup>
        <div>
          <p>City</p>
          <input
            name="city"
            type="text"
            placeholder="Montreal"
            onChange={(e) => handleShippingFormChange(e.target.value, "city")}
            required
          />
        </div>
        <div>
          <p>Province</p>
          <input
            name="province"
            type="text"
            placeholder="Quebec"
            onChange={(e) =>
              handleShippingFormChange(e.target.value, "province")
            }
            required
          />
        </div>
      </FormGroup>
      <FormGroup>
        <div>
          <p>Country</p>
          <input
            name="country"
            type="text"
            placeholder="Canada"
            onChange={(e) =>
              handleShippingFormChange(e.target.value, "country")
            }
            required
          />
        </div>
        <div>
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
        </div>
      </FormGroup>
    </div>
  );
};

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    justify-content: space-between;
    width: 225px;
    vertical-align: auto;
  }
`;

export default ShippingForm;
