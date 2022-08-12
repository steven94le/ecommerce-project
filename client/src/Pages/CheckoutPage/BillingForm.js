import styled from "styled-components";
import React, { useContext } from "react";
import { FormsContext } from "../../components/Contexts/FormsContext";

const BillingForm = () => {
  const { handleBillingFormChange } = useContext(FormsContext);

  return (
    <div>
      <h4>BILLING ADDRESS</h4>
      <hr />
      <FormGroup>
        <div>
          <p>First Name</p>
          <input
            name="givenName"
            type="text"
            placeholder="John"
            onChange={(e) =>
              handleBillingFormChange(e.target.value, "givenName")
            }
            required
          />
        </div>
        <div>
          <p>Last Name</p>
          <input
            name="surname"
            type="text"
            placeholder="Smith"
            onChange={(e) => handleBillingFormChange(e.target.value, "surname")}
            required
          />
        </div>
        <div>
          <p>Address</p>
          <input
            name="address"
            type="text"
            placeholder="1007 Mountain Dr"
            onChange={(e) => handleBillingFormChange(e.target.value, "address")}
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
              handleBillingFormChange(e.target.value, "phoneNumber")
            }
            required
          />
        </div>
        <div>
          <p>City</p>
          <input
            name="city"
            type="text"
            placeholder="Montreal"
            onChange={(e) => handleBillingFormChange(e.target.value, "city")}
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
              handleBillingFormChange(e.target.value, "province")
            }
            required
          />
        </div>
        <div>
          <p>Country</p>
          <input
            name="country"
            type="text"
            placeholder="Canada"
            onChange={(e) => handleBillingFormChange(e.target.value, "country")}
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
              handleBillingFormChange(e.target.value, "postalCode")
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
  div {
    display: flex;
    justify-content: space-between;
  }
  > div > p {
    font-size: 13px;
  }
`;

export default BillingForm;
