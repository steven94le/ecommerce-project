import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductCard = ({ item }) => {
  const { _id, imageSrc, name, price } = item;
  return (
    <Wrapper to={`/product/${_id}`}>
      <DetailsWrapper>
        <ProdImg src={imageSrc} />
      </DetailsWrapper>

      <DetailsWrapper>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </DetailsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 500px;
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 20px;
  border-radius: 10px;

  &:hover {
    padding: 25px;
    transition: all ease-in 200ms;
    border: steelblue 2px solid;
  }
`;
const Name = styled.h2`
  color: black;
  font-size: 15px;
`;
const ProdImg = styled.img`
  width: 150px;
  height: auto;
  object-fit: cover;
  padding: 10px;
`;
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Price = styled.p`
  color: black;
`;
export default ProductCard;
