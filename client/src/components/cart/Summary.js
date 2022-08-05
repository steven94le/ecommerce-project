import styled from "styled-components";
import React, { useContext } from "react";
import { CartItemsContext } from "../contexts/CartItemsContext";
import { Link } from "react-router-dom";
import { FormsContext } from "../contexts/FormsContext";

const Summary = () => {
  const { cartItems } = useContext(CartItemsContext);
  const { orderForm, handleOrderFormChange } = useContext(FormsContext);
  const { email } = orderForm;

  const cartItemsCost = cartItems.map((cartItem) => {
    const { price } = cartItem;

    const unstringedPrice = price.replace("$", "");
    const actualPrice = Number(unstringedPrice);
    return actualPrice;
  });

  const totalCost = cartItemsCost.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  const totalCostRounded = (Math.round(totalCost * 100) / 100).toFixed(2);

  return (
    <Wrapper>
      {!email && (
        <>
          <p>Enter your email to continue to checkout as a guest.</p>
          <div>Email address</div>

          <input
            name="email"
            type="text"
            onChange={(e) => handleOrderFormChange(e.target.value, "email")}
          />
        </>
      )}
      <TotalCost>
        <p>Order Total: </p>
        <p>${totalCostRounded}</p>
      </TotalCost>
      <Link to="/checkout">
        <CheckOutButton type="button" disabled={!email}>
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
`;

const TotalCost = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
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
