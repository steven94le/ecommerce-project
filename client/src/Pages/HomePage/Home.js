import React from "react";
import styled from "styled-components";
import Footer from "../../components/Footer/Footer";
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
      <Footer />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div``;
export default Home;
