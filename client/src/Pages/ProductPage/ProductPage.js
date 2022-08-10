import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartItemsContext } from "../../components/Contexts/CartItemsContext";
import { FormsContext } from "../../components/Contexts/FormsContext";

const ProductPage = () => {
  const { id } = useParams();
  const { cartItems, setCartItems } = useContext(CartItemsContext);
  const { orderForm, setOrderForm } = useContext(FormsContext);
  const [productInfo, setProductInfo] = useState("");

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
            <ItemDescription value={productInfo}>
              <StyledDiv>{productInfo.price}</StyledDiv>
              <StyledDiv>Body Location: {productInfo.body_location}</StyledDiv>
              <StyledDiv>Category: {productInfo.category}</StyledDiv>
              <StyledDiv>Stock: {productInfo.numInStock}</StyledDiv>
              {productInfo.numInStock === 0 ? (
                <OutOfStock>
                  <OutOfStockText>Out of Stock</OutOfStockText>
                </OutOfStock>
              ) : (
                <StyledButton onClick={handleAddToCart}>
                  <span>Add To Cart</span>
                </StyledButton>
              )}
            </ItemDescription>
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
`;

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

const OutOfStockText = styled.span`
  padding: 0px;
  margin: 0px;
`;

const OutOfStock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: red;
  text-align: center;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  height: 25px;
`;

const StyledDiv = styled.div`
  padding-bottom: 20px;
`;

const StyledButton = styled.button`
  color: white;
  text-align: center;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  height: 25px;
  width: 125px;
  background-image: linear-gradient(90deg, #08008b 0%, #0060bf 100%);

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:active:enabled {
    background: lightblue;
    border: lightgrey 1px solid;
  }
`;

export default ProductPage;
