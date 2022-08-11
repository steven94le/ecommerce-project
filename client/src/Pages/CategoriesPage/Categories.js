import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import bannerImg from "./assets/wearable-tech.jpg";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const requestCategories = await fetch("/category");
      const requestJson = await requestCategories.json();
      setCategories(requestJson.data);
      setLoading(false);
    };
    getCategories();
  }, []);

  return (
    <Wrapper>
      <StyledTitle>Categories</StyledTitle>
      <CategoryWrapper>
        {categories && categories.length > 0 ? (
          categories?.map((category, id) => {
            return (
              <StyledCard to={`category/${category}`} key={id}>
                <p>{category}</p>
              </StyledCard>
            );
          })
        ) : (
          <>Loading</>
        )}
      </CategoryWrapper>
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
  opacity: 0.9;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledCard = styled(Link)`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 150px;
  margin: 30px;
  box-shadow: 0px 0px 10px 1px lightgray;

  &:hover {
    cursor: pointer;
    background: lightgrey;
    color: white;
    border-color: lightgrey;
    transition: all ease 400ms;
    opacity: 0.8;
  }
`;

export default Categories;
