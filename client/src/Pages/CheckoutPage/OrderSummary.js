import styled from "styled-components";
import React, { useContext } from "react";
import { CartItemsContext } from "../../components/Contexts/CartItemsContext";

const TAX_RATE = 0.15;

const OrderSummary = ({
  shippingMethod,
  handleOrderSubmit,
  disabledOrderSubmit,
}) => {
  const { cartItems } = useContext(CartItemsContext);

  const subTotalCost = cartItems.reduce((total, cartItem) => {
    if (cartItem == null) return 0;
    const { price } = cartItem;
    const priceWithoutText = price
      .replace("(refurbished)", "")
      .replace("$", "");
    const itemCost = parseFloat(priceWithoutText);
    return total + itemCost;
  }, 0);

  const taxes = subTotalCost * TAX_RATE;
  const totalCost = subTotalCost + taxes + shippingMethod;

  const subTotalCostStr = subTotalCost.toFixed(2);
  const shippingCosttStr = shippingMethod.toFixed(2);
  const taxesStr = taxes.toFixed(2);
  const totalCostStr = totalCost.toFixed(2);

  return (
    <Wrapper>
      <h4>ORDER SUMMARY ({cartItems.length})</h4>
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
          <p>${subTotalCostStr}</p>
        </Cost>
        <Cost>
          <p>Shipping</p>
          <p>${shippingMethod ? shippingCosttStr : "0.00"}</p>
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
      <PlaceOrderButton
        type="button"
        onClick={handleOrderSubmit}
        disabled={disabledOrderSubmit}
      >
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default OrderSummary;
