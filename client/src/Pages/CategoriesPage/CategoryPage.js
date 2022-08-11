import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
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
    <>
      <StyledHeader>{id}</StyledHeader>
      <CategoryWrapper>
        {categoryItems?.map((item, id) => {
          return (
            <StyledCard to={`/product/${item._id}`} key={id}>
              <img src={item.imageSrc} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>in stock:{item.numInStock}</p>
            </StyledCard>
          );
        })}
      </CategoryWrapper>
    </>
  );
};

const StyledHeader = styled.h1`
  color: black;
  padding: 30px;
  font-size: 48px;
`;
const CategoryWrapper = styled.div`
  justify-content: center;
  display: flex;
  width: 100vw;
  height: 100%;
  flex-wrap: wrap;
`;
const StyledCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  margin: 30px;
  box-shadow: 0px 0px 10px 1px lightgray;
  &:hover {
    cursor: pointer;
    background: steelblue;
    color: white;
    border-color: lightgrey;
    transition: all ease 400ms;
  }
`;

export default CategoryPage;
