import styled from "styled-components";
import React, { useContext } from "react";
import { CartItemsContext } from "../contexts/CartItemsContext";
import { Link } from "react-router-dom";

const OrderSummary = ({ shippingMethod }) => {
  const { cartItems } = useContext(CartItemsContext);

  const cartItemsCost = cartItems.map((cartItem) => {
    const { price } = cartItem;
    const unstringedPrice = price.replace("$", "");
    const actualPrice = Number(unstringedPrice);
    return actualPrice;
  });

  const subTotal = cartItemsCost.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  const subTotalRounded = Number((Math.round(subTotal * 100) / 100).toFixed(2));
  const taxes = subTotalRounded * 0.15;
  const totalCost = subTotalRounded + taxes + shippingMethod;

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
        <TotalCost>
          <p>Subtotal</p>
          <p>${subTotalRounded}</p>
        </TotalCost>
        <TotalCost>
          <p>Shipping</p>
          <p>${shippingMethod ? shippingMethod : 0}</p>
        </TotalCost>
        <TotalCost>
          <p>Taxes (15%)</p>
          <p>${taxes}</p>
        </TotalCost>
        <hr />
        <TotalCost>
          <p>Order Total</p>
          <p>${totalCost}</p>
        </TotalCost>
      </div>
      {/* ADD POST METHOD */}
      <Link to="/confirmation">
        <PlaceOrderButton type="button">PLACE ORDER</PlaceOrderButton>
      </Link>
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

const TotalCost = styled.div`
  display: flex;
  justify-content: space-between;
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
