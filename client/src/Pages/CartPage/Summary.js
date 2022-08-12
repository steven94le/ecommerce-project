import styled from "styled-components";
import React, { useContext } from "react";
import { CartItemsContext } from "../../components/Contexts/CartItemsContext";
import { Link } from "react-router-dom";

const Summary = () => {
  const { cartItems } = useContext(CartItemsContext);

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

      <Link to="/checkout">
        <CheckOutButton type="button">PROCEED TO CHECKOUT</CheckOutButton>
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

const TotalCost = styled.div`
  display: flex;
  justify-content: space-between;
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
