import styled from "styled-components";
import React, { useContext } from "react";
import EmptyStatus from "../../components/EmptyStatus/EmptyStatus";
import { WishlistContext } from "../../components/Contexts/WishlistContext";
import { CartItemsContext } from "../../components/Contexts/CartItemsContext";
import { FormsContext } from "../../components/Contexts/FormsContext";

const WishlistPage = () => {
  const { wishlistItems, setWishlistItems } = useContext(WishlistContext);
  const { cartItems, setCartItems } = useContext(CartItemsContext);

  const { orderForm, setOrderForm } = useContext(FormsContext);

  //handler to add item to cart; order form updated to account for added item
  const handleAddToCart = (ev, wishlistItem) => {
    ev.preventDefault();
    setCartItems([...cartItems, wishlistItem]);

    const { orderedItems } = orderForm;

    setOrderForm({
      ...orderForm,
      orderedItems: [...orderedItems, wishlistItem],
    });
  };

  const handleRemoveItem = (ev) => {
    ev.preventDefault();
    const removedItemIndex = Number(ev.target.value);
    const newWishlist = wishlistItems.filter(
      (_, index) => index !== removedItemIndex
    );
    setWishlistItems(newWishlist);
  };

  return (
    <>
      <StyledHeader>Review Your Wishlist</StyledHeader>
      <div>
        {wishlistItems !== null && wishlistItems.length > 0 ? (
          <ItemsWrapper>
            {wishlistItems.map((wishlistItem, index) => (
              <Item key={`${wishlistItem}-${index + 1}`}>
                <img src={wishlistItem.imageSrc} alt={wishlistItem.imageSrc} />
                <p>{wishlistItem.name}</p>
                <p>{wishlistItem.price}</p>
                <button onClick={(ev) => handleAddToCart(ev, wishlistItem)}>
                  Add To Cart
                </button>
                <button value={index} onClick={handleRemoveItem}>
                  Remove
                </button>
              </Item>
            ))}
          </ItemsWrapper>
        ) : (
          <Wrapper>
            <StyledHeader>Your wishlist is currently empty.</StyledHeader>
            <EmptyStatus />
          </Wrapper>
        )}
      </div>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  width: 20%;
  padding: 20px;
  text-align: center;
`;

const StyledHeader = styled.h2`
  color: black;
  padding: 30px;
`;

export default WishlistPage;
