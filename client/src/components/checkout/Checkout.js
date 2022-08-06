import styled from "styled-components";
import OrderSummary from "./OrderSummary";
import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { CartItemsContext } from "../contexts/CartItemsContext";
import { FormsContext } from "../contexts/FormsContext";
import ShippingForm from "./ShippingForm";
import CardDetails from "./CardDetails";
import ShippingMethod from "./ShippingMethod";

const Checkout = () => {
  const [shippingMethod, setShippingMethod] = useState("");
  const { setCartItems } = useContext(CartItemsContext);
  const { orderForm, shippingForm } = useContext(FormsContext);
  const [formStatusPending, setFormStatusPending] = useState("");
  const [disabledOrderSubmit, setDisabledOrderSubmit] = useState(true);

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
      setCartItems([]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    !Object.values(shippingForm).includes("") &&
    !Object.values(orderForm).includes("")
      ? setDisabledOrderSubmit(false)
      : setDisabledOrderSubmit(true);
  }, [orderForm, shippingForm, setDisabledOrderSubmit]);

  console.log("orderForm", orderForm);

  return (
    <>
      {formStatusPending !== "confirmed" ? (
        <>
          <Header>CHECKOUT</Header>
          <Wrapper>
            <UserInfo>
              <ShippingForm />
              <ShippingMethod setShippingMethod={setShippingMethod} />
              <CardDetails />
            </UserInfo>
            <OrderSummary
              shippingMethod={shippingMethod}
              handleOrderSubmit={handleOrderSubmit}
              disabledOrderSubmit={disabledOrderSubmit}
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

  > div {
    margin-bottom: 2rem;
  }

  > div > div {
    padding: 5px 0 5px 0;
  }
`;

export default Checkout;
