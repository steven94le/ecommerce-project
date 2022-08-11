import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartItemsContext } from "../../components/Contexts/CartItemsContext";
import { WishlistContext } from "../../components/Contexts/WishlistContext";
import { FormsContext } from "../../components/Contexts/FormsContext";
import { GoogleUserContext } from "../../components/Contexts/GoogleUserContext";
import { EmailSignInContext } from "../../components/Contexts/EmailSignInContext";

const ProductPage = () => {
  const { id } = useParams();
  const { cartItems, setCartItems } = useContext(CartItemsContext);
  const { wishlistItems, setWishlistItems } = useContext(WishlistContext);
  const { orderForm, setOrderForm } = useContext(FormsContext);
  const [productInfo, setProductInfo] = useState("");
  const { googleUserData } = useContext(GoogleUserContext);
  const { currentUser } = useContext(EmailSignInContext);

  //handler to add item to cart; order form updated to account for added item
  const handleAddToCart = (ev) => {
    ev.preventDefault();
    setCartItems([...cartItems, productInfo]);

    const { orderedItems } = orderForm;
    setOrderForm({
      ...orderForm,
      orderedItems: [...orderedItems, productInfo],
    });
  };

  //handler to add item to wishlist, only signed-in users are able to add
  const handleAddToWishlist = (ev) => {
    ev.preventDefault();

    if (
      Object.keys(googleUserData).length > 0 ||
      Object.keys(currentUser).length > 0
    ) {
      setWishlistItems([...wishlistItems, productInfo]);
    } else {
      alert("Please sign in to use the wishlist!");
    }
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const res = await fetch(`/api/get-item/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        }
        setProductInfo(data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductInfo();
  }, [id]);

  return (
    <>
      <StyledTitle>{productInfo.name}</StyledTitle>
      <Wrapper>
        {productInfo ? (
          <>
            <img src={productInfo.imageSrc} alt="wearable" />
            <Item value={productInfo}>
              <StyledDiv>{productInfo.price}</StyledDiv>
              <StyledDiv>Body Location: {productInfo.body_location}</StyledDiv>
              <StyledDiv>Category: {productInfo.category}</StyledDiv>
              <StyledDiv>Stock: {productInfo.numInStock}</StyledDiv>
              {productInfo.numInStock === 0 ? (
                <OutOfStock>
                  <span>Out of Stock</span>
                </OutOfStock>
              ) : (
                <ActionBar>
                  <StyledButton onClick={handleAddToCart}>
                    <span>Add To Cart</span>
                  </StyledButton>
                </ActionBar>
              )}
              <StyledButton onClick={handleAddToWishlist}>
                <span>Add To Wishlist</span>
              </StyledButton>
            </Item>
            <Description>
              <p>Product Description:</p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Description>
          </>
        ) : (
          <>Loading</>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 50%;
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0 20px 0px;
  font-weight: bold;
  font-size: 48px;
  text-align: center;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  button {
    margin: 5px;
  }
`;

const Description = styled.div`
  width: 225px;

  p {
    font-weight: bold;
  }
`;

const Button = styled.button`
  color: white;
  text-align: center;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  height: 25px;
  width: 150px;
`;

const OutOfStock = styled(Button)`
  background: linear-gradient(
    90deg,
    rgba(149, 0, 0, 1) 0%,
    rgba(240, 0, 0, 1) 100%
  );

  &:hover {
    cursor: not-allowed;
  }
`;

const StyledDiv = styled.div`
  padding-bottom: 20px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(
    90deg,
    rgba(8, 0, 139, 1) 0%,
    rgba(0, 96, 191, 1) 100%
  );

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:active:enabled {
    background: lightblue;
    border: lightgrey 1px solid;
  }
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default ProductPage;
