import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bannerImg from "./assets/nike-athlete-watch-background.jpg";

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
              <div>{brand}</div>
            </StyledLink>
          ))
        ) : (
          <>Loading...</>
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
      rgb(220, 220, 220, 0.3)
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
`;

const BrandsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  width: 20%;
  text-align: center;
  border: 1px lightgrey solid;
  padding: 100px;
  font-size: 16px;
  margin: 5px;

  &:hover {
    cursor: pointer;
    background: lightgrey;
    color: white;
    border-color: lightgrey;
    transition: all ease 400ms;
    opacity: 0.8;
  }
`;

export default Brands;
