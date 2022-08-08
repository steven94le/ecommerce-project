import styled from "styled-components";
import React, { useContext } from "react";
import { CartItemsContext } from "../contexts/CartItemsContext";
import { Link } from "react-router-dom";
import { FormsContext } from "../contexts/FormsContext";
import { GoogleUserContext } from "../contexts/GoogleUserContext";
import { EmailSignInContext } from "../contexts/EmailSignInContext";

const Summary = () => {
  const { cartItems } = useContext(CartItemsContext);
  const { orderForm, handleOrderFormChange } = useContext(FormsContext);
  const { googleUserData } = useContext(GoogleUserContext);
  const { currentUser } = useContext(EmailSignInContext);
  const { emailInput } = orderForm;

  const isLoggedIn = googleUserData || currentUser;

  const cartItemsCost = cartItems.map((cartItem) => {
    const { price } = cartItem;
    const unstringedPrice = price.replace("(refurbished)", "").replace("$", "");
    const actualPrice = parseFloat(unstringedPrice);
    return actualPrice;
  });

  const totalCost = cartItemsCost.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  const totalCostRounded = (Math.round(totalCost * 100) / 100).toFixed(2);

  return (
    <Wrapper>
      {!isLoggedIn && (
        <>
          <h4>Enter your email to continue to checkout as a guest.</h4>
          <EmailInput>
            <p>Email address</p>
            <input
              name="email"
              type="text"
              placeholder="john@smith.com"
              onChange={(e) => handleOrderFormChange(e.target.value, "email")}
            />
          </EmailInput>
        </>
      )}
      <TotalCost>
        <p>Order Total: </p>
        <p>${totalCostRounded}</p>
      </TotalCost>
      <Link to="/checkout">
        <CheckOutButton
          type="button"
          disabled={!isLoggedIn && !emailInput.includes("@")}
        >
          PROCEED TO CHECKOUT
        </CheckOutButton>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 75%;
  width: 35%;
  margin-left: 20px;

  div {
    padding: 10px 0;
  }
`;

const EmailInput = styled.div`
  display: flex;
  gap: 1rem;

  input {
    width: 50%;
    margin-top: -2px;
  }
`;

const TotalCost = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;

const CheckOutButton = styled.button`
  border: none;
  font-size: 14px;
  background-color: black;
  color: white;
  border-radius: 3px;
  width: 100%;
  height: 25px;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default Summary;
