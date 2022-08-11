import styled from "styled-components";
import OrderSummary from "./OrderSummary";
import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { CartItemsContext } from "../../components/Contexts/CartItemsContext";
import { FormsContext } from "../../components/Contexts/FormsContext";
import { GoogleUserContext } from "../../components/Contexts/GoogleUserContext";
import { EmailSignInContext } from "../../components/Contexts/EmailSignInContext";
import ShippingForm from "./ShippingForm";
import CardDetails from "./CardDetails";
import ShippingMethod from "./ShippingMethod";

const Checkout = () => {
  const [shippingMethod, setShippingMethod] = useState("");
  const { setCartItems } = useContext(CartItemsContext);
  const [formStatusPending, setFormStatusPending] = useState("");
  const [disabledOrderSubmit, setDisabledOrderSubmit] = useState(true);
  const [orderErrMsg, setOrderErrMsg] = useState("");
  const {
    orderForm,
    shippingForm,
    setOrderForm,
    setShippingForm,
    initialShippingForm,
    initialOrderForm,
  } = useContext(FormsContext);
  const { googleUserData } = useContext(GoogleUserContext);
  const { currentUser } = useContext(EmailSignInContext);

  //handler for order purchase, redirects to confirmation page if purchase valid
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
      const data = await res.json();

      if (!res.ok) {
        setFormStatusPending("error");
        setOrderErrMsg(data.message);
        throw Error(`${res.status} ${res.statusText}`);
      }
      setFormStatusPending("confirmed");
      setCartItems([]);
      setShippingForm(initialShippingForm);

      if (googleUserData !== null || currentUser !== null) {
        const { email } = orderForm;
        const newOrderForm = { ...initialOrderForm, email };
        setOrderForm(newOrderForm);
      } else {
        setOrderForm(initialOrderForm);
      }
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
              {formStatusPending === "error" && (
                <ErrorMsg>{orderErrMsg}</ErrorMsg>
              )}
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

const ErrorMsg = styled.div`
  display: flex;
  height: 25px;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 14px;
  border: 1px red solid;
`;

const Header = styled.h4`
  display: flex;
  justify-content: center;
  margin: 2rem;
  font-size: 20px;
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
