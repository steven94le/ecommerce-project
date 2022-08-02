import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState("");

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
            <ItemDescription>
              <div>{productInfo.price}</div>
              <div>Body Location: {productInfo.body_location}</div>
              <div>Category: {productInfo.category}</div>
              <div>Stock: {productInfo.numInStock}</div>
              <StyledButton>Add To Cart</StyledButton>
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
  div {
    padding-bottom: 20px;
  }
`;

const StyledButton = styled.button`
  color: white;
  background: steelblue;
  text-align: center;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  height: 25px;

  &:hover {
    cursor: pointer;
  }
`;

export default ProductPage;
