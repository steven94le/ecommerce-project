import styled from "styled-components";
import React, { useContext } from "react";
import { CartItemsContext } from "../contexts/CartItemsContext";

const Summary = () => {
  const { cartItems } = useContext(CartItemsContext);

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
      <h4>Order Summary</h4>
      <CostWrapper>
        {cartItems.map((cartItem, index) => (
          <Cost key={`item ${index + 1}`}>
            <p>{cartItem.name}</p>
            <p>{cartItem.price}</p>
          </Cost>
        ))}
      </CostWrapper>
      <TotalCost>
        <p>Order Total: </p>
        <p>${totalCostRounded}</p>
      </TotalCost>
      {/* link to checkout page or registration if not signed in*/}
      <CheckOutButton type="button">PROCEED TO CHECKOUT</CheckOutButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 75%;
  width: 35%;
  padding: 20px;
  margin-left: 20px;

  p {
    padding-top: 10px;
  }
`;

const Cost = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CostWrapper = styled.div`
  height: 250px;
  overflow: auto;
`;

const TotalCost = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px 0 20px 0;
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
`;

export default Summary;
