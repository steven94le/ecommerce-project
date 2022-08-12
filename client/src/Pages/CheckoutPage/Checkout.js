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
import EmailInput from "./EmailInput";
import BillingForm from "./BillingForm";

const Checkout = ({ isBillingToggled, toggle }) => {
  const [shippingMethod, setShippingMethod] = useState("");
  const { setCartItems } = useContext(CartItemsContext);
  const [formStatusPending, setFormStatusPending] = useState("");
  const [disabledOrderSubmit, setDisabledOrderSubmit] = useState(true);
  const [orderErrMsg, setOrderErrMsg] = useState("");
  const {
    orderForm,
    shippingForm,
    billingForm,
    setOrderForm,
    initialOrderForm,
    handleOrderFormChange,
  } = useContext(FormsContext);
  const { googleUserData } = useContext(GoogleUserContext);
  const { currentUser } = useContext(EmailSignInContext);

  //check if either user is already signed in via google or email
  const isLoggedIn =
    Object.keys(googleUserData).length !== 0 ||
    Object.keys(currentUser).length !== 0;

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
    (!Object.values(billingForm).includes("") || isBillingToggled) &&
    !Object.values(orderForm).includes("")
      ? setDisabledOrderSubmit(false)
      : setDisabledOrderSubmit(true);
  }, [
    orderForm,
    shippingForm,
    billingForm,
    isBillingToggled,
    setDisabledOrderSubmit,
  ]);

  return (
    <>
      {formStatusPending !== "confirmed" ? (
        <>
          <Header>CHECKOUT</Header>
          <Wrapper>
            <LeftSide>
              <form>
                <UserInfo>
                  {!isLoggedIn && (
                    <EmailInput handleOrderFormChange={handleOrderFormChange} />
                  )}
                  <Addresses>
                    <ShippingForm />
                    <BillingForm
                      isBillingToggled={isBillingToggled}
                      toggle={toggle}
                    />
                  </Addresses>
                  <ShippingMethod setShippingMethod={setShippingMethod} />
                  <CardDetails />
                </UserInfo>
                <PlaceOrderButton
                  type="button"
                  onClick={handleOrderSubmit}
                  disabled={disabledOrderSubmit}
                  value="PLACE ORDER"
                />
                {formStatusPending === "error" && (
                  <ErrorMsg>{orderErrMsg}</ErrorMsg>
                )}
              </form>
            </LeftSide>
            <RightSide>
              <OrderSummary shippingMethod={shippingMethod} />
            </RightSide>
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
  font-size: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
  margin: 0px 100px;
  height: 70vh;

  > div {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
`;

const LeftSide = styled.div``;

const Addresses = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const RightSide = styled.div``;

const UserInfo = styled.div`
  > div {
    padding-bottom: 15px;
  }

  > div > div {
    padding: 5px 0;
  }
`;

const PlaceOrderButton = styled.input`
  border: none;
  font-size: 14px;
  color: white;
  border-radius: 3px;
  width: 100%;
  height: 25px;
  background-image: linear-gradient(90deg, #08008b 0%, #0060bf 100%);

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:active:enabled {
    background: lightblue;
    border: lightgrey 1px solid;
  }
`;

const ErrorMsg = styled.div`
  text-align: center;
  height: 25px;
  color: red;
  font-size: 14px;
  padding-top: 20px;
`;

export default Checkout;
