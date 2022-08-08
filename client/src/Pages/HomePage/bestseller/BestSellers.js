import { useContext } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

import { ItemsContext } from "../../../components/Contexts/ItemsContext";

const BestSellers = () => {
  const { itemsState } = useContext(ItemsContext);
  const randomBestSellers = itemsState
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  let slider = document.querySelector(".products-container");

  const btnPrev = () => {
    if (slider) {
      let width = slider.clientWidth;
      slider.scrollLeft = slider.scrollLeft - width;
    }
  };
  const btnNext = () => {
    if (slider) {
      let width = slider.clientWidth;
      slider.scrollLeft = slider.scrollLeft + width;
    }
  };

  return (
    <Wrapper>
      <StyledH1>Best Selling Products</StyledH1>
      <Carousel>
        <Btn style={{ left: "0" }} onClick={btnPrev}>
          <p>&lt;</p>
        </Btn>
        <Btn style={{ right: "0" }} onClick={btnNext}>
          <p>&gt;</p>
        </Btn>
        <Products className="products-container">
          {randomBestSellers.map((item) => {
            return <ProductCard item={item} key={item._id} />;
          })}
        </Products>
      </Carousel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledH1 = styled.h1`
  color: black;
  font-size: 40px;
  padding: 20px;
`;

const Carousel = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 26px;
`;

const Products = styled.div`
  padding: 0 10px;
  display: flex;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

const Btn = styled.button`
  border: none;
  width: 60px;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;

  p {
    font-size: 50px;
    background-color: rgb(128, 128, 128, 0.4);
    box-shadow: 0px 0px 10px 1px black;
    border-radius: 10px;
    color: white;

    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;

export default BestSellers;
