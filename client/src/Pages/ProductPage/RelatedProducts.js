import React, { useContext } from "react";
import styled from "styled-components";
import { ItemsContext } from "../../components/Contexts/ItemsContext";
import RelatedProdCard from "./RelatedProdCard";

const RelatedProducts = () => {
  const { itemsState } = useContext(ItemsContext);

  //Shuffles all the item and only get the first 15
  const randomRelatedProds = itemsState
    .sort(() => 0.5 - Math.random())
    .slice(0, 15);

  return (
    <Wrapper>
      <Review>
        <div>
          <h2>CUSTOMER REVIEWS</h2>
          <p>No reviews yet</p>
        </div>
        <div>
          <p style={{ color: "blue", cursor: "pointer" }}>Write a Review</p>
        </div>
      </Review>
      <hr style={{ borderTop: "1px solid #8c8b8b" }} />

      <Related>
        <h2>Related Products</h2>
        <RelWrapper>
          {randomRelatedProds.map((item) => {
            return <RelatedProdCard item={item} key={item._id} />;
          })}
        </RelWrapper>
      </Related>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
const Related = styled.div`
  h2 {
    text-transform: uppercase;
    font-size: 30px;
    margin: 30px 20px;
  }
`;
const RelWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2px;
  padding: 10px;
`;
const Review = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;

  height: 12vh;
  padding: 10px;
  border: 1px solid #8c8b8b;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: start;
    margin-left: 10px;
  }

  h2 {
    text-align: start;
    margin-bottom: 20px;
    font-size: 20px;
  }
`;

export default RelatedProducts;
