import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import bannerImg from "./assets/wearable-tech.jpg";
import Loader from "../../components/Loader/Loader";

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

  return loading ? (
    <Loader />
  ) : (
    <Wrapper>
      <StyledTitle>Categories</StyledTitle>
      <CategoryWrapper>
        {categories?.map((category, id) => {
          return (
            <StyledCard to={`category/${category}`} key={id}>
              <CategoryNameWrapper>
                <CategoryHeader>{category}</CategoryHeader>
              </CategoryNameWrapper>
            </StyledCard>
          );
        })}
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
      rgb(220, 220, 220, 0.2),
      rgb(220, 220, 220, 0.5)
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
  opacity: 0.8;
  color: white;
  letter-spacing: 5px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledCard = styled(Link)`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 275px;
  height: 150px;
  margin: 30px;
  padding: 10px;
  background-color: rgba(50, 0 , 0, 0.2);
  //box-shadow: 0px 0px 5px 1px lightgray;
  transition: all 400ms ease-in-out;

  &:hover {
    cursor: pointer;
    background: lightgrey;
    color: black;
    border-color: lightgrey;
    transition: all ease-in 400ms;
    opacity: 0.8;
  }
`;
const CategoryNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const CategoryHeader = styled.span`
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 5px;
`

export default Categories;
