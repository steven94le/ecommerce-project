import styled from "styled-components";
import React, { useContext } from "react";
import { CartItemsContext } from "../../components/Contexts/CartItemsContext";
import EmptyStatus from "../../components/EmptyStatus/EmptyStatus";
import Summary from "./Summary";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartItemsContext);

  //handler for removing item from cart based on its index position
  const handleRemoveItem = (ev) => {
    ev.preventDefault();
    const removedItemIndex = Number(ev.target.value);
    const newCart = cartItems.filter((_, index) => index !== removedItemIndex);
    setCartItems(newCart);
  };

  return (
    <>
      <StyledHeader>Review Your Cart</StyledHeader>
      <Wrapper>
        {cartItems && cartItems.length > 0 ? (
          <>
            <ItemContainer>
              {cartItems.map((cartItem, index) => (
                <div key={`cart-item-${index + 1}`}>
                  <Item>
                    <img
                      src={cartItem.imageSrc}
                      alt="cart item"
                      height="100"
                      width="100"
                    />
                    <ItemDescription>
                      <ItemHeader>
                        <p>{cartItem.name}</p>
                        <p>{cartItem.price}</p>
                      </ItemHeader>
                      <p>{cartItem.category}</p>
                      <p>{cartItem.body_location}</p>
                    </ItemDescription>
                  </Item>
                  <RemoveButton
                    type="button"
                    onClick={handleRemoveItem}
                    value={index}
                  >
                    Remove Item
                  </RemoveButton>
                </div>
              ))}
            </ItemContainer>
            <Summary />
          </>
        ) : (
          <div>
            <StyledHeader>Your cart is currently empty.</StyledHeader>
            <EmptyStatus />
          </div>
        )}
      </Wrapper>
    </>
  );
};

const StyledHeader = styled.h2`
  color: black;
  padding: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ItemContainer = styled.div`
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Item = styled.div`
  display: flex;
  border-top: 1px lightgrey solid;
  padding: 15px;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemDescription = styled.div`
  font-size: 14px;
  width: 100%;
  p {
    padding-bottom: 10px;
  }
`;

const RemoveButton = styled.button`
  font-size: 12px;
  color: black;
  background: none;
  text-decoration: underline;
  width: 100px;
  border: none;
  position: relative;
  float: right;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export default Cart;
