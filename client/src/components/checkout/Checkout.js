import styled from "styled-components";
import OrderSummary from "./OrderSummary";
import React, { useState } from "react";

const Checkout = () => {
  const [shippingMethod, setShippingMethod] = useState("");

  const handleShipping = (ev) => {
    const shippingCost = ev.target.value;
    setShippingMethod(shippingCost);
  };

  return (
    <>
      <Header>CHECKOUT</Header>
      <Wrapper>
        <UserInfo>
          <ShippingInfo>
            <div>SHIPPING ADDRESS</div>
            <hr />
            <div>Full Name</div>
            <div>Address</div>
            <div>City - Province - Postal</div>
            <div>Country</div>
            <div>Phone Number</div>
          </ShippingInfo>
          <ShippingInfo>
            <div>SHIPPING METHOD</div>
            <hr />
            <Radio>
              <div>
                <input
                  type="radio"
                  id="standard"
                  name="shipping"
                  value="0.00"
                  onChange={handleShipping}
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
                />
                <label htmlFor="standard">$10.00 | 2 days | Priority</label>
              </div>
            </Radio>
          </ShippingInfo>
          <CardDetails>
            <div>CARD DETAILS</div>
            <hr />
            <div>Card Number</div>
            <input />
            <div>Expiration</div>
            <input />
          </CardDetails>
          <BillingInfo>
            <div>BILLING ADDRESS</div>
            <hr />
            <div>Full Name</div>
            <div>Address</div>
            <div>City - Province - Postal</div>
            <div>Country</div>
            <div>Phone Number</div>
          </BillingInfo>
        </UserInfo>
        <OrderSummary
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
        />
      </Wrapper>
    </>
  );
};

const Header = styled.h4`
  display: flex;
  justify-content: center;
  margin: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;

  > div:not(first-child) {
    margin-bottom: 2rem;
  }

  > div > div:first-child {
    font-weight: bold;
  }

  > div > div:not(:first-child) {
    padding: 1px;
  }
`;

const Radio = styled.div`
  display: flex;
  flex-direction: column; ;
`;

const ShippingInfo = styled.div``;

const CardDetails = styled.div``;

const BillingInfo = styled.div``;

export default Checkout;
