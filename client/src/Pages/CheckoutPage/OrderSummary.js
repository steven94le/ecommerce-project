import styled from "styled-components";
import React, { useContext } from "react";
import { CartItemsContext } from "../../components/Contexts/CartItemsContext";

const TAX_RATE = 0.15;

const OrderSummary = ({ shippingMethod }) => {
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

  const taxes = subTotalCost * TAX_RATE;
  const totalCost = subTotalCost + taxes + shippingMethod;

  //stringify costs to two decimal places for display
  const subTotalCostStr = parseFloat(subTotalCost).toFixed(2);
  const shippingCosttStr = parseFloat(shippingMethod).toFixed(2);
  const taxesStr = parseFloat(taxes).toFixed(2);
  const totalCostStr = parseFloat(totalCost).toFixed(2);

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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  height: 50%;
  overflow: auto;
  margin-top: 10px;
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

export default OrderSummary;
