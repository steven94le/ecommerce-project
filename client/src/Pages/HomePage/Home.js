import React from "react";
import styled from "styled-components";
import ProductCatalog from "../../components/ProductCatalog/ProductCatalog";

import Banner from "./Banner";
import BestSellers from "./bestseller/BestSellers";
import NewsLetter from "./NewsLetter/NewsLetter";
const Home = () => {
  return (
    <HomeWrapper>
      <Banner />
      <BestSellers />
      <ProductCatalog />
      <NewsLetter />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div``;
export default Home;
