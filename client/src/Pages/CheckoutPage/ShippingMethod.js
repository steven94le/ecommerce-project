import styled from "styled-components";
import React, { useState } from "react";

const ShippingMethod = ({ setShippingMethod }) => {
  const [toggleShipping, setToggleShipping] = useState("standard");

  const handleShipping = (ev) => {
    const shippingCost = ev.target.value;
    setShippingMethod(shippingCost);
    setToggleShipping(ev.target.id);
  };

  return (
    <div>
      <h4>SHIPPING METHOD</h4>
      <hr />
      <Radio>
        <div>
          <input
            type="radio"
            id="standard"
            name="shipping"
            value="0.00"
            onChange={handleShipping}
            checked={toggleShipping === "standard"}
            required
          />
          <label htmlFor="standard">$0.00 | 4 - 5 days | Standard</label>
        </div>
        <div>
          <input
            type="radio"
            id="priority"
            name="shipping"
            value="10.00"
            onChange={handleShipping}
            checked={toggleShipping === "priority"}
          />
          <label htmlFor="standard">$10.00 | 2 days | Priority</label>
        </div>
      </Radio>
    </div>
  );
};

const Radio = styled.div`
  display: flex;
  flex-direction: column; ;
`;

export default ShippingMethod;
