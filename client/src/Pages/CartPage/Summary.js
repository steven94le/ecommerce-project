import styled from "styled-components";
import React, { useContext } from "react";
import { CartItemsContext } from "../../components/Contexts/CartItemsContext";
import { Link } from "react-router-dom";
import { FormsContext } from "../../components/Contexts/FormsContext";
import { GoogleUserContext } from "../../components/Contexts/GoogleUserContext";
import { EmailSignInContext } from "../../components/Contexts/EmailSignInContext";

const Summary = ({ guestEmail, setGuestEmail }) => {
  const { cartItems } = useContext(CartItemsContext);
  const { orderForm, handleOrderFormChange } = useContext(FormsContext);
  const { googleUserData } = useContext(GoogleUserContext);
  const { currentUser } = useContext(EmailSignInContext);
  const { email } = orderForm;

  //check if either user is already signed in via google or email
  const isLoggedIn =
    Object.keys(googleUserData).length !== 0 ||
    Object.keys(currentUser).length !== 0;

  //subtotal cost of cart items (excl shipping+tax), remove non-digits from price
  const subTotalCost = cartItems.reduce((total, cartItem) => {
    if (cartItem == null) return 0;
    const { price } = cartItem;
    const priceWithoutText = price
      .replace("(refurbished)", "")
      .replace("$", "");
    const itemCost = parseFloat(priceWithoutText);
    return total + itemCost;
  }, 0);

  //stringify costs to two decimal places for display
  const subTotalCostStr = parseFloat(subTotalCost).toFixed(2);

  return (
    <Wrapper>
      <TotalCost>
        <p>Order Total</p>
        <p>${subTotalCostStr}</p>
      </TotalCost>
      <TotalCost>
        <p>Shipping & Taxes</p>
        <p>Calculated at Checkout</p>
      </TotalCost>
      {guestEmail && (
        <DisplayEmail>
          <p>Email</p>
          <p>{guestEmail}</p>
          <button
            onClick={() => {
              setGuestEmail("");
            }}
          >
            Modify Email
          </button>
        </DisplayEmail>
      )}
      {!isLoggedIn && !guestEmail && (
        <div>
          <p>Enter your email to checkout as a guest.</p>
          <EmailInput>
            <p>Email address</p>
            <input
              name="email"
              type="email"
              placeholder="john@smith.com"
              onChange={(e) => handleOrderFormChange(e.target.value, "email")}
              required
            />
          </EmailInput>
        </div>
      )}
      <Link to="/checkout">
        <CheckOutButton
          type="button"
          disabled={!isLoggedIn && !email.includes("@")}
          onClick={() => {
            setGuestEmail(email);
          }}
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
    padding: 20px 0;
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
`;

const DisplayEmail = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 3rem;
`;

const CheckOutButton = styled.button`
  border: none;
  font-size: 14px;
  color: white;
  border-radius: 10px;
  width: 100%;
  height: 25px;
  background: var(--button-gradient-blue);

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

export default Summary;
