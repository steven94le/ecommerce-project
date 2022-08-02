import React from "react";
import styled from "styled-components";

import Banner from "./Banner";
import BestSellers from "./bestseller/BestSellers";
const Home = () => {
  return (
    <HomeWrapper>
      <Banner />
      <BestSellers />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div``;
export default Home;
