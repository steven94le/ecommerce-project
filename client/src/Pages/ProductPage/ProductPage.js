import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartItemsContext } from "../../components/Contexts/CartItemsContext";
import { WishlistContext } from "../../components/Contexts/WishlistContext";
import { FormsContext } from "../../components/Contexts/FormsContext";
import { GoogleUserContext } from "../../components/Contexts/GoogleUserContext";
import { EmailSignInContext } from "../../components/Contexts/EmailSignInContext";
import Loader from "../../components/Loader/Loader";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiTwotoneMail,
} from "react-icons/ai";
import RelatedProducts from "./RelatedProducts";

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
    <Wrapper>
      {productInfo ? (
        <div>
          <div style={{ display: "flex" }}>
            <LeftSide>
              <img src={productInfo.imageSrc} alt="wearable" />
            </LeftSide>
            <RightSide value={productInfo}>
              <StyledTitle>{productInfo.name}</StyledTitle>
              <hr style={{ borderTop: "1px solid #8c8b8b" }} />

              <ItemInfo>
                <Price>{productInfo.price}</Price>
                <p>Body Location: {productInfo.body_location}</p>
                <p>Category: {productInfo.category}</p>
                <p>Stock: {productInfo.numInStock}</p>
              </ItemInfo>

              <ActionBar>
                {productInfo.numInStock === 0 ? (
                  <OutOfStock>
                    <span>Out of Stock</span>
                  </OutOfStock>
                ) : (
                  <StyledButton onClick={handleAddToCart}>
                    <span>Add To Cart</span>
                  </StyledButton>
                )}
                <StyledButton onClick={handleAddToWishlist}>
                  <span>Add To Wishlist</span>
                </StyledButton>
              </ActionBar>
              <hr style={{ borderTop: "1px solid #8c8b8b" }} />
              <Description>
                <h2 style={{ textAlign: "start" }}>Product Description</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </Description>
              <hr style={{ borderTop: "1px solid #8c8b8b" }} />
              <div>
                <AiFillInstagram size={35} />
                <AiFillFacebook size={35} />
                <AiFillTwitterSquare size={35} />
                <AiTwotoneMail size={35} />
              </div>
            </RightSide>
          </div>
          <RelatedProducts />
        </div>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  gap: 2rem;
  margin: 0;

  > div {
    height: 75vh;
    width: 70%;
    vertical-align: baseline;
  }
`;

const LeftSide = styled.div`
  width: 50%;

  img {
    width: 100%;
    left: 50%;
    top: 10%;
    transform: translate(-20%);
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  text-align: left;
`;

const ItemInfo = styled.div`
  p {
    padding: 15px 0;
  }
`;

const Price = styled.p`
  font-weight: bold;
`;

const ActionBar = styled.div`
  margin: 10px 0;
  button:not(:first-child) {
    margin-left: 1rem;
  }
`;

const Button = styled.button`
  color: white;
  text-align: center;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  height: 35px;
  width: 150px;
`;

const OutOfStock = styled(Button)`
  background: var(--button-gradient-red);
  opacity: 0.5;
  &:hover {
    cursor: not-allowed;
  }
`;

const StyledButton = styled(Button)`
  background: var(--button-gradient-blue);
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  &:active:enabled {
    background: lightblue;
    border: lightgrey 1px solid;
  }
`;

const Description = styled.div`
  p {
    margin: 15px 0;
  }
`;

export default ProductPage;
