import styled from "styled-components";
import React, { useContext } from "react";
import EmptyStatus from "../../components/EmptyStatus/EmptyStatus";
import { WishlistContext } from "../../components/Contexts/WishlistContext";
import { CartItemsContext } from "../../components/Contexts/CartItemsContext";
import { FormsContext } from "../../components/Contexts/FormsContext";
import { GoogleUserContext } from "../../components/Contexts/GoogleUserContext";
import { EmailSignInContext } from "../../components/Contexts/EmailSignInContext";

const WishlistPage = () => {
  const { wishlistItems, setWishlistItems } = useContext(WishlistContext);
  const { cartItems, setCartItems } = useContext(CartItemsContext);
  const { orderForm, setOrderForm } = useContext(FormsContext);
  const { googleUserData } = useContext(GoogleUserContext);
  const { currentUser } = useContext(EmailSignInContext);

  //handler to add item to wishlist; order form updated to account for added item
  const handleAddToCart = (ev, wishlistItem) => {
    ev.preventDefault();
    setCartItems([...cartItems, wishlistItem]);

    const { orderedItems } = orderForm;
    setOrderForm({
      ...orderForm,
      orderedItems: [...orderedItems, wishlistItem],
    });
  };

  //handler to remove item to cart
  const handleRemoveItem = (ev, index) => {
    ev.preventDefault();
    const removedItemIndex = Number(index);
    const newWishlist = wishlistItems.filter(
      (_, idx) => idx !== removedItemIndex
    );
    setWishlistItems(newWishlist);
  };

  return (
    <>
      <StyledHeader>Review Your Wishlist</StyledHeader>
      {googleUserData.name || currentUser.givenName ? (
        <div>
          {wishlistItems !== null && wishlistItems.length > 0 ? (
            <ItemsWrapper>
              {wishlistItems.map((wishlistItem, index) => (
                <Item key={`${wishlistItem}-${index + 1}`}>
                  <img
                    src={wishlistItem.imageSrc}
                    alt={wishlistItem.imageSrc}
                  />
                  <p>{wishlistItem.name}</p>
                  <p>{wishlistItem.price}</p>
                  <div>
                    <StyledButton
                      onClick={(ev) => handleAddToCart(ev, wishlistItem)}
                    >
                      <span>Add To Cart</span>
                    </StyledButton>
                    <StyledButton onClick={(ev) => handleRemoveItem(ev, index)}>
                      <span>Remove</span>
                    </StyledButton>
                  </div>
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
      ) : (
        <StyledHeader>Please sign in to use the wishlist</StyledHeader>
      )}
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
  gap: 0.5rem;
  width: 20%;
  padding: 20px;
  text-align: center;
`;

const StyledHeader = styled.h2`
  color: black;
  padding: 30px;
`;

const StyledButton = styled.button`
  color: white;
  text-align: center;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  height: 25px;
  width: 150px;
  background-image: linear-gradient(90deg, #08008b 0%, #0060bf 100%);
  margin: 2px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default WishlistPage;
