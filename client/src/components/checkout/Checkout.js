import styled from "styled-components";
import OrderSummary from "./OrderSummary";
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
// import { CartItemsContext } from "../contexts/CartItemsContext";
import { FormsContext } from "../contexts/FormsContext";
import ShippingForm from "./ShippingForm";

const Checkout = () => {
  const [shippingMethod, setShippingMethod] = useState("");
  const [billingAddressToggle, setBillingAddressToggle] = useState(false);
  // const { cartItems } = useContext(CartItemsContext);
  const { orderForm, handleOrderFormChange } = useContext(FormsContext);
  const [formStatusPending, setFormStatusPending] = useState("");

  const handleBillingBox = () => {
    setBillingAddressToggle(!billingAddressToggle);
  };

  const handleShipping = (ev) => {
    const shippingCost = ev.target.value;
    setShippingMethod(shippingCost);
  };

  const handleOrderSubmit = async (ev) => {
    ev.preventDefault();

    const settings = {
      method: "POST",
      body: JSON.stringify(orderForm),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch("/checkout", settings);

      if (!res.ok) {
        setFormStatusPending("error");
        throw Error(`${res.status} ${res.statusText}`);
      }
      setFormStatusPending("confirmed");
    } catch (err) {
      console.log(err);
    }
  };

  // console.log("cartItems", cartItems);
  console.log("orderForm", orderForm);

  return (
    <>
      {" "}
      {formStatusPending !== "confirmed" ? (
        <>
          <Header>CHECKOUT</Header>
          <Wrapper>
            <UserInfo>
              <ShippingInfo>
                <div>SHIPPING ADDRESS</div>
                <hr />
                <ShippingForm />
                <div>
                  <input
                    type="checkbox"
                    id="billing"
                    name="billing"
                    onChange={handleBillingBox}
                  />
                  <label htmlFor="billing">Use as billing address</label>
                </div>
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
                      required
                    />
                    <label htmlFor="standard">
                      $0.00 | 4 - 5 days | Standard
                    </label>
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
                <FormGroup>
                  <div>Card Number</div>
                  <input
                    name="creditCard"
                    type="text"
                    onChange={(e) =>
                      handleOrderFormChange(e.target.value, "creditCard")
                    }
                  />
                  <div>Expiration</div>
                  <input
                    name="expiration"
                    type="text"
                    onChange={(e) =>
                      handleOrderFormChange(e.target.value, "expiration")
                    }
                  />
                </FormGroup>
              </CardDetails>
              {/* {!billingAddressToggle && (
            <BillingInfo>
              <div>BILLING ADDRESS</div>
              <hr />
              <ShippingForm />
            </BillingInfo>
          )} */}
            </UserInfo>
            <OrderSummary
              shippingMethod={shippingMethod}
              handleOrderSubmit={handleOrderSubmit}
            />
          </Wrapper>
        </>
      ) : (
        <Redirect to="/confirmation" />
      )}
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

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;

  > input {
    width: 25%;
  }
`;

// const BillingInfo = styled.div``;

export default Checkout;
