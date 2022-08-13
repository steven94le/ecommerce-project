import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bannerImg from "./assets/nike-athlete-watch-background.jpg";
import Loader from "../../components/Loader/Loader";

const Brands = () => {
  const [brandNames, setBrandNames] = useState("");

  useEffect(() => {
    const fetchBrandNames = async () => {
      try {
        const res = await fetch("/brand");
        const data = await res.json();

        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        }
        setBrandNames(data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBrandNames();
  }, []);

  return (
    <Wrapper>
      <StyledTitle>Brands</StyledTitle>
      <BrandsWrapper>
        {brandNames && brandNames.length > 0 ? (
          brandNames.map((brand, index) => (
            <StyledLink to={`/brands/${brand}`} key={`brand-${index + 1}`}>
              <BrandNameWrapper>
                <BrandHeader>{brand}</BrandHeader>
              </BrandNameWrapper>
            </StyledLink>
          ))
        ) : (
          <Loader />
        )}
      </BrandsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  overflow: auto;
  position: relative;
  background-image: linear-gradient(
      0deg,
      rgb(220, 220, 220, 0.3),
      rgb(220, 220, 220, 0.8)
    ),
    url(${bannerImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledTitle = styled.h1`
  display: flex;
  justify-content: center;
  padding: 40px 0px;
  font-weight: bold;
  font-size: 48px;
  opacity: 0.5;
  letter-spacing: 5px; 
  
`;

const BrandsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  width: 20%;
  text-align: center;
  //box-shadow: 0px 0px 3px 1px lightgray;
  background-color: rgba(50, 0 ,0,0.2);
  padding: 100px;
  font-size: 16px;
  margin: 10px;
  transition: all 400ms ease-in-out;

  &:hover {
    cursor: pointer;
    background: lightgrey;
    border-color: lightgrey;
    transition: all 400ms ease-in;
    color: black;
    opacity: 0.8;
  }
`;

const BrandNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const BrandHeader = styled.span`
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 5px;
`

export default Brands;
