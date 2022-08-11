import { useContext } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import { ItemsContext } from "../../../components/Contexts/ItemsContext";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const BestSellers = () => {
  const { itemsState } = useContext(ItemsContext);

  //Shuffles all the item and only get the first 10
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
          <FiArrowLeft />
        </Btn>
        <Btn style={{ right: "0" }} onClick={btnNext}>
          <FiArrowRight />
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
  padding: 10px 24px;
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

  &:hover {
    cursor: pointer;
  }
`;

export default BestSellers;
