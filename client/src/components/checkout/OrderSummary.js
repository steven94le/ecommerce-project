import styled from "styled-components";
import React, { useContext } from "react";
import { CartItemsContext } from "../contexts/CartItemsContext";

const OrderSummary = ({ shippingMethod, handleOrderSubmit }) => {
  const { cartItems } = useContext(CartItemsContext);

  const cartItemsCost = cartItems.map((cartItem) => {
    const { price } = cartItem;
    const actualPrice = Number(price.replace("$", ""));
    return actualPrice;
  });

  const subTotal = cartItemsCost.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  const taxes = subTotal * 0.15;
  const totalCost = subTotal + taxes + Number(shippingMethod);

  const subTotalStr = parseFloat(subTotal).toFixed(2);
  const taxesStr = parseFloat(taxes).toFixed(2);
  const totalCostStr = parseFloat(totalCost).toFixed(2);

  console.log("cartItems", cartItems);

  return (
    <Wrapper>
      <h4>ORDER SUMMARY</h4>
      <ItemWrapper>
        {cartItems.map((cartItem, index) => (
          <Item key={`item ${index + 1}`}>
            <img
              src={cartItem.imageSrc}
              style={{ height: "50px" }}
              alt="ordered item"
            />
            <p>{cartItem.name}</p>
            <p>{cartItem.price}</p>
          </Item>
        ))}
      </ItemWrapper>
      <hr />
      <div>
        <Cost>
          <p>Subtotal</p>
          <p>${subTotalStr}</p>
        </Cost>
        <Cost>
          <p>Shipping</p>
          <p>${shippingMethod ? shippingMethod : ""}</p>
        </Cost>
        <Cost>
          <p>Taxes (15%)</p>
          <p>${taxesStr}</p>
        </Cost>
        <hr />
        <TotalCost>
          <p>Order Total</p>
          <p>${totalCostStr}</p>
        </TotalCost>
      </div>
      <PlaceOrderButton type="button" onClick={handleOrderSubmit}>
        PLACE ORDER
      </PlaceOrderButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 30%;
  height: 600px;
`;

const ItemWrapper = styled.div`
  height: 60%;
  overflow: auto;
  margin-top: 20px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Cost = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0 5px 0;
`;

const TotalCost = styled(Cost)`
  font-weight: bold;
`;

const PlaceOrderButton = styled.button`
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

export default OrderSummary;
