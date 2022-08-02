import styled from "styled-components";
import React, { useContext } from "react";
import { CartItemsContext } from "../contexts/CartItemsContext";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartItemsContext);

  const handleRemoveItem = (ev) => {
    ev.preventDefault();
    const removedItemIndex = Number(ev.target.value);
    const newCart = cartItems.filter((_, index) => index !== removedItemIndex);
    setCartItems(newCart);
  };

  return (
    <Wrapper>
      <ItemsSection>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((cartItem, index) => (
            <div key={`cart-item-${index + 1}`}>
              <Item>
                <img
                  src={cartItem.imageSrc}
                  alt="cart item"
                  height="100"
                  width="100"
                />
                <ItemDescription>
                  <RemoveItem>
                    <RemoveButton
                      type="button"
                      onClick={handleRemoveItem}
                      value={index}
                    >
                      X
                    </RemoveButton>
                  </RemoveItem>
                  <div>{cartItem.name}</div>
                  <div>{cartItem.price}</div>
                  <div>{cartItem.body_location}</div>
                  <div>{cartItem.category}</div>
                </ItemDescription>
              </Item>
            </div>
          ))
        ) : (
          <>No Items!</>
        )}
      </ItemsSection>
      <Summary>
        <div>Cart Summary</div>
      </Summary>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  height: 90%;
  width: 100%;
`;

const ItemsSection = styled.div`
  border: 2px grey solid;
  div:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const Item = styled.div`
  display: flex;
  padding: 10px;
`;

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  width: 100%;
`;

const RemoveItem = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RemoveButton = styled.button`
  padding: 5px;
  font-size: 14px;
  color: black;
  background-color: lightgrey;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px grey solid;
  padding: 180px;
`;

export default Cart;
