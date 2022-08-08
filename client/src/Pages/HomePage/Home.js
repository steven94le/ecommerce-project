import React from "react";
import styled from "styled-components";
import ProductCatalog from "../../components/ProductCatalog/ProductCatalog";

import Banner from "./Banner";
import BestSellers from "./bestseller/BestSellers";
const Home = () => {
  return (
    <HomeWrapper>
      <Banner />
      <BestSellers />
      <ProductCatalog />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div``;
export default Home;
