import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import bannerImg from "./assets/wearable-tech.jpg";
import Loader from "../../components/Loader/Loader";

const CategoryPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [categoryItems, setCategoryItems] = useState();

  useEffect(() => {
    setLoading(true);
    const getCategoryItems = async () => {
      const requestItems = await fetch(`/category/${id}`);
      const requestJson = await requestItems.json();
      setCategoryItems(requestJson.data);
      setLoading(false);
    };
    getCategoryItems();
  }, [id]);

  return loading ? (
    <Loader />
  ) : (
    <Wrapper>
      <StyledHeader>{id} Wearables</StyledHeader>
      <CategoryWrapper>
        {categoryItems?.map((item, id) => {
          return (
            <StyledCard to={`/product/${item._id}`} key={id}>
              <img src={item.imageSrc} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>Stock: {item.numInStock}</p>
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
      rgb(220, 220, 220, 0.3),
      rgb(220, 220, 220, 0.3)
    ),
    url(${bannerImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
  padding: 40px 0px;
  font-weight: bold;
  font-size: 48px;
  opacity: 0.8;
  color: white;
`;
const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const StyledCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
  width: 20%;
  padding: 25px;
  margin: 15px;
  background-color: white;
  text-align: center;
  border-radius: var(--border-radius);
  opacity: 0.8;
  gap: 1rem;

  img {
    height: auto;
    width: 50%;
  }

  &:hover {
    cursor: pointer;
    transition: all ease 400ms;
    opacity: 0.7;
    margin: 1px;
  }
`;

export default CategoryPage;
